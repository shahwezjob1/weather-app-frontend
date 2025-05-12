import React, { useState } from 'react';
import './App.css';
import SearchBar from './components/SearchBar';
import WeatherForecast from './components/WeatherForecast';
import ToggleSwitch from './components/ToggleSwitch';
import { fetchWeatherDataApi } from './utils/api';
import { fetchWeatherDataCache } from './utils/cache';
import Loader from './components/Loader';

const App = () => {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [offlineMode, setOfflineMode] = useState(false);

  const validateCityName = (name) => /^[a-zA-Z ]+$/.test(name);

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
      try {
        const result = fetchWeatherDataCache(city);
        setWeatherData(result);
      } catch {
        setError('Data not found in browser cache')
      }
    } else {
      try {
        const result = await fetchWeatherDataApi(city);
        setWeatherData(result);
      } catch {
        handleApiError(city);
      }
    }
    setLoading(false);
  };

  const handleApiError = (city) => {
    try {
      const cachedResult = fetchWeatherDataCache(city);
      setWeatherData(cachedResult);
    } catch {
      setError('Unable to reach the server and data not found in browser cache')
    }
  }

  return (
    <div className="app">
      <ToggleSwitch offlineMode={offlineMode} setOfflineMode={setOfflineMode} />

      <SearchBar city={city} setCity={setCity} handleSearch={handleSearch} />

      {loading && <Loader/>}

      {error && <p className="error">{error}</p>}

      {weatherData && (
        <WeatherForecast weatherData={weatherData} />
      )}
    </div>
  );
};

export default App;
