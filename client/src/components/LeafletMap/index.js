import React from 'react';
import {
  Map, Marker, TileLayer,
} from 'react-leaflet-universal';
import PropTypes from 'prop-types';
import { mapBoxToken } from 'src/config';
import './leafletMap.scss';

const LeafletMap = ({ mapPosition }) => (
  <div className="map-container">
    <Map
      className="map"
      center={[mapPosition.x, mapPosition.y]}
      zoom={13}
      maxZoom={20}
      style={{ height: '332px', width: '332px' }}
    >
      <TileLayer
        url={`https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=${mapBoxToken}`}
        id="mapbox/streets-v11"
        attribution='Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors,
          <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>,
          Imagery © <a href="https://www.mapbox.com/">Mapbox</a>'
      />
      <Marker position={[mapPosition.x, mapPosition.y]} draggable />
    </Map>
  </div>
);

LeafletMap.defaultProps = {
  mapPosition: {
    x: 0,
    y: 0,
  },
};

LeafletMap.propTypes = {
  mapPosition: PropTypes.object,
};

export default LeafletMap;
