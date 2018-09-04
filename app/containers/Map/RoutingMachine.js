import React from 'react';
import PropTypes from 'prop-types';
import { Routing, marker } from 'leaflet';
import 'leaflet-control-geocoder';
import 'leaflet-routing-machine';
import { withLeaflet, MapComponent, LeafletProvider } from 'react-leaflet';
import turf from 'turf';
import { uniq, isEmpty, isEqual } from 'lodash';
import tollCollectors from './tollCollectors';

class RoutingMachine extends MapComponent {
  static defaultProps = {
    locationFrom: {},
    locationTo: {},
  };

  static propTypes = {
    locationFrom: PropTypes.object,
    locationTo: PropTypes.object,
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
    router.on('routesfound', ({ routes }) => {
      let tollCollectorsOnRoute = [];
      routes[0].coordinates.forEach(({ lat, lng }) => {
        tollCollectors.forEach(coordenada => {
          const p1 = turf.point([lat, lng]);
          const p2 = turf.point([
            coordenada.coordenadas.lat,
            coordenada.coordenadas.lng,
          ]);
          const distance = turf.distance(p1, p2);
          if (distance < 0.05) {
            tollCollectorsOnRoute.push(coordenada);
          }
        });
      });
      const markers = [];
      tollCollectorsOnRoute = uniq(tollCollectorsOnRoute);
      tollCollectorsOnRoute.forEach(peaje => {
        const {
          coordenadas: { lat, lng },
          nombre,
          departamento,
          telefono,
          grua,
        } = peaje;
        const mark = marker([lat, lng]).addTo(this.props.leaflet.map);
        mark.bindPopup(
          `
          <h4>Nombre: ${nombre}</h4>
          <h4>Departamento: ${departamento}</h4>
          <h4>Teléfono: ${telefono}</h4>
          <h4>Grúa: ${grua}</h4>
        `,
        );
        markers.push(mark);
      });
      this.setState({ markers });
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
