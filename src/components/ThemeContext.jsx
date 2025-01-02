import React, { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
 
  let initialTheme = false; 
  try {
    const storedTheme = localStorage.getItem('isDarkMode');
    if (storedTheme !== null) {
      initialTheme = JSON.parse(storedTheme); 
    }
  } catch (error) {
    console.error("Error reading theme from localStorage", error);
  }

  const [isDarkMode, setIsDarkMode] = useState(initialTheme);

  const toggleTheme = () => {
    setIsDarkMode((prevMode) => {
      const newMode = !prevMode;
      
      try {
        localStorage.setItem('isDarkMode', JSON.stringify(newMode));
      } catch (error) {
        console.error("Error saving theme to localStorage", error);
      }
      return newMode;
    });
  };

 
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
