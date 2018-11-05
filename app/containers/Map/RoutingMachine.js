import React from 'react';
import PropTypes from 'prop-types';
import { Routing, marker, icon } from 'leaflet';
import 'leaflet-routing-machine';
import { withLeaflet, MapComponent, LeafletProvider } from 'react-leaflet';
import { isEmpty, isEqual } from 'lodash';
import axios from 'axios';
import message from 'antd/lib/message';
import notification from 'antd/lib/notification';

import tollIcon from 'images/toll-road.png';
import tollShadow from 'images/toll-road-shadow.png';

class RoutingMachine extends MapComponent {
  static defaultProps = {
    locationFrom: {},
    locationTo: {},
    category: 0,
    onRouteResultsFound: () => {},
  };

  static propTypes = {
    locationFrom: PropTypes.object,
    locationTo: PropTypes.object,
    category: PropTypes.number,
    onRouteResultsFound: PropTypes.func,
  };

  constructor(props) {
    super(props);
    const router = Routing.control({
      router: Routing.mapbox(
        'pk.eyJ1IjoibWF0dGh4YyIsImEiOiJjam8zdzAwb2IwOHVjM3Fuc2FrMDQ1d3diIn0.Hdg2Zlt6Iamw0eiirwl86g',
      ),
    }).addTo(this.props.leaflet.map);
    router.hide();
    this.onRouteFound(router);
    this.onRouteError(router);

    const leafletTollIcon = icon({
      iconUrl: tollIcon,
      shadowUrl: tollShadow,
      iconSize: [32, 32], // size of the icon
      shadowSize: [32, 9], // size of the shadow
      iconAnchor: [16, 30], // point of the icon which will correspond to marker's location
      shadowAnchor: [6, 10], // the same for the shadow
      popupAnchor: [-6, -28], // point from which the popup should open relative to the iconAnchor
    });
    this.state = {
      router,
      markers: [],
      leafletTollIcon,
    };
  }

  componentDidMount = () => {
    const { locationFrom, locationTo } = this.props;
    const { router } = this.state;
    if (!isEmpty(locationFrom) && !isEmpty(locationTo)) {
      this.initRouting();
      router.setWaypoints([locationFrom, locationTo]);
    }
  };

  componentDidUpdate = ({
    locationFrom: oldLocationFrom,
    locationTo: oldLocationTo,
  }) => {
    const { locationFrom, locationTo } = this.props;
    const { router } = this.state;
    if (!isEmpty(locationFrom) && !isEmpty(locationTo)) {
      if (
        !isEqual(oldLocationFrom, locationFrom) ||
        !isEqual(oldLocationTo, locationTo)
      ) {
        this.initRouting();
        router.setWaypoints([locationFrom, locationTo]);
      }
    }
  };

  initRouting = () => {
    const { markers } = this.state;
    markers.forEach(mark => {
      this.props.leaflet.map.removeLayer(mark);
    });
  };

  /* eslint-disable indent */
  onRouteFound = router => {
    router.on('routesfound', async ({ routes }) => {
      console.log('running...');
      const loading = message.loading('Calculando ruta...', 0);
      const { category } = this.props;
      const {
        coordinates,
        summary: { totalDistance, totalTime },
      } = routes[0];
      try {
        const {
          data: {
            tollCollectorsOnRoute,
            totalPrice,
            durationString,
            totalDistanceString,
          },
        } = await axios.post(
          'http://localhost:8080/tollCollectors/calculate',
          {
            routes: coordinates,
            category,
            totalDistance,
            totalTime,
          },
          {
            headers: {
              'Content-Type': 'application/json',
            },
          },
        );
        const markers = [];
        tollCollectorsOnRoute.forEach(peaje => {
          const {
            coordenadas: { lat, lng },
            nombre,
            departamento,
            telefono,
            grua,
            categoria,
          } = peaje;
          const mark = marker([lat, lng], {
            icon: this.state.leafletTollIcon,
          }).addTo(this.props.leaflet.map);
          const name = nombre
            ? `<h4>Nombre: <span class="regular">${nombre}</span></h4>`
            : '';
          const state = departamento
            ? `<h4>Departamento: <span class="regular">${departamento}</span></h4>`
            : '';
          const phone = telefono
            ? `<h4>Teléfono: <span class="regular">${telefono}</span></h4>`
            : '';
          const car = grua
            ? `<h4>Grua: <span class="regular">${grua}</span></h4>`
            : '';
          const price = categoria[category]
            ? `<h4>Precio: <span class="regular">${
                categoria[category]
              }</span></h4>`
            : '';
          mark.bindPopup(name + state + phone + car + price);
          markers.push(mark);
        });
        this.setState({ markers });
        this.props.onRouteResultsFound({
          totalPrice,
          duration: durationString,
          distance: totalDistanceString,
          tollCollectors: tollCollectorsOnRoute.length,
        });
      } catch (error) {
        console.log(error);
        message.error(
          'Hubo un error al buscar la ruta. Por favor intenta nuevamente.',
          5,
        );
      } finally {
        loading();
      }
    });
  };

  onRouteError = router => {
    router.on('routingerror', async ({ error: { target: { response } } }) => {
      const { code } = JSON.parse(response);
      if (code === 'NoRoute') {
        notification.error({
          message: 'Error',
          description:
            'Lo sentimos, no hemos podido encontrar una ruta válida. \n Intenta nuevamente con otras localizaciones.',
          duration: 0,
          placement: 'bottomRight',
        });
      } else {
        message.error('Hubo un error inesperado, intenta nuevamente', 5);
      }
    });
  };

  render() {
    const { children } = this.props;
    return children == null || this.contextValue == null ? null : (
      <LeafletProvider value={this.contextValue}>{children}</LeafletProvider>
    );
  }
}

export default withLeaflet(RoutingMachine);
