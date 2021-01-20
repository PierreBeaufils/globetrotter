import React from 'react';
import Profile from 'src/containers/Profile';
import TabsUserProfileMobile from './TabsUserProfileMobile';

import './styles.scss';

const UserProfile = () => {
  const isMobile = window.innerWidth <= 500;
  if (isMobile) {
    return (
      <TabsUserProfileMobile />
    );
  }
  return (
    <div className="profil-main">
      <Profile />
    </div>
  );
};

export default UserProfile;
