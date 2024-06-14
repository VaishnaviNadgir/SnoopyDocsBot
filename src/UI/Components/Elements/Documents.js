// Documents.js
import React from 'react';

const Documents = ({ uploadedFiles }) => {
  return (
    <div>
      <h2>Uploaded Documents</h2>
      <ul>
        {uploadedFiles.map((file, index) => (
          <li key={index}>
            <a href={file.url} target="_blank" rel="noopener noreferrer">{file.name}</a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Documents;
