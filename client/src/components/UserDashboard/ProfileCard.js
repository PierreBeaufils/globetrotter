import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import './userdashboard.scss';
import { User, Edit } from 'react-feather';

const ProfileCard = ({ user }) => (
  <div className="user-card">
    <div className="user-card-image">
      <User color="#2B7AFD" size={64} />
    </div>
    <div className="user-card-name">{user.first_name} {user.last_name}</div>
    <div className="user-card-email">
      {user.email}
    </div>
    <Link to="/profil">
      <div className="create--button user-card-edit">
        <Edit color="#fff" size={20} />
        Modifier mon profil
      </div>
    </Link>
  </div>
);

ProfileCard.propTypes = {
  user: PropTypes.object.isRequired,
};

export default ProfileCard;
