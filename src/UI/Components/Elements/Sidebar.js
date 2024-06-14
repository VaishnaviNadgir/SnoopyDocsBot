import React from 'react';
import '../Elements/Sidebar.css'; // Import CSS for styling
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComments, faProjectDiagram, faFileAlt, faUsers, faHistory, faMoon, faSun } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import logo from '../../Assets/Logo.jpg';


const Sidebar = () => {
    const navigate = useNavigate();

    const handleNavigate = (path) => {
        navigate(path);
    };

    const handleDocuments =() => {
        handleNavigate('/documents');
    }

    const handleNewChat = () => {
        const event = new Event('newChat');
        window.dispatchEvent(event);
        handleNavigate('/new chat');
    };

    const handleLogoClick = () => {
        handleNavigate('/dashboard');
    };

    return (
        <div className="sidebar">
            <img src={logo} alt="Logo" className="sidebar-logo" onClick={handleLogoClick}/> {/* Add the logo */}
            <ul>
                <li onClick={handleNewChat}>
                    <FontAwesomeIcon icon={faComments} className="sidebar-icon" /> 
                    <span>New Chat</span>
                </li>
                <li>
                    <FontAwesomeIcon icon={faProjectDiagram} className="sidebar-icon" /> 
                    <span>Projects</span>
                </li>
                <li onClick={handleDocuments}>
                    <FontAwesomeIcon icon={faFileAlt} className="sidebar-icon" />
                    <span>Documents</span>
                </li>
                <li>
                    <FontAwesomeIcon icon={faUsers} className="sidebar-icon" /> 
                    <span>Community</span>
                </li>
                <li>
                    <FontAwesomeIcon icon={faHistory} className="sidebar-icon" />
                    <span>Chat History</span>
                </li>
            </ul>
        </div>
    );
};

export default Sidebar;
