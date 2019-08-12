import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import injectReducer from 'utils/injectReducer';
import { Map as LeafletMap, TileLayer, ZoomControl } from 'react-leaflet';
import theme from 'theme';

// Antd
import message from 'antd/lib/message';

// Semantic
import { Responsive } from 'semantic-ui-react';

// Components
import RoutingMachine from './RoutingMachine';

// Redux
import { makeSelectSearch } from '../Search/selectors';
import { searchReducer } from '../Search/reducer';
import { setRouteResults } from './actions';
import { setTouristAttraction } from '../TouristAttraction/actions';

const { breakpointsDown, breakpointsUp } = theme;

class Map extends React.PureComponent {
  state = {
    lat: 4.6758818,
    lng: -74.1535071,
    zoom: 12,
  };

  componentDidMount = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        this.setState({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      });
    } else {
      message.error('Este navegador no soporta geolocalización', 5);
    }
  };

  onRouteResultsFound = routeResults => {
    this.props.setRouteResults(routeResults);
  };

  viewTouristAttraction = touristAttraction => {
    this.props.setTouristAttraction(touristAttraction);
    this.props.viewTouristAttraction();
  };

  render() {
    const {
      searchParameters: { locationFrom, locationTo, category },
    } = this.props;
    const position = [this.state.lat, this.state.lng];
    return (
      <LeafletMap
        center={position}
        zoom={this.state.zoom}
        style={{ height: '100%', width: '100%' }}
        zoomControl={false}
      >
        <Responsive as={React.Fragment} maxWidth={breakpointsDown.sm}>
          <ZoomControl position="topright" />
        </Responsive>
        <Responsive as={React.Fragment} minWidth={breakpointsUp.md}>
          <ZoomControl position="bottomright" />
        </Responsive>
        <RoutingMachine
          locationFrom={locationFrom}
          locationTo={locationTo}
          category={category}
          onRouteResultsFound={this.onRouteResultsFound}
          setTouristAttractionInfo={this.viewTouristAttraction}
        />
        <TileLayer
          attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
      </LeafletMap>
    );
  }
}
Map.propTypes = {
  searchParameters: PropTypes.object.isRequired,
  setRouteResults: PropTypes.func.isRequired,
  viewTouristAttraction: PropTypes.func.isRequired,
  setTouristAttraction: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  searchParameters: makeSelectSearch(),
});

const mapDispatchToProps = {
  setRouteResults,
  setTouristAttraction,
};

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({
  key: 'searchParameters',
  reducer: searchReducer,
});

export default compose(
  withReducer,
  withConnect,
)(Map);
