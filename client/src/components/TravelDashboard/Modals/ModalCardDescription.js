/* eslint-disable max-len */
import React from 'react';
import ReactDOM from 'react-dom';
import {
  Users, XSquare, Info, MapPin, DollarSign, LogIn, LogOut, Map, Send, FileText, Home, Calendar, Clock,
} from 'react-feather';
import LeafletMap from 'src/components/LeafletMap';
// import PropTypes from 'prop-types';
import '../styles.scss';

const ModalCardDescription = ({
  isShowing, hide, categoryName, oneThingData,
}) => {
  // function to transform the date from iso to string
  const transformDateISOtoString = (ISOdate) => new Date(ISOdate).toLocaleString('fr-FR', { timeZone: 'UTC' });

  return (isShowing ? ReactDOM.createPortal(
    <>
      <div className="modal-overlay" />
      <div className="modal-wrapper" aria-modal aria-hidden tabIndex={-1} role="dialog">
        <div className="modal">
          <div className="modal-header">

            <button type="button" className="modal-close-button" data-dismiss="modal" aria-label="Close" onClick={hide}>
              <span aria-hidden="true"><XSquare
                color="#FF7A32"
              />
              </span>
            </button>
          </div>

          <div className="modal_content">
            {(categoryName === 'Hébergement') ? ( // Accommodation description modale
              <div className="modal_content-main">
                <h2>Hébergement {oneThingData.name}</h2>
                <h4><MapPin color="#2B7AFD" size={15} /> {oneThingData.address} {oneThingData.city}</h4>
                {(oneThingData.coordinate !== null) ? (
                  <LeafletMap
                    mapPosition={oneThingData.coordinate}
                  />
                ) : null}
                <h4><LogIn color="#2B7AFD" size={15} /> Date d'arrivée: {transformDateISOtoString(oneThingData.arrival_date)}</h4>
                <h4><LogOut color="#2B7AFD" size={15} /> Date de départ: {transformDateISOtoString(oneThingData.departure_date)}</h4>
                <h4><DollarSign color="#2B7AFD" size={15} /> Prix unitaire: {oneThingData.unit_price} EUR</h4>
                {(oneThingData.information != null) ? <h4><Info color="#2B7AFD" size={15} /> {oneThingData.information}</h4> : null}
                {(oneThingData.availability != null) ? <h4>Disponibilité: {oneThingData.availability} places</h4> : null}
                <h4><Users color="#2B7AFD" size={15} /> Nombre prévu voyageurs: {oneThingData.quantity}</h4>
              </div>
            ) : null}
            {(categoryName === 'Transport') ? ( // transport description modale
              <div className="modal_content-main">
                <h2>Transport {oneThingData.name}</h2>
                <h4><Map color="#2B7AFD" size={15} /> De {oneThingData.from} à {oneThingData.to}</h4>
                <h4><Send color="#2B7AFD" size={15} /> Moyen de transport: {oneThingData.type}</h4>
                <h4><Home color="#2B7AFD" size={15} /> Société de transport: {oneThingData.company}</h4>
                <h4><LogOut color="#2B7AFD" size={15} /> Date et heure de départ: {transformDateISOtoString(oneThingData.departure_date)}</h4>
                <h4><LogIn color="#2B7AFD" size={15} /> Date et heure d'arrivée: {transformDateISOtoString(oneThingData.arrival_date)}</h4>
                <h4><DollarSign color="#2B7AFD" size={15} /> Prix unitaire: {oneThingData.unit_price} EUR</h4>
                {(oneThingData.reservation_ref != null) ? <h4><FileText color="#2B7AFD" size={15} /> Réference de reservation: {oneThingData.reservation_ref}</h4> : null}
                <h4><Users color="#2B7AFD" size={15} /> Nombre de voyageurs prévu: {oneThingData.quantity}</h4>
                {(oneThingData.memo != null) ? <h4><Info color="#2B7AFD" size={15} /> {oneThingData.memo}</h4> : null}
              </div>
            ) : null}
            {(categoryName === 'Activité') ? (// activity description modale
              <div className="modal_content-main">
                <h3>Activité: {oneThingData.name}</h3>
                <h4><MapPin color="#2B7AFD" size={15} /> Lieu: {oneThingData.place}</h4>
                {(oneThingData.coordinate !== null) ? (
                  <LeafletMap
                    mapPosition={oneThingData.coordinate}
                  />
                ) : null}
                <h4><Calendar color="#2B7AFD" size={15} /> Date et heure: {transformDateISOtoString(oneThingData.date)}</h4>
                <h4><Clock color="#2B7AFD" size={15} /> Durée prévue: {oneThingData.duration.minutes} minutes</h4>
                <h4><Users color="#2B7AFD" size={15} /> Nombre de participants prévu: {oneThingData.quantity}</h4>
                <h4><DollarSign color="#2B7AFD" size={15} /> Prix unitaire: {oneThingData.unit_price} EUR</h4>
                <h4><Info color="#2B7AFD" size={15} /> {oneThingData.description}</h4>
              </div>
            ) : null}
          </div>

        </div>
      </div>
    </>, document.body,
  ) : null);
};

// ModalDelete.propTypes = {

// };

// ModalDelete.defaultProps = {

// };

export default ModalCardDescription;
