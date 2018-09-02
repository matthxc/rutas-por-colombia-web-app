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
    this.state = { router };
    this.onRouteFound(router);
  }

  onRouteFound = router => {
    router.on('routesfound', ({ routes }) => {
      let tollCollectorsOnRoute = [];
      routes[0].coordinates.forEach(({ lat, lng }) => {
        tollCollectors.forEach(coordenada => {
          const from = turf.point([lat, lng]);
          const to = turf.point([
            coordenada.coordenadas.lat,
            coordenada.coordenadas.lng,
          ]);
          const distance = turf.distance(from, to);
          if (distance < 0.05) {
            tollCollectorsOnRoute.push(coordenada);
          }
        });
      });
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
      });
    });
  };

  componentDidMount = () => {
    const { locationFrom, locationTo } = this.props;
    if (!isEmpty(locationFrom) && !isEmpty(locationTo)) {
      this.state.router.setWaypoints([locationFrom, locationTo]);
    }
  };

  componentDidUpdate = ({ oldLocationFrom, oldLocationTo }) => {
    const { locationFrom, locationTo } = this.props;
    if (!isEmpty(locationFrom) && !isEmpty(locationTo)) {
      if (
        !isEqual(oldLocationFrom, locationFrom) ||
        !isEqual(oldLocationTo, locationTo)
      ) {
        this.state.router.setWaypoints([locationFrom, locationTo]);
      }
    }
  };

  render() {
    const { children } = this.props;
    return children == null || this.contextValue == null ? null : (
      <LeafletProvider value={this.contextValue}>{children}</LeafletProvider>
    );
  }
}

export default withLeaflet(RoutingMachine);
