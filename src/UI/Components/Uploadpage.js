import React, { useState } from 'react';
import './Contentarea.css';
import ToggleMode from './Togglemode';

const Uploadpage = ({ darkMode, toggleTheme }) => {
    const [showCreateProject, setShowCreateProject] = useState(false);
    const [showUploadfile, setUploadfile] = useState(false); // State to manage Uploadfile mode

    const handleCreateProject = () => {
        setShowCreateProject(true);
        setUploadfile(false); // Set to CreateProject mode by default when showing modal
    };

    const handleUploadfile = () => {
        setShowCreateProject(true);
        setUploadfile(true); // Set to Uploadfile mode when showing modal
    };

    const handleClose = () => {
        setShowCreateProject(false);
    };

    return (
        <div className="content-area">
            <div className="content-box">
                <h1>Welcome to SnoopyDocs!</h1>
                <h4>Get started by uploading documents and chat get started.</h4>
                <div className="buttons">
                    <button onClick={handleCreateProject}>Create a Project</button>
                    <button onClick={handleUploadfile}>Upload Files</button> {/* Call handleUploadfile on button click */}
                </div>
                {/* <ToggleMode darkMode={darkMode} toggleTheme={toggleTheme} /> */}
            </div>
            {showCreateProject && (
                <div className="form-container">
                    <CreateProject handleClose={handleClose} showUploadfile={showUploadfile} /> {/* Pass UploadFile state to CreateProject */}
                </div>
            )}
        </div>
    );
}

export default Uploadpage;
