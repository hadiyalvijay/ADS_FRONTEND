// src/index.js
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { ThemeProvider } from './components/ThemeContext';

// Ensure the element with id="root" exists
const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Root element with id 'root' not found in index.html");
}

ReactDOM.createRoot(rootElement).render(
  <ThemeProvider>
    <App />
  </ThemeProvider>
);
