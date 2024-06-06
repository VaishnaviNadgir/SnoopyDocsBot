import React, { useState, useEffect } from 'react';
import './Sidebar.css'; // Import CSS for styling
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComments, faProjectDiagram, faFileAlt, faUsers, faHistory, faMoon, faSun } from '@fortawesome/free-solid-svg-icons';
import logo from '../Assets/Logo.jpg';
import ToggleMode from './Togglemode';


const Sidebar = ({ darkMode, toggleTheme }) => {
    return (
        <div className="sidebar">
            <img src={logo} alt="Logo" className="sidebar-logo" /> {/* Add the logo */}
            <ul>
                <li>
                    <FontAwesomeIcon icon={faComments} className="sidebar-icon" /> 
                    <span>New Chat</span>
                </li>
                <li>
                    <FontAwesomeIcon icon={faProjectDiagram} className="sidebar-icon" /> 
                    <span>Projects</span>
                </li>
                <li>
                    <FontAwesomeIcon icon={faFileAlt} className="sidebar-icon" />
                    <span>Documents</span>
                </li>
                <li>
                    <FontAwesomeIcon icon={faUsers} className="sidebar-icon" /> 
                    <span>Community</span>
                </li>
                <li>
                    <FontAwesomeIcon icon={faHistory} className="sidebar-icon" />
                    <span>History</span>
                </li>
            </ul>
            {/* <ToggleMode darkMode={darkMode} toggleTheme={toggleTheme} /> */}
        </div>
    );
}

export default Sidebar;
