import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

import './travel.scss';
import {
  FileText, Users, Map, Home, Briefcase,
} from 'react-feather';

const TravelMenu = ({ travel }) => (
  <div className="travel-details-container">
    <div className="travel-menu">
      <NavLink to={`/travel/${travel.id}/membres`} activeClassName="navlink-selected">
        <div className="travel-menu-icon">
          <Users size={24} className="elementCard-title" />
          <p>Participants</p>
        </div>
      </NavLink>
      <NavLink to={`/travel/${travel.id}/transport`} activeClassName="navlink-selected">
        <div className="travel-menu-icon">
          <Briefcase size={24} className="elementCard-title" />
          <p>Transport</p>
        </div>
      </NavLink>
      <NavLink to={`/travel/${travel.id}/hebergements`} activeClassName="navlink-selected">
        <div className="travel-menu-icon">
          <Home size={24} className="elementCard-title" />
          <p>Hébergement</p>
        </div>
      </NavLink>
      <NavLink to={`/travel/${travel.id}/activites`} activeClassName="navlink-selected">
        <div className="travel-menu-icon">
          <Map size={24} className="elementCard-title" />
          <p>Activités</p>
        </div>
      </NavLink>
      <NavLink to={`/travel/${travel.id}/documents`} activeClassName="navlink-selected">
        <div className="travel-menu-icon">
          <FileText size={24} className="elementCard-title" />
          <p>Documents</p>
        </div>
      </NavLink>
    </div>
  </div>
);

TravelMenu.propTypes = {
  travel: PropTypes.object,
};

TravelMenu.defaultProps = {
  travel: {},
};

export default TravelMenu;
