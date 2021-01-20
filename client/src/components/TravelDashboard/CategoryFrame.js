import React from 'react';
import PropTypes from 'prop-types';
import { PlusCircle } from 'react-feather';
import CardAccommodation from './CardAccommodation';
import CardTransport from './CardTransport';
import CardActivity from './CardActivity';
import './styles.scss';

const CategoryFrame = ({
  category, textButton, handleAddElement, data, setcheckedAccommodations,
  checkedAccommodations, setcheckedTransports, checkedTransports, setcheckedActivities,
  checkedActivities, fetchOneTravel,
}) => {
  const isEditAllowed = true;
  const editMode = true;

  return (
    <div className="category-container">
      <div className="headerWithAddThingMenu">
        <h2>{category}</h2>
        <button
          type="button"
          className="validate--button"
          onClick={(event) => handleAddElement(event)}
          value={category}
        >
          <PlusCircle color="#fff" />
          <p>{textButton}</p>
        </button>
      </div>

      <div className="cards__container">
        {(category === 'Hébergements') ? data.filter((item) => !item.selected).map((accomodation) => (
          <CardAccommodation
            key={accomodation.id}
            {...accomodation}
            editMode={editMode}
            isEditAllowed={isEditAllowed}
            setcheckedAccommodations={setcheckedAccommodations}
            checkedAccommodations={checkedAccommodations}
            fetchOneTravel={fetchOneTravel}
          />
        )) : null}
        {(category === 'Transports') ? data.filter((item) => !item.selected).map((transport) => (
          <CardTransport
            key={transport.id}
            {...transport}
            editMode={editMode}
            isEditAllowed={isEditAllowed}
            setcheckedTransports={setcheckedTransports}
            checkedTransports={checkedTransports}
            fetchOneTravel={fetchOneTravel}
          />
        )) : null}
        {(category === 'Activités') ? data.filter((item) => !item.selected).map((activity) => (
          <CardActivity
            key={activity.id}
            {...activity}
            editMode={editMode}
            isEditAllowed={isEditAllowed}
            setcheckedActivities={setcheckedActivities}
            checkedActivities={checkedActivities}
            fetchOneTravel={fetchOneTravel}
          />
        )) : null}
      </div>
    </div>
  );
};

CategoryFrame.propTypes = {
  category: PropTypes.string.isRequired,
  textButton: PropTypes.string.isRequired,
  handleAddElement: PropTypes.func.isRequired,
  data: PropTypes.array.isRequired,
};

export default CategoryFrame;
