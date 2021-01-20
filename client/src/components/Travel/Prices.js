import React from 'react';
import {
  Map, Home, Compass, CornerDownRight,
} from 'react-feather';
import PropTypes from 'prop-types';

import './travel.scss';

const Prices = ({ prices }) => (
  <div className="card__container prices_card">
    <h2>Coûts prévisionnels</h2>
    <h4><Map color="#2B7AFD" size={15} /> Transports : {prices.transp_total_price || 0} €</h4>
    <h4><Home color="#2B7AFD" size={15} /> Hébergements : {prices.acco_total_price || 0} €</h4>
    <h4><Compass color="#2B7AFD" size={15} /> Activités : {prices.activ_total_price || 0} €</h4>
    <h3><CornerDownRight color="#2B7AFD" size={15} /> Total : {prices.global_price || 0} €</h3>
  </div>
);

Prices.propTypes = {
  prices: PropTypes.shape({
    transp_total_price: PropTypes.number,
    acco_total_price: PropTypes.number,
    activ_total_price: PropTypes.number,
    global_price: PropTypes.number,
  }).isRequired,
};

export default Prices;
