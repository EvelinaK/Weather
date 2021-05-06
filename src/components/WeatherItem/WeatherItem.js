import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useRouteMatch, useLocation } from 'react-router-dom';

import actions from '../../redux/cities/city-actions';

import citiesOperations from '../../redux/cities/city-operations';

import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import RefreshIcon from '@material-ui/icons/Refresh';
import { red } from '@material-ui/core/colors';

import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import DeleteIcon from '@material-ui/icons/Delete';

export default function WeatherItem({ weather }) {
  const { url } = useRouteMatch();
  const location = useLocation();
  const dispatch = useDispatch();

  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const removeCity = () => {
    dispatch(actions.deleteCity(weather.id));
  };

  const refresh = () => {
    dispatch(citiesOperations.renderCityByID(weather.id));
  };

  window.onload = function () {
    const loaded = sessionStorage.getItem('loaded');
    if (loaded) {
      refresh();
    } else {
      sessionStorage.setItem('loaded', true);
    }
  };

  return (
    <>
      <Card className={classes.root}>
        <CardActionArea>
          <IconButton color="primary" onClick={() => refresh()}>
            <RefreshIcon style={{ color: '#60a5fa' }} />
          </IconButton>
          <CardMedia
            className={classes.media}
            image={`https://openweathermap.org/img/w/${weather.weather[0].icon}.png`}
          />
          <h2>{weather.weather[0].description}</h2>
          <Link
            className="weather-link"
            to={{
              pathname: `${url}${weather.id}`,
              state: {
                from: location.pathname,
              },
            }}
          >
            <CardContent className="Link-detail">
              <h3> {weather.name}</h3>
              <h3>{weather.sys.country}</h3>
              <div className="location-box">
                <div className="weather">{Math.round(weather.main.temp)}°c</div>
                <div className="weather">
                  feel like {Math.round(weather.main.feels_like)}°c
                </div>
                <div className="weather">
                  wind speed {weather.wind.speed}m/s
                </div>
                <div className="weather">{weather.weather[0].description}</div>
              </div>
            </CardContent>
          </Link>
        </CardActionArea>
        <CardActions disableSpacing>
          <IconButton
            aria-label="delete"
            color="secondary"
            onClick={() => removeCity()}
          >
            <DeleteIcon style={{ color: red[500] }} />
          </IconButton>

          <IconButton
            className={clsx(classes.expand, {
              [classes.expandOpen]: expanded,
            })}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="show more"
          >
            <ExpandMoreIcon />
          </IconButton>
        </CardActions>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <CardContent>
            <Typography paragraph>Detail weather</Typography>
            <Typography paragraph>
              <div className="temp">
                humidity {Math.round(weather.main.humidity)} %
              </div>
              <div className="temp">
                pressure {Math.round(weather.main.pressure)}hPa
              </div>
              <div className="temp">
                sunrise{' '}
                {new Date(weather.sys.sunrise * 1000)
                  .toLocaleTimeString('en-GB')
                  .slice(0, 5)}
              </div>
              <div className="temp">
                sunset{' '}
                {new Date(weather.sys.sunset * 1000)
                  .toLocaleTimeString('en-GB')
                  .slice(0, 5)}
              </div>
            </Typography>
          </CardContent>
        </Collapse>
      </Card>
    </>
  );
}

const useStyles = makeStyles(theme => ({
  root: {
    width: 354,
    margin: 25,
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: 'rgba(255, 255, 255, 0.4);',
    boxShadow: '3px 6px rgb(0 0 0 / 20%)',
    textDecoration: 'none',
    color: '#60a5fa',
    fontSize: '30px',
  },

  media: {
    height: 0,
    paddingTop: '30.9%',
    backgroundSize: '25%',
  },

  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
}));
