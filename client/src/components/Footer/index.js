import React from 'react';
import { Link } from 'react-router-dom';
import './footer.scss';

const Footer = () => (
  <footer>
    <Link to="/mentions-legales" className="footer-link">Mentions légales</Link>
    <Link to="/contact" className="footer-link">Contact</Link>
    <Link to="/equipe" className="footer-link">Équipe</Link>
    <Link to="/a-propos" className="footer-link">À propos</Link>
  </footer>
);

export default Footer;
