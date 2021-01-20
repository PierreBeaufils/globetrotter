import React, { useState } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { baseURL } from 'src/config';
import {
  PlusSquare,
} from 'react-feather';
import DocumentItem from './DocumentItem';

import './travel.scss';

const TravelDocuments = ({ documents, isEditAllowed, travelID }) => {
  const [showFileUpload, setShowFileUpload] = useState(false);
  const [fileToUpload, setFileToUpload] = useState(null);
  const [message, setMessage] = useState(null);

  const uploadFile = (file) => {
    const formData = new FormData();
    formData.append('file', file);
    axios.post(`${baseURL}/travel/${travelID}/document`, formData)
      .then(() => {
        setMessage('fichié uploadé !');
      });
  };

  const onFormSubmit = (event) => {
    event.preventDefault();
    uploadFile(fileToUpload);
  };
  const onChange = (event) => {
    const maxAllowedSize = 10 * 1024 * 1024; // For 10MB
    if (event.target.files[0].size > maxAllowedSize) {
      setMessage('La taille du fichier est supérieure à 10MB');
    }
    else {
      setFileToUpload(event.target.files[0]);
      setMessage(null);
    }
  };

  return (
    <div className="documents frame card__container prices_card">
      <h2>Documents</h2>
      {message && (
        <div className="upload-message">{message}</div>
      )}
      {(isEditAllowed && !showFileUpload) ? (
        <div
          className="validate--button add-documents"
          onClick={() => {
            setShowFileUpload(true);
          }}
        >
          <PlusSquare color="#fff" />
          <p>Ajouter</p>

        </div>
      ) : null}
      {(showFileUpload) ? (
        <form onSubmit={onFormSubmit}>
          <label htmlFor="file" className="label-file validate--button">
            Choisir un fichier
            <input type="file" name="file" id="file" className="input-file" onChange={onChange} />
          </label>
          {fileToUpload ? (<button type="submit" className="validate--button">Uploader {fileToUpload.name}</button>) : null}

        </form>
      ) : null}

      <ul>
        {documents.length > 0 ? (
          documents.map((document) => (
            <DocumentItem
              key={document.Key}
              {...document}
            />
          ))
        ) : <p>Aucun document</p>}
      </ul>
    </div>
  );
};

TravelDocuments.propTypes = {
  documents: PropTypes.array.isRequired,
  isEditAllowed: PropTypes.bool.isRequired,
  travelID: PropTypes.number.isRequired,
};

export default TravelDocuments;
