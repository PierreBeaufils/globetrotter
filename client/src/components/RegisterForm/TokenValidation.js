import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

import './styles.scss';

const TokenValidation = ({
  token, verifyToken, tokenMessage, isTokenVerified,
}) => {
  useEffect(() => {
    verifyToken(token);
  }, []);

  return (
    <div className="register-token-validation">
      {isTokenVerified
        && <p>{tokenMessage}</p>}
    </div>
  );
};

TokenValidation.defaultProps = {
  tokenMessage: null,
};

TokenValidation.propTypes = {
  token: PropTypes.string.isRequired,
  verifyToken: PropTypes.func.isRequired,
  tokenMessage: PropTypes.string,
  isTokenVerified: PropTypes.bool.isRequired,
};

export default TokenValidation;
