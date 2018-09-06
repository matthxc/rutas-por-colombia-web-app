import React from 'react';
import PropTypes from 'prop-types';
import { Routing, marker } from 'leaflet';
import 'leaflet-routing-machine';
import { withLeaflet, MapComponent, LeafletProvider } from 'react-leaflet';
import { isEmpty, isEqual } from 'lodash';
import axios from 'axios';
import message from 'antd/lib/message';

class RoutingMachine extends MapComponent {
  static defaultProps = {
    locationFrom: {},
    locationTo: {},
    category: 0,
  };

  static propTypes = {
    locationFrom: PropTypes.object,
    locationTo: PropTypes.object,
    category: PropTypes.number,
  };

  constructor(props) {
    super(props);
    const router = Routing.control({}).addTo(this.props.leaflet.map);
    router.hide();
    this.onRouteFound(router);
    this.state = {
      router,
      markers: [],
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

  onRouteFound = router => {
    router.on('routesfound', async ({ routes }) => {
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
          'http://localhost:1337/findTollCollectors',
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
          const mark = marker([lat, lng]).addTo(this.props.leaflet.map);
          mark.bindPopup(
            `
          <h4>Nombre: ${nombre}</h4>
          <h4>Departamento: ${departamento}</h4>
          <h4>Teléfono: ${telefono}</h4>
          <h4>Grúa: ${grua}</h4>
          <h4>Precio: ${categoria[category]}</h4>
        `,
          );
          markers.push(mark);
        });
        this.setState({ markers });
        console.log(totalPrice, durationString, totalDistanceString);
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

  render() {
    const { children } = this.props;
    return children == null || this.contextValue == null ? null : (
      <LeafletProvider value={this.contextValue}>{children}</LeafletProvider>
    );
  }
}

export default withLeaflet(RoutingMachine);
