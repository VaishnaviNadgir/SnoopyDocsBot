import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../Elements/Navbar.css'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';

const Navbar = () => {
    const navigate = useNavigate();
    const [showDropdown, setShowDropdown] = useState(false);

    const handleNavigateToLoginModal = () => {
        navigate('/LoginModal');
    };

    const handleToggleDropdown = () => {
        setShowDropdown(!showDropdown);
    };

    const handleSignup = () => {
        navigate('/LoginModal');
        setShowDropdown(false); // Close the dropdown after navigation
    };

    const handleLogout = () => {
        setShowDropdown(false); // Close the dropdown after logout
    };

    return (
        <nav className="navbar">
            <div className="navbar-left">
            </div>
            <div className="navbar-right">
                <div className="navbar-profile" onClick={handleToggleDropdown}>
                    <div className="profile-icon-container">
                        <FontAwesomeIcon icon={faUser} className="profile-icon" />
                        {showDropdown && (
                            <div className="dropdown-menu">
                                <ul>
                                    <li onClick={handleSignup}>Register</li>
                                    <li onClick={handleLogout}>
                                        <FontAwesomeIcon icon={faSignOutAlt} className="logout-icon" />
                                        Log Out
                                    </li>
                                </ul>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
