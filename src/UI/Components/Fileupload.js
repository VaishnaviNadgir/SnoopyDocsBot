import React, { useState } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes, faEye, faTrash, faArrowLeft, faArrowRight, faFileUpload } from "@fortawesome/free-solid-svg-icons";
import './Fileupload.css';

const Fileupload = ({ handleClose }) => {
  const [files, setFiles] = useState([]);
  const [error, setError] = useState('');
  const [fileCount, setFileCount] = useState(0); // Add state for file count
  const [currentPage, setCurrentPage] = useState(1);
  const filesPerPage = 10;

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    const allowedExtensions = ['pdf', 'docx', 'txt', 'xlsx'];

    const invalidFiles = selectedFiles.filter(file => {
      const fileExtension = file.name.split('.').pop().toLowerCase();
      return !allowedExtensions.includes(fileExtension);
    });

    if (invalidFiles.length === 0) {
      const newFiles = [...files, ...selectedFiles];
      setFiles(newFiles);
      setFileCount(newFiles.length); // Update file count
      setError('');
    } else {
      setError('Please upload valid files.');
    }
  };

  const handleRemoveFile = (index) => {
    const updatedFiles = [...files];
    updatedFiles.splice(index, 1);
    setFiles(updatedFiles);
    setFileCount(updatedFiles.length); // Update file count
  };

  const handleViewFile = (file) => {
    const fileURL = URL.createObjectURL(file);
    window.open(fileURL, '_blank');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (files.length > 0) {
      // Handle file upload logic here
      console.log('Files uploaded:', files);
    } else {
      setError('No files selected or invalid file types');
    }
  };

  const totalPages = Math.ceil(files.length / filesPerPage);
  const displayedFiles = files.slice((currentPage - 1) * filesPerPage, currentPage * filesPerPage);

  return (
    <div className="square-container">
      <FontAwesomeIcon icon={faTimes} className="close-icon" onClick={handleClose} />
      <div className="curved-container">
        <form onSubmit={handleSubmit}>
        <div className="upload-header">
      <h2>Upload Files!</h2>
      <FontAwesomeIcon icon={faFileUpload} className="upload-icon" />
    </div>
          <h6>Files supported: pdf, docx, txt, xlsx</h6>
          <div className="file-input-container">
            <div className="file-input-box">
              <input type="file" onChange={handleFileChange} accept=".pdf, .docx, .txt, .xlsx" multiple />
              <span className="file-count">({fileCount} files selected)</span>
            </div>
          </div>
          {error && <p className="error">{error}</p>}
          <button type="submit">Upload</button>
        </form>
      </div>
      <div className="files-button">
        <button type="button" className="btn btn-info">Files!</button>
      </div>
      <div className='main-container'>
        <div className="uploaded-files">
          {files.length > 0 && displayedFiles.length > 0 && (
            <div>
              <div className={displayedFiles.length > 2 ? 'file-cards grid-layout' : 'file-cards flex-layout'}>
                {displayedFiles.map((file, index) => (
                  <div key={index} className="file-card">
                    <p>{file.name}</p>
                    <div className="file-icons">
                      <FontAwesomeIcon icon={faEye} className="view-icon" title="View" onClick={() => handleViewFile(file)} />
                      <FontAwesomeIcon icon={faTrash} className="delete-icon" title="Delete" onClick={() => handleRemoveFile(index)} />
                    </div>
                  </div>
                ))}
              </div>
              {files.length > filesPerPage && (
                <div className="pagination">
                  <button
                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                    className="left-button"
                  >
                    <FontAwesomeIcon icon={faArrowLeft} />
                  </button>
                  <span>Page {currentPage} of {totalPages}</span>
                  <button
                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
                    className="right-button"
                  >
                    <FontAwesomeIcon icon={faArrowRight} />
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Fileupload;
