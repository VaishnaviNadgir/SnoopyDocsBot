// import React, { useState, useEffect, useRef } from 'react';
// import { useNavigate } from 'react-router-dom';
// import '../Elements/Navbar.css'; 
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faUser, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';

// const Navbar = () => {
//     const [dropdownOpen, setDropdownOpen] = useState(false);
//     const navigate = useNavigate();
//     const dropdownRef = useRef(null); // To track the dropdown element

//     const handleToggleDropdown = () => {
//         setDropdownOpen(prevState => !prevState);
//     };

//         const handleNavigateToLoginModal = () => {
//         navigate('/LoginModal');
//         setDropdownOpen(false); // Close dropdown on navigation
//     };

//     const handleNavigateToDashboard = (role) => {
//         if (role === 'admin') {
//             navigate('/admin-login');
//         } else if (role === 'user') {
//             navigate('/user-login');
//         }
//         setDropdownOpen(false);
//     };

//     const handleLogout = () => {
//         setDropdownOpen(false); // Close dropdown on logout
//     };

//     // Close dropdown if clicked outside of it
//     useEffect(() => {
//         const handleClickOutside = (event) => {
//             if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
//                 setDropdownOpen(false);
//             }
//         };
//         document.addEventListener('mousedown', handleClickOutside);
        
//         return () => {
//             document.removeEventListener('mousedown', handleClickOutside);
//         };
//     }, []);

//     return (
//         <nav className="navbar">
//             <div className="navbar-left">
//             </div>
//             <div className="navbar-right">
//                 <div className="navbar-profile" onClick={handleToggleDropdown} ref={dropdownRef}>
//                     <div className="profile-icon-container">
//                         <FontAwesomeIcon icon={faUser} className="profile-icon" />
//                     </div>
//                     <div className={`dropdown-menu ${dropdownOpen ? 'show' : ''}`}>
//                         <ul>
//                             <li className="profile-item"> Profile </li>
//                                     <li className = "admin-profile" onClick={() => handleNavigateToDashboard('admin')}>Admin</li>
//                                     <li className = "user-profile" onClick={() => handleNavigateToDashboard('user')}>User</li>
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


// src/UI/Components/Elements/Navbar.js
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux'; // Import useDispatch
import { clearRole } from '../../Redux/UserSlice'; // Import clearRole action
import '../Elements/Navbar.css'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';

const Navbar = () => {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch(); // Initialize useDispatch
    const dropdownRef = useRef(null);

    const role = useSelector((state) => state.user.role);

    const handleToggleDropdown = () => {
        setDropdownOpen(prevState => !prevState);
    };

    const handleNavigateToDashboard = (role) => {
        if (role === 'admin') {
            navigate('/admin-login');
        } else if (role === 'user') {
            navigate('/user-login');
        }
        setDropdownOpen(false);
    };

    const handleLogout = () => {
        dispatch(clearRole()); // Clear the role in Redux store on logout
        setDropdownOpen(false);
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setDropdownOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <nav className="navbar">
            <div className="navbar-left">
            </div>
            <div className="navbar-right">
            {role && <span className="profile-role">Hello {role.charAt(0).toUpperCase() + role.slice(1)}</span>}
            <div className="navbar-profile" onClick={handleToggleDropdown} ref={dropdownRef}>
                    <div className="profile-icon-container">
                        <FontAwesomeIcon icon={faUser} className="profile-icon" />
                    </div>
                    <div className={`dropdown-menu ${dropdownOpen ? 'show' : ''}`}>
                        <ul>
                            <li className="profile-item">Profile</li>
                            <li className="admin-profile" onClick={() => handleNavigateToDashboard('admin')}>Admin</li>
                            <li className="user-profile" onClick={() => handleNavigateToDashboard('user')}>User</li>
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
