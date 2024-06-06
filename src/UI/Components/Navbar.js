import React from 'react';
import './Navbar.css'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import ToggleMode from './Togglemode';


const Navbar = ({ darkMode, toggleTheme }) => {
    return (
        <nav className="navbar">
            <div className="navbar-left">
            </div>
            <div className="navbar-right">
                <div className="navbar-profile">
                    {/* <div className="profile-icon-container">
                        <FontAwesomeIcon icon={faUser} className="profile-icon" />
                    </div> */}
                </div>
                {/* <ToggleMode darkMode={darkMode} toggleTheme={toggleTheme} /> */}
            </div>
        </nav>
    );
}

export default Navbar;
