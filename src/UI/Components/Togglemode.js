import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMoon, faSun } from '@fortawesome/free-solid-svg-icons';
import './Togglemode.css'; // Import CSS for styling

const Togglemode = ({ darkMode, toggleTheme }) => {
    useEffect(() => {
        const body = document.body;
        if (darkMode) {
            body.classList.add('dark-mode');
            body.classList.remove('light-mode');
        } else {
            body.classList.add('light-mode');
            body.classList.remove('dark-mode');
        }
    }, [darkMode]);

    return (
        <div className="sidebar-footer">
            <button className="theme-switch" onClick={toggleTheme}>
                <FontAwesomeIcon icon={darkMode ? faSun : faMoon} />
                <span>{darkMode ? 'Light Mode' : 'Dark Mode'}</span>
            </button>
        </div>
    );
}

export default Togglemode;



// import React from 'react';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faSun, faMoon } from '@fortawesome/free-solid-svg-icons';
// import './Togglemode.css';

// const Togglemode = ({ darkMode, toggleTheme }) => {
//   return (
//     <div className="toggle-mode" onClick={toggleTheme}>
//       <div className={`toggle-container ${darkMode ? 'dark' : 'light'}`}>
//         <div className={`toggle-switch ${darkMode ? 'switch-dark' : 'switch-light'}`}>
//           {darkMode ? (
//             <FontAwesomeIcon icon={faMoon} className="icon" /> 
//           ) : (
//             <FontAwesomeIcon icon={faSun} className="icon" />
//           )}
//         </div>
//         <span className="label">{darkMode ? 'Dark' : 'Light'}</span>
//       </div>
//     </div>
//   );
// };

// export default Togglemode;

