// src/ThemeContext.js
import React, { createContext, useContext, useEffect, useState } from 'react';

// Create Theme Context
const ThemeContext = createContext();

// Custom hook to use the ThemeContext
export const useTheme = () => {
    return useContext(ThemeContext);
};

// Theme Provider component
export const ThemeProvider = ({ children }) => {
    // Retrieve the theme preference from localStorage or default to false (light mode)
    const [isDarkMode, setIsDarkMode] = useState(() => {
        const savedTheme = localStorage.getItem('isDarkMode');
        return savedTheme ? JSON.parse(savedTheme) : false; // Default is light mode
    });

    const toggleTheme = () => {
        setIsDarkMode((prev) => !prev);
    };

    // Effect to update localStorage whenever the theme changes
    useEffect(() => {
        localStorage.setItem('isDarkMode', JSON.stringify(isDarkMode));
    }, [isDarkMode]);

    return (
        <ThemeContext.Provider value={{ isDarkMode, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};
