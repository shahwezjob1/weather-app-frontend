export const fetchWeatherDataCache = (city) => {
  city = city.toLowerCase();
  const cachedData = localStorage.getItem(city);
  if (cachedData) {
    return JSON.parse(cachedData);
  } else {
    throw new Error("Not found in cache");
  }
};
