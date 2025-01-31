import React, { useState } from 'react';
import './App.css';

const App = () => {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const validateCityName = (name) => /^[a-zA-Z ]+$/.test(name);

  const handleSearch = async () => {
    if (city === "") {
        setError('Please enter city name to search')
        return
    }

    if (!validateCityName(city)) {
      setError('City name should only contain alphabets and spaces.');
      return;
    }

    setLoading(true);
    setError(null);
    setWeatherData(null);

    try {
      const response = await fetch(`http://localhost:8080/weather?city=${city}`);
      const data = await response.json();

      if (response.ok) {
        setWeatherData(data);
      } else {
        setError(data.message || 'An unexpected error occurred.');
      }
    } catch (err) {
      setError('Failed to fetch data. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const groupForecastsByDate = (forecasts) => {
    const hours = ['00:00', '03:00', '06:00', '09:00', '12:00', '15:00', '18:00', '21:00'];
    const groupedData = {};

    const [firstDate, firstTime] = forecasts[0].dtTxt.split(' ')
    console.log("First date = " + firstDate + "and first time = " + firstTime)
    groupedData[firstDate] = {}
    hours.forEach((hour) => {
        if (hour < firstTime.slice(0, 5)) {
            groupedData[firstDate][hour] = null;
        }
    })

    forecasts.forEach((forecast) => {
      const [date, time] = forecast.dtTxt.split(' ');
      const hour = time.slice(0, 5); 
  
      if (!groupedData[date]) {
        groupedData[date] = {};
      }
  
      groupedData[date][hour] = forecast;
    });
  
    const [lastDate, lastTime] = forecasts[forecasts.length - 1].dtTxt.split(' ')
    console.log("Last date = " + lastDate + "and last time = " + lastTime)
    hours.forEach((hour) => {
        if (hour > lastTime.slice(0, 5)) {
            groupedData[lastDate][hour] = null;
        }
    })
  
    return groupedData;
  };

  return (
    <div className="app">
      <div className="search-container">
        <input
          type="text"
          placeholder="Enter city name"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              handleSearch();
            }
          }}
        />
        <button onClick={handleSearch}>Search</button>
      </div>

      {loading && <p className="loading">Loading...</p>}

      {error && <p className="error">{error}</p>}

      {weatherData && (
        <div className="forecast-info">
            <h2>5-Day Weather Forecast for {weatherData.data.city}</h2>
            <div className="city-details">
                <p><strong>Population:</strong> {weatherData.data.population}</p>
                <p><strong>Timezone:</strong> {Math.floor(weatherData.data.timezone / 3600)}:{weatherData.data.timezone % 3600 / 60}</p>
                <p><strong>Sunrise:</strong> {new Date(weatherData.data.sunrise * 1000).toLocaleTimeString()}</p>
                <p><strong>Sunset:</strong> {new Date(weatherData.data.sunset * 1000).toLocaleTimeString()}</p>
            </div>
            <div className="forecast-container">
            {Object.entries(groupForecastsByDate(weatherData.data.list)).map(([date, forecasts]) => (
                <div key={date} className="forecast-row">
                    <div className="forecast-boxes">
                    <div className='date-box'><><p>{date}</p></></div>
                    {Object.entries(forecasts).map(([hour, forecast], index) => (
                        <div key={index} className="forecast-box">
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
                    ))}
                    </div>
                </div>
            ))}
        </div>
        </div>
        )}
    </div>
  );
};

export default App;
