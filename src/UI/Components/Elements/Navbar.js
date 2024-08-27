// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import '../Elements/Navbar.css'; 
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faUser, faSignOutAlt, faCaretDown } from '@fortawesome/free-solid-svg-icons';

// const Navbar = () => {
//     const [dropdownOpen, setDropdownOpen] = useState(false);
//     const navigate = useNavigate();

//     const handleToggleDropdown = () => {
//         setDropdownOpen(prevState => !prevState);
//     };

//     const handleNavigateToLoginModal = () => {
//         navigate('/LoginModal');
//         setDropdownOpen(false); // Close dropdown on navigation
//     };

//     const handleLogout = () => {
//         // Implement logout functionality here
//         setDropdownOpen(false); // Close dropdown on logout
//     };

//     return (
//         <nav className="navbar">
//             <div className="navbar-left">
//                 {/* Add logo or other elements here */}
//             </div>
//             <div className="navbar-right">
//                 <div className="navbar-profile" onClick={handleToggleDropdown}>
//                     <div className="profile-icon-container">
//                         <FontAwesomeIcon icon={faUser} className="profile-icon" />
//                     </div>
//                     <div className={`dropdown-menu ${dropdownOpen ? 'show' : ''}`}>
//                         <ul>
//                             <li onClick={handleNavigateToLoginModal}>Profile</li>
//                             <li onClick={handleLogout}>
//                                 <FontAwesomeIcon icon={faSignOutAlt} className="logout-icon" />
//                                 Logout
//                             </li>
//                         </ul>
//                     </div>
//                 </div>
//             </div>
//         </nav>
//     );
// };

// export default Navbar;


import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../Elements/Navbar.css'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';

const Navbar = () => {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const navigate = useNavigate();

    const handleToggleDropdown = () => {
        setDropdownOpen(prevState => !prevState);
    };

    const handleNavigateToLoginModal = (role) => {
        navigate('/LoginModal', { state: { role } });
        setDropdownOpen(false); // Close dropdown on navigation
    };

    const handleLogout = () => {
        setDropdownOpen(false); // Close dropdown on logout
    };

    return (
        <nav className="navbar">
            <div className="navbar-left">
            </div>
            <div className="navbar-right">
                <div className="navbar-profile" onClick={handleToggleDropdown}>
                    <div className="profile-icon-container">
                        <FontAwesomeIcon icon={faUser} className="profile-icon" />
                    </div>
                    <div className={`dropdown-menu ${dropdownOpen ? 'show' : ''}`}>
                        <ul>
                            <li className="profile-item">
                                Profile
                                <ul className="sub-menu">
                                    <li onClick={() => handleNavigateToLoginModal('admin')}>Admin</li>
                                    <li onClick={() => handleNavigateToLoginModal('user')}>User</li>
                                </ul>
                            </li>
                            <li onClick={handleLogout}>
                                <FontAwesomeIcon icon={faSignOutAlt} className="logout-icon" />
                                Logout
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
