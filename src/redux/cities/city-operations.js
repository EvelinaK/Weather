import { createAsyncThunk } from '@reduxjs/toolkit';
// import { schema, normalize } from 'normalizr';
import * as API from '../../services/Api';

export const fetchCityByQuery = createAsyncThunk(
  'cities/fetchCities',
  async query => {
    const data = await API.fetchCityByQuery(query);
    return data;
  },
);

export const fetchForecast = createAsyncThunk(
  'cities/fetchForecast',
  async ({ lat, lon }, thunkAPI) => {
    const data = await API.OneCallForecast(lat, lon);
    return data;
  },
);

export const fetchCityByID = createAsyncThunk(
  'cities/fetchCityByID',
  async id => {
    const data = await API.fetchCityByID(id);

    return data;
  },
);

export const renderCityByID = createAsyncThunk(
  'cities/renderByID',
  async id => {
    const data = await API.renderCityByID(id);
    return data;
  },
);

export default {
  fetchCityByQuery,
  fetchForecast,
  renderCityByID,
  fetchCityByID,
};
