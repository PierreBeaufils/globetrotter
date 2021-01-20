import React from 'react';
import { Link } from 'react-router-dom';
import { Mail } from 'react-feather';

import './styles.scss';

const RegisterValidation = () => (
  <div className="register">
    <div className="register-validation">
      <div className="register-validation-header">
        <Mail size={52} color="#fff" className="register-validation-header-logo" />
      </div>
      <div className="register-validation-body">
        <h2>Bienvenue !</h2>
        <p>
          Votre compte a bien été créé ! Veuillez cliquer sur le lien de confirmation
          envoyé par mail afin de valider votre compte.
        </p>
        <Link to="/connexion" className="mail-button">Se connecter</Link>
      </div>
    </div>
  </div>
);

export default RegisterValidation;
