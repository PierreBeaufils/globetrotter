import React from 'react';
import { Link } from 'react-router-dom';
import './notfound.scss';

const NotFound = () => (
  <div className="notfound">
    <div className="notfound-404">
      <h3>Oops! Page non trouvée</h3>
      <h1><span>4</span><span>0</span><span>4</span></h1>
    </div>
    <h2>Nous sommes désolés, la page que vous avez demandée est introuvable</h2>
    <Link to="/" className="back-button">Retour à l'acceuil</Link>
  </div>
);

export default NotFound;
