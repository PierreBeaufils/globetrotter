import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import {
  Users, XSquare, MapPin, DollarSign, LogIn, LogOut, Send, FileText, Home, Info,
} from 'react-feather';
import AlgoliaPlaces from 'algolia-places-react';
import { appId, apiKey, baseURL } from 'src/config';
import '../styles.scss';

const ModalAddTransport = ({
  isShowing, hide, transport, travelID, editOrCreate, fetchOneTravel,
}) => {
  const setTitle = () => {
    if (editOrCreate === 'edit') {
      return 'Modifier un transport';
    }
    return 'Ajouter un transport';
  };

  const initialValues = () => {
    if (editOrCreate === 'edit') {
      return {
        from: transport.from,
        to: transport.to,
        type: transport.type,
        company: transport.company,
        departure_date: transport.departure_date,
        arrival_date: transport.arrival_date,
        reservation_ref: transport.reservation_ref,
        unit_price: transport.unit_price,
        quantity: transport.quantity,
        memo: transport.memo,
      };
    }
    return {};
  };

  const {
    register, handleSubmit, errors,
  } = useForm({ defaultValues: initialValues() });

  const [startPlace, setStartPlace] = useState('');
  const [arrivalPlace, setArrivalPlace] = useState('');

  const onSubmit = (data) => {
    axios.post(`${baseURL}/travel/${travelID}/transport`, data)
      .then(() => {
        hide();
        fetchOneTravel(travelID);
      });
  };

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
            <div>
              {setTitle()}
              <form onSubmit={handleSubmit(onSubmit)} className="main-form addThingDesktop"> {/* Changer le nom de la classe ! */}

                <label htmlFor="from">
                  <MapPin color="#2B7AFD" size={15} />
                  <span className="fieldName">Lieu de départ</span>
                  <span className="required-asterisk">*</span>
                  <input name="from" id="from" type="hidden" ref={register({ required: true })} value={startPlace} />
                  {errors.from && <span className="warning-text">Veuillez sélectionner un lieu de départ</span>}
                  <AlgoliaPlaces
                    className="inputalgolia"
                    placeholder="Saisissez le lieu"
                    options={{
                      appId,
                      apiKey,
                    }}
                    onChange={({ suggestion }) => {
                      setStartPlace(suggestion.value);
                    }}
                    onClear={() => setStartPlace('')}
                  />
                </label>

                <label htmlFor="to">
                  <MapPin color="#2B7AFD" size={15} />
                  <span className="fieldName">Lieu d'arrivée</span>
                  <span className="required-asterisk">*</span>
                  <input name="to" id="to" ref={register({ required: true })} type="hidden" value={arrivalPlace} />
                  {errors.to && <span className="warning-text">Veuillez sélectionner un lieu d'arrivée</span>}
                  <AlgoliaPlaces
                    className="inputalgolia"
                    placeholder="Saisissez le lieu"
                    options={{
                      appId,
                      apiKey,
                    }}
                    onChange={({ suggestion }) => {
                      setArrivalPlace(suggestion.value);
                    }}
                    onClear={() => setArrivalPlace('')}
                  />
                </label>

                <label htmlFor="departure_date">
                  <LogIn color="#2B7AFD" size={15} />
                  <span className="fieldName">Date et heure de départ</span>
                  <span className="required-asterisk">*</span>
                  <input
                    name="departure_date"
                    ref={register({ required: true })}
                    type="datetime-local"
                    pattern="[0-9]{4}-[0-9]{2}-[0-9]{2}T[0-9]{2}:[0-9]{2}"
                  />
                  {errors.startDate && <span className="warning-text">Veuillez sélectionner une date de départ</span>}
                </label>

                <label htmlFor="arrival_date">
                  <LogOut color="#2B7AFD" size={15} />
                  <span className="fieldName">Date et heure d'arrivée</span>
                  <input
                    name="arrival_date"
                    ref={register({ required: false })}
                    type="datetime-local"
                  />
                </label>

                <label htmlFor="type">
                  <Send color="#2B7AFD" size={15} />
                  <span className="fieldName">Mode de transport</span>
                  <span className="required-asterisk">*</span>
                  <input name="type" ref={register({ required: true })} type="text" />
                  {errors.type && <span className="warning-text">Veuillez saisir un mode de transport</span>}
                </label>

                <label htmlFor="company">
                  <Home color="#2B7AFD" size={15} />
                  <span className="fieldName">Société/compagnie</span>
                  <input name="company" ref={register({ required: false })} type="text" />
                </label>

                <label htmlFor="unit_price">
                  <DollarSign color="#2B7AFD" size={15} />
                  <span className="fieldName">Tarif par personne</span>
                  <span className="required-asterisk">*</span>
                  <input
                    name="unit_price"
                    ref={register({ required: false })}
                    type="number"
                    min="0"
                  />
                </label>

                <label htmlFor="quantity">
                  <Users color="#2B7AFD" size={15} />
                  <span className="fieldName">Nombre de voyageurs prévus</span>
                  <span className="required-asterisk">*</span>
                  <input
                    name="quantity"
                    ref={register({ required: false })}
                    type="number"
                    step="1"
                    min="0"
                  />
                </label>

                <label htmlFor="reservation_ref">
                  <FileText color="#2B7AFD" size={15} />
                  <span className="fieldName">Référence de réservation</span>
                  <input name="reservation_ref" ref={register({ required: false })} type="text" />
                </label>

                <label htmlFor="memo">
                  <Info color="#2B7AFD" size={15} />
                  <span className="fieldName">Informations complémentaires</span>
                  <input name="memo" ref={register({ required: false })} type="text" />
                </label>

                <input
                  type="submit"
                  value="Ajouter le transport"
                />
              </form>
            </div>
          </div>
        </div>
      </div>
    </>, document.body,
  ) : null);
};

ModalAddTransport.propTypes = {
  transport: PropTypes.object,
  editOrCreate: PropTypes.string,
};

ModalAddTransport.defaultProps = {
  transport: null,
  editOrCreate: 'create',
};

export default ModalAddTransport;
