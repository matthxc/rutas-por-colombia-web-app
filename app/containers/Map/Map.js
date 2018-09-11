import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import injectReducer from 'utils/injectReducer';
import { Map as LeafletMap, TileLayer, ZoomControl } from 'react-leaflet';

// Antd
import message from 'antd/lib/message';

// Components
import RoutingMachine from './RoutingMachine';

// Redux
import { makeSelectSearch } from '../Search/selectors';
import { searchReducer } from '../Search/reducer';
import { setRouteResults } from './actions';

class Map extends React.PureComponent {
  static propTypes = {
    searchParameters: PropTypes.object.isRequired,
    setRouteResults: PropTypes.func.isRequired,
  };

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
      message.error('Geolocation is not supported by this browser.', 5);
    }
  };

  onRouteResultsFound = routeResults => {
    this.props.setRouteResults(routeResults);
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
        <ZoomControl position="bottomright" />
        <RoutingMachine
          locationFrom={locationFrom}
          locationTo={locationTo}
          category={category}
          onRouteResultsFound={this.onRouteResultsFound}
        />
        <TileLayer
          attribution="&amp;copy <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
      </LeafletMap>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  searchParameters: makeSelectSearch(),
});

const mapDispatchToProps = {
  setRouteResults,
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
