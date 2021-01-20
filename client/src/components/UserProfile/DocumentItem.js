import React from 'react';
import PropTypes from 'prop-types';

import './styles.scss';

const DocumentItem = ({ name, date, url }) => {
  const timestampInDate = new Date(date); // creation d'une instance date
  const DateInLocalString = timestampInDate.toLocaleString(); // date convertie en string

  return (
    <li className="">
      <a href={url}>{name}</a> <span className="document__item_updateDate">Mis à jour le {DateInLocalString}</span>
    </li>
  );
};

DocumentItem.propTypes = {
  name: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
};

export default DocumentItem;
