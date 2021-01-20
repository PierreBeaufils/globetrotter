/* eslint-disable max-len */
import React from 'react';
import {
  MapPin, CheckSquare, Trash2, Calendar, Info, Edit, Home,
} from 'react-feather';
import ModalDelete from './Modals/ModalDelete';
import ModalCardDescription from './Modals/ModalCardDescription';
import useModal from './useModal';
// import PropTypes from 'prop-types';
import './styles.scss';

const CardAccommodation = (oneAccomodation) => {
  const { isShowingModalDeleteCard, toggleModalDeleteCard } = useModal('ModalDeleteCard');
  const { isShowingModalCardDescription, toggleModalCardDescription } = useModal('ModalCardDescription');

  const transformDateISOtoString = (ISOdate) => new Date(ISOdate).toLocaleString('fr-FR', { timeZone: 'UTC' });

  const toggleSelectCard = () => {
    // if the id is already in the array, remove it
    if (oneAccomodation.checkedAccommodations.find((element) => element === oneAccomodation.id)) {
      oneAccomodation.setcheckedAccommodations(oneAccomodation.checkedAccommodations.filter((element) => element !== oneAccomodation.id));
    }
    else { // or add the id in the array
      oneAccomodation.setcheckedAccommodations([...oneAccomodation.checkedAccommodations, oneAccomodation.id]);
    }
  };

  return (
    // Timestamp is used to order by date in CSS rendering
    <div className="card__container" style={{ order: `${oneAccomodation.timestamp}` }}>

      <ModalDelete
        isShowing={isShowingModalDeleteCard}
        hide={toggleModalDeleteCard}
        elementName={oneAccomodation.name}
        category="accommodation"
        elementId={oneAccomodation.id}
        travelId={oneAccomodation.travel_id}
        fetchOneTravel={oneAccomodation.fetchOneTravel}
      />

      <ModalCardDescription
        isShowing={isShowingModalCardDescription}
        hide={toggleModalCardDescription}
        categoryName="Hébergement"
        oneThingData={oneAccomodation}
      />
      <div className="elementCard">
        <div
          className="card__text"
          onClick={() => toggleModalCardDescription()}
        >
          <h3 className="elementCard-title"><Home size={32} />Séjour à l'établissement {oneAccomodation.name}</h3>
          <h4><MapPin color="#2B7AFD" size={15} /> {oneAccomodation.address} {oneAccomodation.city}</h4>
          <h4><Calendar color="#2B7AFD" size={15} /> Du {transformDateISOtoString(oneAccomodation.arrival_date)} au {transformDateISOtoString(oneAccomodation.departure_date)}</h4>
          {(oneAccomodation.information !== '') ? <p><Info color="#2B7AFD" size={15} /> {oneAccomodation.information}</p> : null}
        </div>
        {(oneAccomodation.isEditAllowed) ? (
          <div className="card__footer">

            {(oneAccomodation.editMode) ? (
              <CheckSquare
                onClick={() => toggleSelectCard()}
                color={oneAccomodation.checkedAccommodations.find((element) => element === oneAccomodation.id) ? '#80CC24' : '#7a7a7a'}
                className="display__pointer"
              />
            ) : null}
            <Edit
              onClick={() => oneAccomodation.handleAddThing(oneAccomodation)}
              color="#80CC24"
              className="display__pointer"
            />
            <Trash2
              color="#FF7A32"
              onClick={() => toggleModalDeleteCard(oneAccomodation.id)}
              className="display__pointer"
            />
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default CardAccommodation;
