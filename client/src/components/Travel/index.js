/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Link, useHistory } from 'react-router-dom';
import axios from 'axios';
import { baseURL } from 'src/config';
import { timestampToDate } from 'src/selectors/dates';

import './travel.scss';
import {
  MapPin, Calendar, PlusSquare,
} from 'react-feather';

import thumbnail from 'src/assets/images/ile-maurice.jpg';
import CardAccommodation from '../TravelDashboard/CardAccommodation';
import CardTransport from '../TravelDashboard/CardTransport';
import CardActivity from '../TravelDashboard/CardActivity';
import Price from './Prices';
import TravelDocuments from './TravelDocuments';

const Travel = ({
  travel, fetchOneTravel, id, saveOneTravel, userID,
}) => {
  const [loading, setLoading] = useState(true);

  const history = useHistory();
  const isEditAllowed = userID === travel.owner;

  const fetchTravel = (travelId) => {
    axios.get(`${baseURL}/travel/${travelId}`, { withCredentials: true })
      .then((res) => {
        if (res.status === 200) {
          saveOneTravel(res.data);
          setLoading(false);
        }
      })
      .catch(() => {
        history.push('/');
      });
  };

  useEffect(() => {
    fetchTravel(id);
  }, []);
  return (
    <div className="travel-details-container">
      {!loading && (
        <>
          <div className="card-container travel-card travel-details">
            <div className="travel-card card-detail">
              <img src={thumbnail} className="travel-card-image card-detail-image" alt="thumbnail" />
              <div className="travel-card-content">
                <div className="travel-card-content-title">{travel.title}</div>
                <div className="travel-card-content-destination">
                  <MapPin color="grey" size={15} />
                  {travel.destination}
                </div>
                <div className="travel-card-content-date">
                  <Calendar color="grey" size={15} />
                  {timestampToDate(travel.departure_date)} au {timestampToDate(travel.return_date)}
                </div>
                {(isEditAllowed) ? (
                  <Link to={`/voyage/${travel.id}/modifier`} className="travel-card-content-more card-details">
                    Modifier les détails
                  </Link>
                ) : null}
              </div>
            </div>
          </div>
          {(isEditAllowed) ? (
            <Link to={`/voyage/${id}/dashboard`}>
              <div className="validate--button validate_or_cancel_selection travel-addelements-button">
                <PlusSquare color="#fff" />
                <p>Ajouter un hébergement, trajet ou activité au voyage</p>
              </div>
            </Link>
          ) : null}
          <div className="travel-details-container-details">
            <div className="travel-container">
              <div className="cards__container travel__view">
                {/* Filter validated items */}

                {travel.accommodation.filter((item) => item.selected).map((oneAccomodation) => (
                  <CardAccommodation
                    key={oneAccomodation.id}
                    {...oneAccomodation}
                    isEditAllowed={isEditAllowed}
                    timestamp={new Date(`${oneAccomodation.arrival_date}`).getTime() / 1000}
                    fetchOneTravel={fetchOneTravel}
                  />
                ))}
                {travel.activity.filter((item) => item.selected).map((oneActivity) => (
                  <CardActivity
                    key={oneActivity.id}
                    {...oneActivity}
                    isEditAllowed={isEditAllowed}
                    timestamp={new Date(`${oneActivity.date}`).getTime() / 1000}
                    fetchOneTravel={fetchOneTravel}
                  />
                ))}
                {travel.transport.filter((item) => item.selected).map((oneTransport) => (
                  <CardTransport
                    key={oneTransport.id}
                    {...oneTransport}
                    isEditAllowed={isEditAllowed}
                    timestamp={new Date(`${oneTransport.departure_date}`).getTime() / 1000}
                    fetchOneTravel={fetchOneTravel}
                  />
                ))}
              </div>
            </div>
            <div className="travel-details-container-right-side">
              <Price prices={travel.prices[0]} />
              <TravelDocuments documents={travel.documents} isEditAllowed={isEditAllowed} travelID={travel.id} />
            </div>
          </div>
        </>
      )}
    </div>
  );
};

Travel.propTypes = {
  travel: PropTypes.object,
  fetchOneTravel: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
  saveOneTravel: PropTypes.func.isRequired,
  userID: PropTypes.number.isRequired,
};

Travel.defaultProps = {
  travel: null,
};

export default Travel;
