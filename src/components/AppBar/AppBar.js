import React from 'react';
import { NavLink } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

function ButtonAppBar() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar
        position="static"
        classes={{
          root: classes.root,
          label: classes.label,
        }}
      >
        <Toolbar>
          <Typography variant="h6">
            <NavLink
              exact
              to="/"
              className="NavLink"
              activeClassName="NavLink--active"
            >
              Home
            </NavLink>
          </Typography>
          <Typography variant="h6">
            <NavLink
              to="/search"
              className="NavLink"
              activeClassName="NavLink--active"
            >
              Search
            </NavLink>
          </Typography>
        </Toolbar>
      </AppBar>
    </div>
  );
}
const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: '#9dcfd5',
    background: 'linear-gradient(45deg, #f0c0cb 30%, #ffa678 90%)',
  },
  menuButton: {
    marginRight: theme.spacing(2),
    backgroundColor: '#9dcfd5',
  },
  title: {
    flexGrow: 1,
  },
}));
export default ButtonAppBar;
