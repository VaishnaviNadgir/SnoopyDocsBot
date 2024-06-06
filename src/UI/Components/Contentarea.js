import React, { useState } from 'react';
import './Contentarea.css';
import ToggleMode from './Togglemode';
import LoginModal from './LoginModal';

const Contentarea = ({ darkMode, toggleTheme }) => {
    const [showLoginModal, setShowLoginModal] = useState(false);
    const [showSignup, setSignup] = useState(false); // State to manage signup mode

    const handleLoginModal = () => {
        setShowLoginModal(true);
        setSignup(false); // Set to login mode by default when showing modal
    };

    const handleSignupModal = () => {
        setShowLoginModal(true);
        setSignup(true); // Set to signup mode when showing modal
    };

    const handleClose = () => {
        setShowLoginModal(false);
    };

    return (
        <div className="content-area">
            <div className="content-box">
                <h1>Welcome to SnoopyDocs!</h1>
                <h4>Get started by uploading documents and chat get started.</h4>
                <div className="buttons">
                    <button onClick={handleLoginModal}>LOG IN</button>
                    <button onClick={handleSignupModal}>SIGN UP</button> {/* Call handleSignupModal on button click */}
                </div>
                {/* <ToggleMode darkMode={darkMode} toggleTheme={toggleTheme} /> */}
            </div>
            {showLoginModal && (
                <div className="form-container">
                    <LoginModal handleClose={handleClose} showSignup={showSignup} /> {/* Pass isRegistering state to LoginModal */}
                </div>
            )}
        </div>
    );
}

export default Contentarea;
