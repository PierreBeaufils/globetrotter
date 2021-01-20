import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { baseURL } from 'src/config';

import './invitetraveler.scss';

const InviteTraveler = ({
  token,
}) => {
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');

  const sendToken = () => {
    axios.post(`${baseURL}/travel/add/traveler/${token}`)
      .then((res) => {
        setMessage(res.data);
        setLoading(false);
      })
      .catch(() => {
        setMessage('Veuillez d\'abord vous inscrire');
        setLoading(false);
      });
  };

  useEffect(() => {
    sendToken();
  }, []);

  return (
    <div className="add-traveler-validation">
      {!loading && (
        <div className="add-traveler-validation-message">{message}</div>
      )}
    </div>
  );
};

InviteTraveler.propTypes = {
  token: PropTypes.string.isRequired,

};

export default InviteTraveler;
