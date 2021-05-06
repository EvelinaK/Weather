import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import citiesOperations from '../redux/cities/city-operations';
import * as citiesSelectors from '../redux/cities/city-selectors';
import { useParams, useHistory, useLocation } from 'react-router-dom';
import WeatherChart from '../components/WeatherChart/WeaterChart';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { v4 as uudv4 } from 'uuid';
import './../index.css';

export default function DetailView() {
  const { weatherId } = useParams();

  const history = useHistory();
  const location = useLocation();

  const dispatch = useDispatch();

  const forecast = useSelector(citiesSelectors.getForecast);

  let weather;

  useState(() => {
    switch (location.state.from) {
      case '/search':
        dispatch(citiesOperations.fetchCityByID(weatherId));
        break;
      case '/':
        dispatch(citiesOperations.renderCityByID(weatherId));
        break;
      default:
        console.log('location.state.from not found');
    }
  });

  const weatherItem = useSelector(citiesSelectors.getItem);
  const weatherFavourite = useSelector(state =>
    citiesSelectors.getFavouriteCityByID(state, Number(weatherId)),
  );

  switch (location.state.from) {
    case '/search':
      weather = weatherItem;

      break;
    case '/':
      weather = weatherFavourite.weather;

      break;
    default:
      weather = weatherItem;
  }

  useEffect(() => {
    if (weather && weather.coord) {
      const { lon, lat } = weather.coord;

      dispatch(
        citiesOperations.fetchForecast({
          lat: lat.toFixed(2),
          lon: lon.toFixed(2),
        }),
      );
    }
  }, [dispatch, weather]);

  let hourlyTemp24;
  if (forecast?.hourly) {
    hourlyTemp24 = forecast.hourly.slice(0, 24);
  }
  console.log(hourlyTemp24);

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

  const goBack = () => {
    if (location.state && location.state.from) {
      history.push(location.state.from);
    } else history.push('/');
    // const { history } = location;
    // const { search } = location;
    // history.push(location?.state?.from || '/');
  };
  const classes = useStyles();
  return (
    <>
      <div className="form-cont">
        <Button className={classes.button} onClick={goBack}>
          <ArrowBackIcon style={{ color: 'white' }} />
        </Button>

        {weather && weather.name && weather.sys.country && (
          <>
            <div>
              <div className="location-box">
                <div className="location">
                  {weather.name}, {weather.sys.country}
                </div>
                <div className="date">{dateBuilder(new Date())}</div>
              </div>

              <div className="weather-box">
                <div className="temp">{Math.round(weather.main.temp)}°c</div>
                <div className="weather">{weather.weather[0].main}</div>
              </div>
            </div>
            <DetailContainer>
              <AnimatePresence exitBeforeEnter>
                <motion.div
                  initial="hidden"
                  animate="show"
                  variants={Animate}
                  exit="exit"
                  key={uudv4()}
                >
                  <p style={{ color: '#60a5fa' }}>WEATHER</p>
                  <WeatherChart chartData={hourlyTemp24} />
                </motion.div>
              </AnimatePresence>
            </DetailContainer>
          </>
        )}
      </div>
    </>
  );
}

const useStyles = makeStyles(theme => ({
  button: {
    margin: theme.spacing(1),
    backgroundColor: '#60a5fa',
  },
}));

export const Animate = {
  hidden: {
    opacity: 0,
    y: -100,
    scale: 0.1,
  },
  show: {
    scale: 1,
    y: 0,
    opacity: 1,
    transition: {
      duration: 1,
      ease: 'easeOut',
    },
  },
  exit: {
    scale: 0.1,
    y: -100,
    opacity: 0,
    transition: {
      duration: 1,
      ease: 'easeOut',
    },
  },
};
const DetailContainer = styled(motion.div)`
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 80vw;
  color: #fefefe;
  z-index: 2;
  position: relative;
  transition: all 0.5s ease;
  margin-top: 1rem;
  @media screen and (max-width: 900px) {
    height: auto;
    margin-top: 1rem;
  }
  @media screen and (max-width: 650px) {
    width: 90vw;
    margin-top: 1rem;
  }
`;
