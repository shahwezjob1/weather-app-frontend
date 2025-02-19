import React, { useState } from 'react';
import './App.css';
import SearchBar from './components/SearchBar';
import WeatherForecast from './components/WeatherForecast';
import ToggleSwitch from './components/ToggleSwitch';

const App = () => {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [offlineMode, setOfflineMode] = useState(false);

  const validateCityName = (name) => /^[a-zA-Z ]+$/.test(name);

  const fetchWeatherDataApi = async (city) => {
    try {
      city = city.toLowerCase();
      console.log("city = " + city);
      const response = await fetch(`http://localhost:8080/weather?city=${city}`);
      const data = await response.json();
      if (response.ok) {
        console.log("fetched data for city = " + city);
        setWeatherData(data);
        localStorage.setItem(city, JSON.stringify(data));
      } else {
        fetchWeatherDataCache(city);
      }
    } catch (err) {
      fetchWeatherDataCache(city);
    } finally {
      setLoading(false);
    }
  };

  const fetchWeatherDataCache = (city) => {
    console.error("failed to fetch data for city = " + city);
    const cachedData = localStorage.getItem(city);
    if (cachedData) {
      console.log("found data in browser cache for city = " + city);
      setWeatherData(JSON.parse(cachedData));
      setError('Server not reachable, showing data from browser cache.');
    } else {
      console.error("not found data in browser cache for city = " + city);
      setError('Server not reachable and data not found in browser cache.');
    }
  };

  const handleSearch = async () => {
    if (city === "") {
      setError('Please enter city name to search');
      return;
    }

    if (!validateCityName(city)) {
      setError('City name should only contain alphabets and spaces.');
      return;
    }

    setLoading(true);
    setError(null);
    setWeatherData(null);
    if (offlineMode) {
      fetchWeatherDataCache(city);
      setLoading(false);
    } else {
      fetchWeatherDataApi(city);
    }
  };

  return (
    <div className="app">
      <ToggleSwitch offlineMode={offlineMode} setOfflineMode={setOfflineMode} />

      <SearchBar city={city} setCity={setCity} handleSearch={handleSearch} />

      {loading && <p className="loading">Loading...</p>}

      {error && <p className="error">{error}</p>}

      {weatherData && (
        <WeatherForecast weatherData={weatherData} />
      )}
    </div>
  );
};

export default App;
