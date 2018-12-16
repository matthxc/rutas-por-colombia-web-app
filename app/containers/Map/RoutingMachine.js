import React from 'react';
import PropTypes from 'prop-types';
import { Routing, marker, icon } from 'leaflet';
import 'leaflet-routing-machine';
import { withLeaflet, MapComponent, LeafletProvider } from 'react-leaflet';
import { isEmpty, isEqual } from 'lodash';
import api from 'config/axiosInstance';

// Ant
import message from 'antd/lib/message';
import notification from 'antd/lib/notification';

// Components
import FormatMoney from 'utils/formatMoney';

// Images
import tollIcon from 'images/toll-road.png';
import tollShadow from 'images/toll-road-shadow.png';
import touristAttractionIcon from 'images/tourist-attraction.png';
import touristAttractionShadow from 'images/tourist-attraction-shadow.png';
import flagIcon from 'images/flag.png';
import flagShadow from 'images/flag-shadow.png';

const moneyFormatter = new FormatMoney();

class RoutingMachine extends MapComponent {
  static defaultProps = {
    locationFrom: {},
    locationTo: {},
    category: 0,
    onRouteResultsFound: () => {},
    setTouristAttractionInfo: () => {},
  };

  static propTypes = {
    locationFrom: PropTypes.object,
    locationTo: PropTypes.object,
    category: PropTypes.number,
    onRouteResultsFound: PropTypes.func,
    setTouristAttractionInfo: PropTypes.func,
  };

  constructor(props) {
    super(props);
    const router = Routing.control({
      router: Routing.mapbox(
        'pk.eyJ1IjoibWF0dGh4YyIsImEiOiJjam8zdzAwb2IwOHVjM3Fuc2FrMDQ1d3diIn0.Hdg2Zlt6Iamw0eiirwl86g',
      ),
      plan: Routing.plan([], {
        createMarker(i, wp) {
          return marker(wp.latLng, {
            draggable: true,
            icon: icon({
              iconUrl: flagIcon,
              shadowUrl: flagShadow,
              iconSize: [32, 32], // size of the icon
              shadowSize: [32, 9], // size of the shadow
              iconAnchor: [5, 30], // point of the icon which will correspond to marker's location
              shadowAnchor: [0, 10], // the same for the shadow
              popupAnchor: [-6, -28], // point from which the popup should open relative to the iconAnchor
            }),
          });
        },
      }),
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

    const leafletTouristAttractionIcon = icon({
      iconUrl: touristAttractionIcon,
      shadowUrl: touristAttractionShadow,
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
      leafletTouristAttractionIcon,
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
      let loading = message.loading('Calculando ruta...', 0);
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
        } = await api.post(
          '/tollCollectors/calculate',
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
        loading();
        loading = message.loading('Buscando sitios turísticos cercanos...', 0);
        const markers = [];
        tollCollectorsOnRoute.forEach(toll => {
          const {
            coordinates: { lat, lng },
          } = toll;
          const mark = marker([lat, lng], {
            icon: this.state.leafletTollIcon,
          }).addTo(this.props.leaflet.map);
          const name = toll.name
            ? `<h4>Nombre: <span class="regular">${toll.name}</span></h4>`
            : '';
          const state = toll.state
            ? `<h4>Departamento: <span class="regular">${
                toll.state
              }</span></h4>`
            : '';
          const phone = toll.phone
            ? `<h4>Teléfono: <span class="regular">${toll.phone}</span></h4>`
            : '';
          const car = toll.towTruck
            ? `<h4>Grua: <span class="regular">${toll.towTruck}</span></h4>`
            : '';
          const price = toll.prices[category]
            ? `<h4>Precio: <span class="regular">${moneyFormatter.formatMoney(
                toll.prices[category],
              )}</span></h4>`
            : '';
          mark.bindPopup(name + state + phone + car + price);
          markers.push(mark);
        });
        const {
          data: { touristAttractionsOnRoute },
        } = await api.post(
          '/touristAttractions/calculate',
          {
            routes: coordinates,
          },
          {
            headers: {
              'Content-Type': 'application/json',
            },
          },
        );
        touristAttractionsOnRoute.forEach(touristAttraction => {
          const { lat, lng, name } = touristAttraction;
          const mark = marker([lat, lng], {
            icon: this.state.leafletTouristAttractionIcon,
          }).addTo(this.props.leaflet.map);
          mark.bindTooltip(name, {
            permanent: true,
            offset: [12, -16],
            direction: 'right',
          });
          mark.on('click', () => {
            this.props.setTouristAttractionInfo(touristAttraction);
          });
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
        message.error(
          'Hubo un error al buscar la ruta. Por favor intenta nuevamente.',
          5,
        );
        throw error;
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
