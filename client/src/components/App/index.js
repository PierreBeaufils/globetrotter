import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Switch, Route, Redirect } from 'react-router-dom';
import './styles.css';

import Navbar from 'src/containers/Navbar';
import Footer from 'src/components/Footer';
import Homepage from 'src/components/Homepage';
import Mentions from 'src/components/Mentions';
import Contact from 'src/containers/Contact';
import Team from 'src/components/Team';
import LoginForm from 'src/containers/LoginForm';
import RegisterForm from 'src/containers/RegisterForm';
import NotFound from 'src/components/NotFound';
import UserProfile from 'src/components/UserProfile';
import TravelForm from 'src/containers/TravelForm';
import UserDashboard from 'src/containers/UserDashboard';
import Travel from 'src/containers/Travel';
import TravelDashboard from 'src/containers/TravelDashboard';
import RegisterValidation from 'src/components/RegisterForm/RegisterValidation';
import TokenValidation from 'src/containers/TokenValidation';
import InviteTraveler from 'src/containers/InviteTraveler';
import PrivateRoute from 'src/containers/PrivateRoute';

// == Component
const App = ({
  loggedIn, loginCheck, loading, user,
}) => {
  // Check if the user is connected
  useEffect(() => {
    loginCheck();
  }, []);

  return (
    <div className="app">
      {!loading && (
        <>
          <Navbar />
          <Switch>
            <Route path="/" exact>
              <Homepage user={user} />
            </Route>
            <Route exact path="/connexion">
              {loggedIn ? <Redirect to="/tableau-de-bord" /> : <LoginForm />}
            </Route>
            <Route exact path="/inscription">
              {loggedIn ? <Redirect to="/tableau-de-bord" /> : <RegisterForm />}
            </Route>
            <Route exact path="/inscription/validation" component={RegisterValidation} />
            <Route path="/mentions-legales" component={Mentions} />
            <Route path="/contact" component={Contact} />
            <Route path="/equipe" component={Team} />
            <PrivateRoute path="/profil" component={UserProfile} />
            <PrivateRoute path="/creer-un-voyage" component={TravelForm} />
            <PrivateRoute path="/tableau-de-bord" component={UserDashboard} />
            <PrivateRoute exact path="/voyage/:id" component={Travel} />
            <Route
              exact
              path="/voyage/:id/modifier"
              render={(props) => (
                <TravelForm {...props} editOrCreate="edit" />
              )}
            />
            <PrivateRoute exact path="/voyage/:id/dashboard" component={TravelDashboard} />
            <Route path="/verifier" component={TokenValidation} />
            <Route path="/rejoindre" component={InviteTraveler} />
            <Route component={NotFound} />
          </Switch>
          <Footer />
        </>
      )}
    </div>
  );
};

App.propTypes = {
  loggedIn: PropTypes.bool.isRequired,
  loginCheck: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  user: PropTypes.object.isRequired,
};

export default App;
