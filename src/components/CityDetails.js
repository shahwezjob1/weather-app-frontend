 import React from 'react';

const CityDetails = ({ cityData }) => (
  <div className="city-details">
    <p><strong>Population:</strong> {cityData.population}</p>
    <p><strong>Timezone:</strong> {Math.floor(cityData.timezone / 3600)}:{cityData.timezone % 3600 / 60}</p>
    <p><strong>Sunrise:</strong> {new Date(cityData.sunrise * 1000).toLocaleTimeString()}</p>
    <p><strong>Sunset:</strong> {new Date(cityData.sunset * 1000).toLocaleTimeString()}</p>
  </div>
);

export default CityDetails;
