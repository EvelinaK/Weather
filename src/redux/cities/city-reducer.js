import { combineReducers } from 'redux';
import { createReducer, current } from '@reduxjs/toolkit';
import {
  fetchCityByQuery,
  fetchCityByID,
  renderCityByID,
  fetchForecast,
} from './city-operations';
import actions from './city-actions';

const items = createReducer(
  {},
  {
    [fetchCityByQuery.fulfilled]: (_, { payload }) => payload,
    [fetchCityByID.fulfilled]: (_, { payload }) => payload,
  },
);

const forecast = createReducer(
  {},
  {
    [fetchForecast.fulfilled]: (_, { payload }) => payload,
  },
);

const favouriteCities = createReducer([], {
  [actions.addCity]: (state, { payload }) => [...state, payload],
  [actions.deleteCity]: (state, { payload }) =>
    state.filter(({ weather }) => weather.id !== payload),
  [renderCityByID.fulfilled]: (state, { payload }) =>
    refreshCity(state, payload),
});

const refreshCity = (state, payload) => {
  const favouriteCity = state.find(city => city.weather.id === payload.id);
  if (favouriteCity) {
    state[state.indexOf(favouriteCity)].weather = payload;
  }
};

const loading = createReducer(false, {
  [fetchCityByQuery.pending]: () => true,
  [fetchCityByQuery.fulfilled]: () => false,
  [fetchCityByQuery.rejected]: () => false,
});

const error = createReducer(null, {});

export default combineReducers({
  items,
  favouriteCities,
  forecast,
  loading,
  error,
});
