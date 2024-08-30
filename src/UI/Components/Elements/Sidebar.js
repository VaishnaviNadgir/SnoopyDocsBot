import React, {useState} from 'react';
import '../Elements/Sidebar.css'; // Import CSS for styling
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComments, faProjectDiagram, faFileAlt, faUsers, faHistory, faMoon, faSun, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import logo from '../../Assets/Logo.jpg';
import Fileupload from '../UploadFiles/Fileupload'; // Import the Fileupload component

const Sidebar = () => {
    const navigate = useNavigate();
    const [showFileupload, setShowFileupload] = useState(false); // State to control modal visibility

    const handleNavigate = (path) => {
        navigate(path);
    };

    const handleDocumentsClick = () => {
        setShowFileupload(true); // Show the Fileupload modal
    };

    const handleCloseFileupload = () => {
        setShowFileupload(false); // Hide the Fileupload modal
    };

    const handleNewChat = () => {
        const event = new Event('newChat');
        window.dispatchEvent(event);
        handleNavigate('/new chat');
    };

    const handleLogoClick = () => {
        handleNavigate('/dashboard');
    };

    // const handleLogout = () => {
    //     // Add your logout logic here
    //     window.alert("Logged out successfully!");
    //     handleNavigate('/dashboard');
    //   };

    return (
        <div className="sidebar">
            <img src={logo} alt="Logo" className="sidebar-logo" onClick={handleLogoClick} /> {/* Add the logo */}
            <ul>
                <li onClick={handleNewChat}>
                    <FontAwesomeIcon icon={faComments} className="sidebar-icon" />
                    <span>New Chat</span>
                </li>
                <li onClick={handleDocumentsClick}>
                    <FontAwesomeIcon icon={faFileAlt} className="sidebar-icon" />
                    <span>Documents</span>
                </li>
                {/* <li>
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
                </li> */}
                <li>
                    <FontAwesomeIcon icon={faHistory} className="sidebar-icon" />
                    <span>Chat History</span>
                </li>
            </ul>
            {/* <div className="sidebar-footer" onClick={handleLogout}>
                <FontAwesomeIcon icon={faSignOutAlt} className="sidebar-icon" />
                <span> Logout</span>
            </div> */}
                        <Fileupload show={showFileupload} handleClose={handleCloseFileupload} />
        </div>
    );
};

export default Sidebar;
