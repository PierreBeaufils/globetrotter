import React from 'react';
import PropTypes from 'prop-types';
import { Link, Redirect } from 'react-router-dom';

import './styles.scss';

const RegisterForm = ({
  handleSignup,
  changeFieldValue,
  fields,
  error,
  validateRegister,
}) => {
  const handleChange = (event) => {
    changeFieldValue('signup', event.target.name, event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    handleSignup();
  };

  if (validateRegister) {
    return <Redirect to="/inscription/validation" />;
  } return (
    <div className="register">
      <div className="main-form register-form">
        <h2>Inscription</h2>
        <form onSubmit={handleSubmit}>

          <div className="register-form-field">
            <label htmlFor="email">Email<span className="required-asterisk">*</span>
              <input name="email" type="email" value={fields.email} onChange={handleChange} required />
            </label>
          </div>

          <div className="register-form-field">
            <label htmlFor="first_name">Prénom<span className="required-asterisk">*</span>
              <input name="first_name" type="text" value={fields.first_name} onChange={handleChange} required />
            </label>
          </div>

          <div className="register-form-field">
            <label htmlFor="last_name">Nom<span className="required-asterisk">*</span>
              <input name="last_name" type="text" value={fields.last_name} onChange={handleChange} required />
            </label>
          </div>

          <div className="register-form-field">
            <label htmlFor="password">Mot de passe<span className="required-asterisk">*</span>
              <input name="password" type="password" value={fields.password} onChange={handleChange} minLength="8" placeholder=" " pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}" required />
              <div className="requirements">
                Votre mot de passe doit comporter 8 caractères minimum dont
                au moins une minuscule, une majuscule, et un chiffre.
              </div>
            </label>
          </div>
          <label htmlFor="password_confirm">Confirmez votre mot de passe<span className="required-asterisk">*</span>
            <input name="password_confirm" type="password" value={fields.password_confirm} onChange={handleChange} required />
          </label>
          {error && (<div className="form-error">{error}</div>)}
          <input type="submit" />
        </form>
        <Link to="/connexion" className="links">Déjà inscrit ? Cliquez ici pour vous connecter</Link>
      </div>
    </div>
  );
};

RegisterForm.propTypes = {
  validateRegister: PropTypes.bool.isRequired,
  error: PropTypes.string,
  handleSignup: PropTypes.func.isRequired,
  changeFieldValue: PropTypes.func.isRequired,
  fields: PropTypes.shape({
    email: PropTypes.string.isRequired,
    first_name: PropTypes.string.isRequired,
    last_name: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
    password_confirm: PropTypes.string.isRequired,
  }),
};

RegisterForm.defaultProps = {
  fields: null,
  error: null,
};

export default RegisterForm;
