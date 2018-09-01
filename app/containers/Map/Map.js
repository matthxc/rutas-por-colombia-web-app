import React from 'react';
import { Map as LeafletMap, TileLayer, ZoomControl } from 'react-leaflet';

// Antd
import message from 'antd/lib/message';

// Components

class Map extends React.PureComponent {
  state = {
    lat: 4.6758818,
    lng: -74.1535071,
    zoom: 10,
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

  render() {
    const position = [this.state.lat, this.state.lng];
    return (
      <LeafletMap
        center={position}
        zoom={this.state.zoom}
        style={{ height: '100vh', width: '100%' }}
        zoomControl={false}
      >
        <ZoomControl position="bottomright" />
        <TileLayer
          attribution="&amp;copy <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
      </LeafletMap>
    );
  }
}

export default Map;
