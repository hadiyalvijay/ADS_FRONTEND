import React, { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  // Safely get the stored theme or default to false (light mode)
  let initialTheme = false; // default to light mode
  try {
    const storedTheme = localStorage.getItem('isDarkMode');
    if (storedTheme !== null) {
      initialTheme = JSON.parse(storedTheme); // safely parse only if not null
    }
  } catch (error) {
    console.error("Error reading theme from localStorage", error);
  }

  const [isDarkMode, setIsDarkMode] = useState(initialTheme);

  const toggleTheme = () => {
    setIsDarkMode((prevMode) => {
      const newMode = !prevMode;
      // Store the new theme preference in localStorage
      try {
        localStorage.setItem('isDarkMode', JSON.stringify(newMode));
      } catch (error) {
        console.error("Error saving theme to localStorage", error);
      }
      return newMode;
    });
  };

  // Synchronize the theme state with localStorage when it changes
  useEffect(() => {
    try {
      localStorage.setItem('isDarkMode', JSON.stringify(isDarkMode));
    } catch (error) {
      console.error("Error saving theme to localStorage", error);
    }
  }, [isDarkMode]);

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
