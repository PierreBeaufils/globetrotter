import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';

const AdminRoute = ({ component: Component, user, ...rest }) => (
  <Route
    {...rest}
    render={(props) => (
      user.role === 'admin' ? <Component {...props} /> : <Redirect to="/connexion" />
    )}
  />
);

AdminRoute.propTypes = {
  component: PropTypes.elementType.isRequired,
  user: PropTypes.object.isRequired,
};

export default AdminRoute;
