/* eslint-disable max-len */
import React from 'react';
import PropTypes from 'prop-types';
import {
  Map, CheckSquare, Trash2, Calendar, Info, Edit,
} from 'react-feather';

import ModalDelete from './Modals/ModalDelete';
import ModalCardDescription from './Modals/ModalCardDescription';
import useModal from './useModal';
import './styles.scss';

const CardTransport = (transport) => {
  const { isShowingModalDeleteCard, toggleModalDeleteCard } = useModal('ModalDeleteCard');
  const { isShowingModalCardDescription, toggleModalCardDescription } = useModal('ModalCardDescription');

  const transformDateISOtoString = (ISOdate) => new Date(ISOdate).toLocaleString('fr-FR', { timeZone: 'UTC' });

  const toggleSelectCard = () => {
    // if the id is already in the array, remove it
    if (transport.checkedTransports.find((element) => element === transport.id)) {
      transport.setcheckedTransports(transport.checkedTransports.filter((element) => element !== transport.id));
    }
    else { // Add the id in the array
      transport.setcheckedTransports([...transport.checkedTransports, transport.id]);
    }
  };

  return (
    // Timestamp is used to order by date in CSS rendering
    <div className="card__container" style={{ order: `${transport.timestamp}` }}>

      <ModalDelete
        isShowing={isShowingModalDeleteCard}
        hide={toggleModalDeleteCard}
        elementName={transport.from}
        category="transport"
        elementId={transport.id}
        travelId={transport.travel_id}
        fetchOneTravel={transport.fetchOneTravel}
      />

      <ModalCardDescription
        isShowing={isShowingModalCardDescription}
        hide={toggleModalCardDescription}
        categoryName="Transport"
        oneThingData={transport}
      />
      <div className="elementCard">
        <div
          className="card__text"
          onClick={() => toggleModalCardDescription()}
        >
          <h3><Map size={32} className="elementCard-title" /> Trajet de {transport.from} à {transport.to}</h3>
          <h4>Moyen de transport: {transport.type}</h4>
          <h4><Calendar color="#2B7AFD" size={15} /> Du {transformDateISOtoString(transport.departure_date)} au {transformDateISOtoString(transport.arrival_date)}
          </h4>

          <p><Info color="#2B7AFD" size={15} /> {transport.memo}</p>
        </div>
        {(transport.isEditAllowed) ? (
          <div className="card__footer">

            {(transport.editMode) ? (
              <CheckSquare
                onClick={() => toggleSelectCard()}
                color={transport.checkedTransports.find((element) => element === transport.id) ? '#80CC24' : '#7a7a7a'}
                className="display__pointer"
              />
            ) : null}
            <Edit
              onClick={() => transport.handleAddThing(transport)}
              color="#80CC24"
              className="display__pointer"
            />
            <Trash2
              color="#FF7A32"
              onClick={() => toggleModalDeleteCard(transport.id)}
              className="display__pointer"
            />
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default CardTransport;
