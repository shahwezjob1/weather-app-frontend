import React from 'react';
import ForecastTimeBox from './ForecastTimeBox';

const hours = ['00:00', '03:00', '06:00', '09:00', '12:00', '15:00', '18:00', '21:00'];

const ForecastTimeRow = () => (
  <div className="forecast-row">
    <div className="forecast-boxes">
      <div className='date-box'><p>Time</p></div>
      {hours.map((hour, index) => (
        <ForecastTimeBox key={index} hour={hour} />
      ))}
    </div>
  </div>
);

export default ForecastTimeRow;
