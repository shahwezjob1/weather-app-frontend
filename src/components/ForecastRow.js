import React from 'react';
import ForecastBox from './ForecastBox';

const ForecastRow = ({ date, forecasts }) => (
  <div className="forecast-row">
    <div className="forecast-boxes">
      <div className='forecast-box'><p>{date}</p></div>
      {Object.entries(forecasts).map(([hour, forecast], index) => (
        <ForecastBox key={index} forecast={forecast} />
      ))}
    </div>
  </div>
);

export default ForecastRow;
