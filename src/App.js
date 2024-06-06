import React, { useState } from 'react';
import Sidebar from './UI/Components/Sidebar';
import Navbar from './UI/Components/Navbar';
import './App.css'; // Import CSS for styling
import Contentarea from './UI/Components/Contentarea';

const App = () => {
    const [darkMode, setDarkMode] = useState(false);

    const toggleTheme = () => {
        setDarkMode(!darkMode);
    };

    return (
        <div className={`app ${darkMode ? 'dark-mode' : 'light-mode'}`}>
            <Sidebar darkMode={darkMode} toggleTheme={toggleTheme} />
            <Navbar darkMode={darkMode} toggleTheme={toggleTheme} />
            <Contentarea darkMode={darkMode} toggleTheme={toggleTheme} />
            {/* Main content goes here */}
        </div>
    );
}

export default App;
