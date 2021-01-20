/* eslint-disable max-len */
import React from 'react';
import PropTypes from 'prop-types';
import {
  MapPin, CheckSquare, Trash2, Calendar, Clock, Info, Edit, Compass,
} from 'react-feather';
import ModalDelete from './Modals/ModalDelete';
import ModalCardDescription from './Modals/ModalCardDescription';
import useModal from './useModal';

import './styles.scss';

const CardActivity = (activity) => {
  const { isShowingModalDeleteCard, toggleModalDeleteCard } = useModal('ModalDeleteCard');
  const { isShowingModalCardDescription, toggleModalCardDescription } = useModal('ModalCardDescription');

  const transformDateISOtoString = (ISOdate) => new Date(ISOdate).toLocaleString('fr-FR', { timeZone: 'UTC' });

  const toggleSelectCard = () => {
    // if the id is already in the array, remove it
    if (activity.checkedActivities.find((element) => element === activity.id)) {
      activity.setcheckedActivities(activity.checkedActivities.filter((element) => element !== activity.id));
    }
    else { // or add the id in the array
      activity.setcheckedActivities([...activity.checkedActivities, activity.id]);
    }
  };

  return (
    // Timestamp is used to order by date in CSS rendering
    <div className="card__container" style={{ order: `${activity.timestamp}` }}>

      <ModalDelete
        isShowing={isShowingModalDeleteCard}
        hide={toggleModalDeleteCard}
        elementName={activity.name}
        category="activity"
        elementId={activity.id}
        travelId={activity.travel_id}
        fetchOneTravel={activity.fetchOneTravel}
      />

      <ModalCardDescription
        isShowing={isShowingModalCardDescription}
        hide={toggleModalCardDescription}
        categoryName="Activité"
        oneThingData={activity}
      />
      <div className="elementCard">
        <div
          className="card__text"
          onClick={() => toggleModalCardDescription()}
        >
          <h3><Compass size={32} className="elementCard-title" />Activité: {activity.name}</h3>
          <h4><MapPin color="#2B7AFD" size={15} /> {activity.place}</h4>
          <h4><Calendar color="#2B7AFD" size={15} /> {transformDateISOtoString(activity.date)}</h4>
          <h4><Clock color="#2B7AFD" size={15} /> durée: {activity.duration.minutes} minutes</h4>
          <p><Info color="#2B7AFD" size={15} /> {activity.description}</p>
        </div>
        {(activity.isEditAllowed) ? (
          <div className="card__footer">

            {(activity.editMode) ? (
              <CheckSquare
                onClick={() => toggleSelectCard()}
                color={activity.checkedActivities.find((element) => element === activity.id) ? '#80CC24' : '#7a7a7a'}
                className="display__pointer"
              />
            ) : null}
            <Edit
              onClick={() => activity.handleAddThing(activity)}
              color="#80CC24"
              className="display__pointer"
            />
            <Trash2
              color="#FF7A32"
              onClick={() => toggleModalDeleteCard(activity.id)}
              className="display__pointer"
            />
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default CardActivity;
