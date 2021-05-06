import React, { useSelector } from 'react-redux';

import '../views/HomeView.scss';

import './../index.css';

import * as citiesSelectors from '../redux/cities/city-selectors';
import WeatherList from '../components/WeatherList/WeatherList';

const styles = {
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontWeight: 500,
    fontSize: 48,
    textAlign: 'center',
    background: 'transparent',
  },
};

function HomeView() {
  const favouriteCities = useSelector(citiesSelectors.getFavouriteCities);

  return (
    <div tyle={styles.container} className="container-weather">
      <h1 style={styles.title}>Weather</h1>

      {favouriteCities.length > 0 ? (
        <div className="home-title">
          <h1 className="home-title">Your favorite cities</h1>
          <WeatherList cities={favouriteCities} />
        </div>
      ) : (
        <h2 className="home-title">Choose your favorite cities</h2>
      )}
    </div>
  );
}

export default HomeView;
