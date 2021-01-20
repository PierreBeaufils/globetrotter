import React from 'react';
import AlgoliaPlaces from 'algolia-places-react';
import PropTypes from 'prop-types';
import { appId, apiKey } from 'src/config';

const AlgoliaInput = ({ setLocationData }) => (
  <div className="algolia-container">
    <AlgoliaPlaces
      className="inputalgolia"
      placeholder="Saisissez le lieu"
      options={{
        appId, // Token Algolia Application id
        apiKey, // Token Algolia API key
        useDeviceLocation: false,

      }}
      onChange={({ suggestion }) => {
        setLocationData({
          city: suggestion.city,
          latLong: suggestion.latlng,
          address: suggestion.name,
        });
      }}
      onClear={() => setLocationData(null)}
    />
  </div>
);

AlgoliaInput.propTypes = {
  setLocationData: PropTypes.func.isRequired,
};

export default AlgoliaInput;
