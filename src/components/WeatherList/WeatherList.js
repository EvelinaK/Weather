import React from 'react';
import WeatherItem from '../WeatherItem/WeatherItem';
import { useSelector } from 'react-redux';
import * as citiesSelectors from '../../redux/cities/city-selectors';
export default function WeatherList() {
  const favouriteCities = useSelector(citiesSelectors.getFavouriteCities);
  return (
    <>
      {favouriteCities.map(city => (
        <WeatherItem key={city.weather.id} weather={city.weather} />
      ))}
    </>
  );
}
