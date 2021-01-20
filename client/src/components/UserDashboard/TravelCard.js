import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { timestampToDate } from 'src/selectors/dates';

import './userdashboard.scss';
import { MapPin } from 'react-feather';
import thumbnail from 'src/assets/images/ile-maurice.jpg';
import creatorIcon from 'src/assets/images/noun_backpacker_376244.svg';

const TravelCard = ({ travel, userID }) => (
  <div className="travel-card">
    <img src={thumbnail} className="travel-card-image" alt="thumbnail" />
    <div className="travel-card-content">
      <div className="travel-card-content-title">
        {travel.title}{(userID === travel.owner) ? (
          <img src={creatorIcon} className="creator-icon" alt="Vous etes organisateur sur ce voyage" />
        ) : null}
      </div>
      <div className="travel-card-content-destination">
        <MapPin color="grey" size={15} />
        {travel.destination}
      </div>
      <div className="travel-card-content-date">
        Du {timestampToDate(travel.departure_date)} au {timestampToDate(travel.return_date)}
      </div>
      <Link to={`/voyage/${travel.travel_id}`} className="travel-card-content-more">
        Voir ce voyage
      </Link>
    </div>
  </div>
);

TravelCard.propTypes = {
  travel: PropTypes.object.isRequired,
  userID: PropTypes.number.isRequired,
};

export default TravelCard;
