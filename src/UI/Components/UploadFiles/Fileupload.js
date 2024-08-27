import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faTrash, faArrowLeft, faArrowRight, faFileUpload, faCircleCheck, faCircleMinus } from "@fortawesome/free-solid-svg-icons";
import { Modal } from 'react-bootstrap';
import '../UploadFiles/Fileupload.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const Fileupload = ({ show, handleClose }) => {
  const [files, setFiles] = useState([]);
  const [error, setError] = useState('');
  const [fileCount, setFileCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const filesPerPage = 6;
  const [filesInFirstPage, setFilesInFirstPage] = useState(false);
  const [filterName, setFilterName] = useState('');
  const [filterType, setFilterType] = useState('');
  const [filterKeyword, setFilterKeyword] = useState('');
  const [activeFilterName, setActiveFilterName] = useState('');
  const [activeFilterType, setActiveFilterType] = useState('');
  const [activeFilterKeyword, setActiveFilterKeyword] = useState('');

  const allowedExtensions = ['pdf', 'docx', 'txt', 'xlsx'];

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
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
    if (filteredFiles.length > 0) {
      console.log('Files uploaded:', filteredFiles);

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

  const handleApplyFilter = () => {
    setActiveFilterName(filterName);
    setActiveFilterType(filterType);
    setActiveFilterKeyword(filterKeyword);
    setCurrentPage(1);
  };

  const filteredFiles = files
    .filter(fileObj => {
      const fileName = fileObj.file.name.toLowerCase();
      return activeFilterName === '' || fileName.includes(activeFilterName.toLowerCase());
    })
    .filter(fileObj => {
      const fileExtension = fileObj.file.name.split('.').pop().toLowerCase();
      return activeFilterType === '' || fileExtension.startsWith(activeFilterType.toLowerCase());
    })
    .filter(fileObj => {
      // Add any other filtering conditions here, e.g., for keyword
      return true;
    });

  const handleClearFilters = () => {
    setFilterName('');
    setFilterType('');
    setFilterKeyword('');
    setActiveFilterName('');
    setActiveFilterType('');
    setActiveFilterKeyword('');
  };

  const displayedFiles = filteredFiles.slice((currentPage - 1) * filesPerPage, currentPage * filesPerPage);

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Body>
        <div className="square-container">
          <div className="curved-container">
            <form onSubmit={handleSubmit}>
              <div className="upload-header">
                <FontAwesomeIcon icon={faFileUpload} className="upload-icon" />
                <h2>Upload Files!</h2>
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
                  {filteredFiles.length > filesPerPage && (
                    <div className="pagination">
                      <button
                        onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                        disabled={currentPage === 1}
                        className="left-button"
                      >
                        <FontAwesomeIcon icon={faArrowLeft} />
                      </button>
                      <span>Page {currentPage} of {Math.ceil(filteredFiles.length / filesPerPage)}</span>
                      <button
                        onClick={() => setCurrentPage(prev => Math.min(prev + 1, Math.ceil(filteredFiles.length / filesPerPage)))}
                        disabled={currentPage === Math.ceil(filteredFiles.length / filesPerPage)}
                        className="right-button"
                      >
                        <FontAwesomeIcon icon={faArrowRight} />
                      </button>
                    </div>
                  )}

                </div>
              )}
              <div className="filter-container">
                <div className="filter-item" >
                  <span className='title'>Name</span>
                  <input className='square-text' type="text" value={filterName} onChange={(e) => setFilterName(e.target.value)} />
                </div>
                <div className="filter-item">
                  <span className='title'>Type</span>
                  <input className='square-text' type="text" value={filterType} onChange={(e) => setFilterType(e.target.value)} />
                </div>
                <div className="filter-item">
                  <span className='title'>Keyword</span>
                  <input className='square-text' type="text" value={filterKeyword} onChange={(e) => setFilterKeyword(e.target.value)} />
                </div>
                <button className="filter-button" onClick={handleApplyFilter}>
                  <span className='text' >Apply Filters</span>
                </button>
                <button className="clear-button" onClick={handleClearFilters}>
                  <span className='text'>Clear Filters</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <button className='close-button' onClick={handleClose}>Close</button>
        <button type="submit" className='upload-button' onClick={handleSubmit}>Upload</button>
      </Modal.Footer>
    </Modal>
  );
};

export default Fileupload;