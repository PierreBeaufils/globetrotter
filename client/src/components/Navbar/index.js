import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import './navbar.scss';
import logo from 'src/assets/images/logo.png';

const Navbar = ({ loggedIn, logout }) => {
  const [toggleMenu, setToggleMenu] = useState(false);
  const [fade, setFade] = useState(false);

  const toggleHamburger = () => {
    if (toggleMenu) {
      return 'nav-links open';
    } return 'nav-links';
  };

  const toggleFade = () => {
    if (fade) {
      return 'test fade';
    } return 'test';
  };

  const handleToggle = () => {
    setToggleMenu(!toggleMenu);
    setFade(!fade);
  };

  const handleLogout = () => {
    setToggleMenu(!toggleMenu);
    setFade(!fade);
    logout();
  };

  const links = () => {
    if (!loggedIn) {
      return (
        <>
          <Link to="/inscription"><li className={toggleFade()} onClick={handleToggle}>Inscription</li></Link>
          <Link to="/connexion"><li className={toggleFade()} onClick={handleToggle}>Connexion</li></Link>
          <Link to="/contact"><li className={toggleFade()} onClick={handleToggle}>Contact</li></Link>
        </>
      );
    }
    return (
      <>
        <Link to="/tableau-de-bord"><li className={toggleFade()} onClick={handleToggle}>Mon espace</li></Link>
        <Link to="/contact"><li className={toggleFade()} onClick={handleToggle}>Contact</li></Link>
        <Link to="/"><li className={toggleFade()} onClick={handleLogout}>Déconnexion</li></Link>
      </>
    );
  };

  return (
    <nav>
      <div className="navbar">
        <div className="logo">
          <img src={logo} alt="logo" className="logo-image" />
          <Link to="/">
            <p className="logo-title">Globe<span className="logo-title--color">Trotter</span></p>
          </Link>
        </div>
        <div className="hamburger" onClick={handleToggle}>
          <div className="line" style={{ transform: toggleMenu ? 'rotate(-45deg) translate(-5px,6px)' : null }} />
          <div className="line" style={toggleMenu ? { transform: 'translateX(100%)', opacity: '0' } : {}} />
          <div className="line" style={{ transform: toggleMenu ? 'rotate(45deg) translate(-5px,-6px)' : null }} />
        </div>
        <ul className={toggleHamburger()}>
          {links()}
        </ul>
      </div>
    </nav>
  );
};

Navbar.propTypes = {
  loggedIn: PropTypes.bool.isRequired,
  logout: PropTypes.func.isRequired,
};

export default Navbar;
