import axios from 'axios';

export const BASE_URL = 'http://api.openweathermap.org/data/2.5/';
export const API_KEY = '7c3d3ca22aedc91e6c47fc43aecca7bb';

axios.defaults.baseURL = BASE_URL;
axios.defaults.params = {
  appid: API_KEY,
};
export async function fetchCityByQuery(query) {
  const { data } = await axios.get(
    `${BASE_URL}weather?q=${query}&units=metric&appid=${API_KEY}`,
  );
  return data;
}

export async function fetchCityByID(weatherId) {
  const { data } = await axios.get(
    `${BASE_URL}weather?id=${weatherId}&units=metric&appid=${API_KEY}`,
  );
  return data;
}

export async function renderCityByID(weatherId) {
  const { data } = await axios.get(
    `${BASE_URL}weather?id=${weatherId}&units=metric&appid=${API_KEY}`,
  );
  return data;
}

export async function OneCallForecast(lat, lon) {
  const { data } = await axios.get(
    `${BASE_URL}onecall?lat=${lat}&lon=${lon}&units=metric&exclude={part}&appid=${API_KEY}`,
  );
  return data;
}
