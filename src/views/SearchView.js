import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  NavLink,
  useRouteMatch,
  useLocation,
  useHistory,
} from 'react-router-dom';
import citiesOperations from '../redux/cities/city-operations';
import actions from '../redux/cities/city-actions';
import * as citiesSelectors from '../redux/cities/city-selectors';
import { makeStyles } from '@material-ui/core/styles';
import CardContent from '@material-ui/core/CardContent';
import IconButton from '@material-ui/core/IconButton';
import { red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import RefreshIcon from '@material-ui/icons/Refresh';

import './../index.css';

function SearchView() {
  const [query, setQuery] = useState('');
  const [request, setRequest] = useState('');

  const { url } = useRouteMatch();
  const location = useLocation();
  let history = useHistory();
  const dispatch = useDispatch();

  const classes = useStyles();

  const weather = useSelector(citiesSelectors.getItem);
  const favouriteCities = useSelector(citiesSelectors.getFavouriteCities);

  const searchURL = new URLSearchParams(location.search).get('query') ?? '';
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    if (searchURL === '') {
      return;
    }

    dispatch(citiesOperations.fetchCityByQuery(query));
    setQuery('');
  }, [request, location.search, dispatch, searchURL]);

  const addCity = event => {
    if (favouriteCities.find(city => city.weather.id === weather.id)) {
      return;
    }
    dispatch(actions.addCity(weather));
  };

  const dateBuilder = d => {
    let months = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ];
    let days = [
      'Sunday',
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
    ];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`;
  };

  const handleRequestChange = event => {
    setQuery(event.currentTarget.value.toLowerCase());
  };

  const handleSubmit = event => {
    event.preventDefault();
    if (query) {
      history.push({
        ...location,
        search: `query=${query}`,
      });
      setRequest(query);
    }
  };

  const refresh = id => {
    dispatch(citiesOperations.fetchCityByID(id));
  };
  console.log(weather);
  return (
    <div className="App">
      <div className="search-box">
        <form onSubmit={handleSubmit}>
          <div id="sun"></div>
          <div id="cloud">
            <span className="shadow"></span>
            <input
              type="text"
              autoComplete="off"
              className="search-bar"
              autoFocus
              placeholder="Search..."
              value={query}
              onChange={handleRequestChange}
            />
          </div>
        </form>
      </div>
      {weather.weather && (
        <CardContent className={classes.root}>
          <div className="location-box">
            <div className="location">
              {weather.name}, {weather.sys.country}
            </div>
            <div className="date">{dateBuilder(new Date())}</div>
          </div>
          <div className="card-details">
            <IconButton color="primary" onClick={() => refresh(weather.id)}>
              <RefreshIcon style={{ color: '#60a5fa' }} />
            </IconButton>
            <IconButton
              className="weather-icon"
              color="secondary"
              aria-label="add to favorites"
            >
              <FavoriteIcon
                style={{ color: red[500] }}
                onClick={() => addCity()}
              />
            </IconButton>
          </div>
          <NavLink
            style={{ textDecoration: 'none' }}
            to={{
              pathname: `${url}/${weather.id}`,
              search: `query=${request}`,
              state: {
                from: location.pathname,
                search: `query=${request}`,
              },
            }}
          >
            <div className="weather-box">
              <div className="temp">{Math.round(weather.main.temp)}°c</div>
              <div className="weather">{weather.weather[0].description}</div>
            </div>
          </NavLink>
        </CardContent>
      )}
    </div>
  );
}
const useStyles = makeStyles(theme => ({
  root: {
    minWidth: 275,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },

  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 24,
  },
}));

export default SearchView;
