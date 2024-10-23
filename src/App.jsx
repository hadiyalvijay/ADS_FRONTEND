import React from 'react';
import Home from './components/Home';
import { ThemeProvider } from 'styled-components';

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
        background: '#ffffff', // Background color for light mode
        text: '#212529', // Text color
    },
    spacing: (factor) => `${0.25 * factor}rem`, // Spacing function
};

// Main App component
const App = () => {
    
    return (
        <ThemeProvider theme={demoTheme}>
            <Home />
        </ThemeProvider>
    );
};

export default App;
