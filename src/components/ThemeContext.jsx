// src/ThemeContext.js
import React, { createContext, useContext, useState } from 'react';

// Create Theme Context
const ThemeContext = createContext();

// Custom hook to use the ThemeContext
export const useTheme = () => {
    return useContext(ThemeContext);
};

// Theme Provider component
export const ThemeProvider = ({ children }) => {
    const [isDarkMode, setIsDarkMode] = useState(false); // Default is light mode

    const toggleTheme = () => {
        setIsDarkMode((prev) => !prev);
    };

    return (
        <ThemeContext.Provider value={{ isDarkMode, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};
