import { createAction } from '@reduxjs/toolkit';

export const addCity = createAction('cities/add', weather => ({
  payload: {
    weather,
  },
}));

export const refreshCity = createAction('cities/refresh');
export const deleteCity = createAction('cities/delete');

export default { addCity, refreshCity, deleteCity };
