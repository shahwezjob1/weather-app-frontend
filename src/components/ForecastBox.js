import React from 'react';

const ForecastBox = ({ forecast }) => (
  <div className="forecast-box">
    {forecast ? (
      <>
        <p><strong>Weather is {forecast.summary}</strong></p>
        <p>{forecast.tempMin} C - {forecast.tempMax} C</p>
        <p>Winds {forecast.windSpeed} m/s</p>
        <p><strong>{forecast.advice}</strong></p>
      </>
    ) : (
      <p className="empty-box">No Data</p>
    )}
  </div>
);

export default ForecastBox;
