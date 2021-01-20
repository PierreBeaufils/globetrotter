import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import PropTypes from 'prop-types';

import './createTravelForm.scss';
import axios from 'axios';
import { baseURL } from 'src/config';
import { timestampToISO } from 'src/selectors/dates';

const TravelForm = ({
  travel, ownerId, editOrCreate,
}) => {
  const setTitle = () => {
    if (editOrCreate === 'edit') {
      return <h2>Modifier un voyage</h2>;
    }
    return <h2>Créer un voyage</h2>;
  };

  const initialValues = () => {
    if (editOrCreate === 'edit') {
      return {
        owner: ownerId,
        title: travel.title,
        destination: travel.destination,
        departure_date: timestampToISO(travel.departure_date),
        return_date: timestampToISO(travel.return_date),
      };
    }
    return {
      owner: ownerId,
      departure_date: timestampToISO(),
      return_date: timestampToISO(),
    };
  };

  const {
    register, handleSubmit, errors,
  } = useForm({ defaultValues: initialValues() });

  const [startDate, setStartDate] = useState('');
  const [redirection, setRedirection] = useState(false);
  const [redirectionUrl, setRedirectionUrl] = useState('');

  const onSubmit = (data) => {
    if (editOrCreate === 'create') {
      axios.post(`${baseURL}/create-travel`, data)
        .then(() => {
          setRedirectionUrl('/tableau-de-bord');
          setRedirection(true);
        });
    }
    else {
      axios.patch(`${baseURL}/travel/${travel.id}`, data)
        .then(() => {
          setRedirectionUrl(`/voyage/${travel.id}`);
          setRedirection(true);
        });
    }
  };

  if (redirection) {
    return <Redirect to={redirectionUrl} />;
  }
  return (
    <div className="travel__create-form">
      <div className="main-form">
        {setTitle()}
        <form onSubmit={handleSubmit(onSubmit)}>
          <input name="owner" type="hidden" id="owner" ref={register} />
          <label htmlFor="title">
            <span>Titre du voyage</span>
            <span className="required-asterisk">*</span>
            <input name="title" type="text" id="title" ref={register({ required: true })} />
            {errors.title && <span className="warning-text">Veuillez saisir un titre</span>}
          </label>

          <label htmlFor="destination">
            <span>Destination</span>
            <span className="required-asterisk">*</span>
            <input name="destination" id="destination" type="text" ref={register} />
            {errors.destination && <span className="warning-text">Veuillez saisir une destination</span>}
          </label>

          <label htmlFor="departure_date">
            <span>Date de début</span>
            <input
              name="departure_date"
              ref={register}
              type="date"
              onChange={(e) => setStartDate(e.target.value)}
            />
          </label>

          <label htmlFor="return_date">Date de fin
            <input
              name="return_date"
              ref={register}
              type="date"
              min={startDate}
            />
            {errors.return_date
              && <span className="warning-text">Veuillez saisir une date de retour postérieure à la date de départ</span>}
          </label>

          <input type="submit" />
        </form>
      </div>
    </div>
  );
};

TravelForm.defaultProps = {
  travel: null,
  editOrCreate: 'create',
};

TravelForm.propTypes = {
  ownerId: PropTypes.number.isRequired,
  editOrCreate: PropTypes.string,
  travel: PropTypes.object,
};

export default TravelForm;
