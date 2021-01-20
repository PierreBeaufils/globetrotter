import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';

const PrivateRoute = ({ component: Component, loggedIn, ...rest }) => (
  <Route
    {...rest}
    render={(props) => (
      loggedIn ? <Component {...props} /> : <Redirect to="/connexion" />
    )}
  />
);

PrivateRoute.propTypes = {
  component: PropTypes.elementType.isRequired,
  loggedIn: PropTypes.bool.isRequired,
};

export default PrivateRoute;
