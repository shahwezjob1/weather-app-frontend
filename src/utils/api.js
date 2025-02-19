export const fetchWeatherDataApi = async (city) => {
  city = city.toLowerCase();
  const response = await fetch(`http://localhost:8080/weather?city=${city}`);
  const data = await response.json();
  if (response.ok) {
    localStorage.setItem(city, JSON.stringify(data));
    return data;
  } else {
    throw new Error("Server response is not ok");
  }
};
