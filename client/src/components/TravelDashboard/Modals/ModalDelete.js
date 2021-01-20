import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import axios from 'axios';

import { AlertTriangle, XSquare, Trash2 } from 'react-feather';
import '../styles.scss';
import { baseURL } from 'src/config';

const ModalDelete = ({
  isShowing, hide, travelId, category, elementName, elementId, fetchOneTravel,
}) => {
  const displayMessage = () => {
    if (category === 'accommodation') {
      return 'Voulez-vous confirmer la suppression de l\'hébergement:';
    } if (category === 'transport') {
      return 'Voulez-vous confirmer la suppression du transport:';
    } if (category === 'activity') {
      return 'Voulez-vous confirmer la suppression de l\'activité:';
    }
    return '';
  };

  const deleteTravelElement = () => {
    axios.delete(`${baseURL}/travel/${travelId}/${category}/${elementId}`)
      .then(() => {
        hide();
        fetchOneTravel(travelId);
      });
  };

  return (isShowing ? ReactDOM.createPortal(
    <>
      <div className="modal-overlay" />
      <div className="modal-wrapper" aria-modal aria-hidden tabIndex={-1} role="dialog">
        <div className="modal">
          <div className="modal-header">

            <button type="button" className="modal-close-button" data-dismiss="modal" aria-label="Close" onClick={hide}>
              <span aria-hidden="true">
                <XSquare color="#FF7A32" />
              </span>
            </button>
          </div>

          <div className="modal_content">
            <AlertTriangle
              color="#FF7A32"
              width="48"
              height="48"
            />
            <div className="modal_content-main">
              <h3>{displayMessage()} {elementName} ?</h3>
            </div>

            <div className="modal_buttons_container">
              <div className="create--button" onClick={deleteTravelElement}>
                <Trash2 color="#FF7A32" />
                <p>Supprimer</p>
              </div>
              <div className="create--button" onClick={hide}>
                <XSquare color="#fff" />
                <p>Annuler</p>
              </div>
            </div>

          </div>
        </div>
      </div>
    </>, document.body,
  ) : null);
};

ModalDelete.defaultProps = {
  travelId: null,
  category: null,
  elementName: null,
  elementId: null,
};

ModalDelete.propTypes = {
  isShowing: PropTypes.bool.isRequired,
  hide: PropTypes.func.isRequired,
  travelId: PropTypes.number,
  category: PropTypes.string,
  elementName: PropTypes.string,
  elementId: PropTypes.number,
};

export default ModalDelete;
