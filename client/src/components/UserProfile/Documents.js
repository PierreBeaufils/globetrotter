import React from 'react';
import PropTypes from 'prop-types';
import DocumentItem from './DocumentItem';

import './styles.scss';

const Documents = ({ documents }) => (
  <div className="documents frame">
    <h2>Vos documents</h2>
    <div>Ajouter un document</div>
    <ul>
      {documents.map((document) => ( // voir pour gestion de message si 0 document
        <DocumentItem
          key={document.id}
          {...document}
        />
      ))}
    </ul>
  </div>
);

Documents.propTypes = {
  documents: PropTypes.object.isRequired,
};

export default Documents;
