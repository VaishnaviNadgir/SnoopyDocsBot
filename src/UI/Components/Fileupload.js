import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes, faEye, faTrash, faArrowLeft, faArrowRight, faFileUpload, faCircleCheck, faCircleMinus } from "@fortawesome/free-solid-svg-icons";
import './Fileupload.css';

const Fileupload = ({ handleClose }) => {
  const [files, setFiles] = useState([]);
  const [error, setError] = useState('');
  const [fileCount, setFileCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const filesPerPage = 10;
  const [filesInFirstPage, setFilesInFirstPage] = useState(false);

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    const allowedExtensions = ['pdf', 'docx', 'txt', 'xlsx'];

    const invalidFiles = selectedFiles.filter(file => {
      const fileExtension = file.name.split('.').pop().toLowerCase();
      return !allowedExtensions.includes(fileExtension);
    });

    if (invalidFiles.length === 0) {
      const newFiles = selectedFiles.map(file => ({ file, status: 'Ready to upload' }));
      setFiles(prevFiles => [...prevFiles, ...newFiles]);
      setFileCount(prevCount => prevCount + newFiles.length);
      setError('');
    } else {
      setError('Please upload valid files.');
    }
  };

  const handleRemoveFile = (index) => {
    const updatedFiles = [...files];
    updatedFiles.splice(index, 1);
    setFiles(updatedFiles);
    setFileCount(prevCount => prevCount - 1);
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
      // Change status to 'Uploaded successfully'
      const updatedFiles = files.map(file =>
        file.status === 'Ready to upload'
          ? { ...file, status: 'Uploaded successfully' }
          : file
      );
      setFiles(updatedFiles);
    } else {
      setError('No files selected or invalid file types');
    }
  };

  const totalPages = Math.ceil(files.length / filesPerPage);
  const displayedFiles = files.slice((currentPage - 1) * filesPerPage, currentPage * filesPerPage);

  const checkFilesInFirstPage = () => {
    const filesInFirstPage = files.slice(0, filesPerPage);
    return filesInFirstPage.length > 0;
  };

  useEffect(() => {
    setFilesInFirstPage(checkFilesInFirstPage());
  }, [currentPage, files]);

  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(1);
    }
  }, [files]);

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
          {filesInFirstPage && displayedFiles.length > 0}
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
                {displayedFiles.map((fileObj, index) => (
                  <div key={index} className="file-card">
                    <p>{fileObj.file ? fileObj.file.name : ''}</p>
                    <div className="file-status">
                      <span className="status">{fileObj.status}</span>
                      {fileObj.status === 'Ready to upload' && (
                        <FontAwesomeIcon icon={faCircleMinus} className="pending-icon" />
                      )}
                      {fileObj.status === 'Uploaded successfully' && (
                        <FontAwesomeIcon icon={faCircleCheck} className="success-icon" />
                      )}
                    </div>
                    <div className="file-icons">
                      <FontAwesomeIcon icon={faEye} className="view-icon" title="View" onClick={() => handleViewFile(fileObj.file)} />
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
              <button type="submit" className='submit-button' onClick={handleSubmit}>Upload</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Fileupload;
