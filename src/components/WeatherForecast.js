import React from 'react';
import CityDetails from './CityDetails';
import ForecastRow from './ForecastRow';
import ForecastTimeRow from './ForecastTimeRow';

const groupForecastsByDate = (forecasts) => {
  const hours = ['00:00', '03:00', '06:00', '09:00', '12:00', '15:00', '18:00', '21:00'];
  const groupedData = {};
  const currentTimestamp = new Date().toISOString();
  const currentTime = currentTimestamp.slice(11, 16);
  const currentDate = currentTimestamp.slice(0, 10);

  var itr = 0;
  forecasts = forecasts.filter((forecast) => {
    const [date, time] = forecast.dtTxt.split(' ');
    const hour = time.slice(0, 5);
    const valid = !(currentDate > date || (currentDate === date && currentTime > hour));
    if (valid) {
      itr = itr + 1;
    }
    return valid && itr <= 24;
  });

  const [firstDate, firstTime] = forecasts[0].dtTxt.split(' ');
  groupedData[firstDate] = {};
  hours.forEach((hour) => {
    if (hour < firstTime.slice(0, 5)) {
      groupedData[firstDate][hour] = null;
    }
  });

  forecasts.forEach((forecast) => {
    const [date, time] = forecast.dtTxt.split(' ');
    const hour = time.slice(0, 5);

    if (!groupedData[date]) {
      groupedData[date] = {};
    }

    groupedData[date][hour] = forecast;
  });

  const [lastDate, lastTime] = forecasts[forecasts.length - 1].dtTxt.split(' ');
  hours.forEach((hour) => {
    if (hour > lastTime.slice(0, 5)) {
      groupedData[lastDate][hour] = null;
    }
  });

  return groupedData;
};

const WeatherForecast = ({ weatherData }) => {

  return (
    <div className="forecast-info">
      <h2>72 Hour Weather Forecast</h2>
      <CityDetails cityData={weatherData.data} />
      <div className="forecast-container">
        <ForecastTimeRow/>
        {Object.entries(groupForecastsByDate(weatherData.data.list)).map(([date, forecasts]) => (
          <ForecastRow key={date} date={date} forecasts={forecasts} />
        ))}
      </div>
    </div>
  );
};

export default WeatherForecast;
