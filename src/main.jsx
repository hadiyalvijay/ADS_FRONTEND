import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { ThemeProvider } from './components/ThemeContext';
import { BrowserRouter } from 'react-router-dom';

// Ensure the element with id="root" exists
const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Root element with id 'root' not found in index.html");
}

ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <ThemeProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ThemeProvider>
  </React.StrictMode>
);
