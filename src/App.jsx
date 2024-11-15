import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import SignIn from './components/SignIn/signin';
import Header from './components/MainContent/Header';

const demoTheme = {
  colors: {
    primary: '#007bff',
    secondary: '#6c757d',
    success: '#28a745',
    danger: '#dc3545',
    warning: '#ffc107',
    info: '#17a2b8',
    light: '#f8f9fa',
    dark: '#343a40',
    background: '#ffffff',
    text: '#212529',
  },
  spacing: (factor) => `${0.25 * factor}rem`,
};

const App = () => {
  const [isSignedIn, setIsSignedIn] = useState(() => {
    const storedSignInStatus = localStorage.getItem('isSignedIn');
    return storedSignInStatus === 'true'; // Check if the value in localStorage is 'true'
  });

  const [username, setUsername] = useState(localStorage.getItem('username') || '');

  useEffect(() => {
    // Whenever the `isSignedIn` state changes, update localStorage
    localStorage.setItem('isSignedIn', isSignedIn ? 'true' : 'false');
    if (isSignedIn && username) {
      localStorage.setItem('username', username); // Save username if signed in
    }
  }, [isSignedIn, username]);

  const handleSignIn = (username) => {
    setIsSignedIn(true);
    setUsername(username); 
  };

  const handleSignOut = () => {
    setIsSignedIn(false);
    setUsername(''); 
    localStorage.removeItem('username');
    localStorage.removeItem('token');
  };

  return (
    <ThemeProvider theme={demoTheme}>
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              isSignedIn ? (
                <Header username={username} onLogout={handleSignOut} />
              ) : (
                <SignIn onSignIn={handleSignIn} />
              )
            }
          />
          {/* Redirect to home if not found */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
};

export default App;
