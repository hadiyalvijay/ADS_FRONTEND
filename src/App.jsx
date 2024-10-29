// src/App.js
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
// import SignIn from './SignIn/signin'; 
import Header from './components/MainContent/Header'; 
import { ThemeProvider } from 'styled-components';
import SignIn from './components/SignIn/signin';

// Define your theme object
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

// Main App component
const App = () => {
    const [isSignedIn, setIsSignedIn] = useState(false);

    useEffect(() => {
        const loggedInStatus = localStorage.getItem('isLoggedIn') === 'true';
        setIsSignedIn(loggedInStatus);
    }, []);

    const handleSignIn = () => {
        setIsSignedIn(true);
        localStorage.setItem('isLoggedIn', 'true');
    };

    const handleSignOut = () => {
        setIsSignedIn(false);
        localStorage.removeItem('isLoggedIn');
    };

    return (
        <ThemeProvider theme={demoTheme}>
            <Router>
                <>
                    {isSignedIn ? (
                        <>
                            <Header onLogout={handleSignOut} />
                            <Routes>
                                <Route path="/" element={<div>Welcome to the dashboard!</div>} /> {/* Add your main component here */}
                                <Route path="*" element={<Navigate to="/" />} />
                            </Routes>
                        </>
                    ) : (
                        <Routes>
                            <Route path="/" element={<SignIn onSignIn={handleSignIn} />} />
                            <Route path="*" element={<Navigate to="/" />} />
                        </Routes>
                    )}
                </>
            </Router>
        </ThemeProvider>
    );
};

export default App;
