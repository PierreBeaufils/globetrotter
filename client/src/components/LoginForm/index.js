import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import './styles.scss';

const LoginForm = ({
  email,
  password,
  changeFieldValue,
  handleLogin,
  error,
}) => {
  const handleChange = (event) => {
    changeFieldValue('login', event.target.name, event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    handleLogin();
  };

  return (
    <div className="login-container">
      <div className="main-form">
        <h2>Connexion</h2>
        <form onSubmit={handleSubmit}>
          <label htmlFor="email">Email
            <input name="email" type="email" required value={email} onChange={handleChange} />
          </label>

          <label htmlFor="password">Mot de passe
            <input name="password" type="password" required value={password} onChange={handleChange} />
          </label>
          {error && (
            <div className="form-error">{error}</div>
          )}
          <input type="submit" />
        </form>
        <Link to="/inscription" className="links">Vous n'avez pas de compte ? Cliquez ici pour vous inscrire</Link>
      </div>
    </div>
  );
};

LoginForm.defaultProps = {
  error: null,
};

LoginForm.propTypes = {
  email: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  changeFieldValue: PropTypes.func.isRequired,
  handleLogin: PropTypes.func.isRequired,
  error: PropTypes.string,
};

export default LoginForm;
