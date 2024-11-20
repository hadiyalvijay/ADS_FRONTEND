import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Sidebar from './components/Sidebar/Sidebar';
import MainContent from './components/MainContent/MainContent';
import Header from './components/MainContent/Header';
import SignIn from './components/SignIn/signin';
import { useTheme } from './components/ThemeContext';
import { Box } from '@mui/material';
import Employee from './components/Employee/Employee';
import Attendance from './components/Attendance/Attendance';

const App = () => {
  const [isSignedIn, setIsSignedIn] = useState(() => {
    const storedSignInStatus = localStorage.getItem('isSignedIn');
    return storedSignInStatus === 'true';
  });

  const [username, setUsername] = useState(localStorage.getItem('username') || '');
  const [sidebarOpen, setSidebarOpen] = useState(() => {
    const savedSidebarState = localStorage.getItem('sidebarOpen');
    return savedSidebarState ? JSON.parse(savedSidebarState) : true;
  });

  const { isDarkMode, toggleTheme } = useTheme();

  useEffect(() => {
    localStorage.setItem('isDarkMode', isDarkMode);
  }, [isDarkMode]);

  const toggleSidebar = () => {
    const newState = !sidebarOpen;
    setSidebarOpen(newState);
    localStorage.setItem('sidebarOpen', JSON.stringify(newState));
  };

  const handleSignIn = (username) => {
    setIsSignedIn(true);
    setUsername(username);
    localStorage.setItem('username', username);
    localStorage.setItem('isSignedIn', 'true');
    localStorage.setItem('sidebarOpen', 'true');  // Ensure sidebar remains open after sign-in
  };

  const handleSignOut = () => {
    setIsSignedIn(false);
    setUsername('');
    localStorage.removeItem('username');
    localStorage.removeItem('isSignedIn');
    localStorage.removeItem('token');
  };

  // Get the current date
  const currentDate = new Date();
  const dayName = currentDate.toLocaleString('en-US', { weekday: 'long' });
  const dayNumber = currentDate.getDate();
  const monthName = currentDate.toLocaleString('en-US', { month: 'long' });
  const year = currentDate.getFullYear();

  return (
    <div>
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              isSignedIn ? (
                <Navigate to="/Dashboard" />
              ) : (
                <SignIn onSignIn={handleSignIn} />
              )
            }
          />
          <Route
            path="/Dashboard"
            element={
              isSignedIn ? (
                <div style={{ display: 'flex', backgroundColor: isDarkMode ? '#232333' : '#f6f5fa',margin:-8 }}>
                  {/* Sidebar and Header only visible if signed in */}
                  <Sidebar open={sidebarOpen} onClose={toggleSidebar} />
                  <div style={{ flex: 1, marginLeft: sidebarOpen ? '30px' : '0px', marginRight: '28px' }}>
                    <Header onLogout={handleSignOut} toggleSidebar={toggleSidebar} sidebarOpen={sidebarOpen} />
                    <Box style={{ color: isDarkMode ? '#c7c7df' : '#566a83' }}>
                      <h1>Welcome, {username}</h1>
                      <p>{dayName}, {dayNumber} {monthName} {year}</p>
                    </Box>
                    {/* Main Content */}
                    <MainContent sidebarOpen={sidebarOpen} />
                  </div>
                </div>
              ) : (
                <Navigate to="/" />
              )
            }
          />
          <Route
            path="/Employee/EmployeeList"
            element={
              isSignedIn ? (
                <div style={{ display: 'flex', backgroundColor: isDarkMode ? '#232333' : '#f6f5fa' }}>
                  {/* Sidebar and Header remain visible */}
                  <Sidebar open={sidebarOpen} onClose={toggleSidebar} />
                  <div style={{ flex: 1, marginLeft: sidebarOpen ? '30px' : '0px', marginRight: '28px' }}>
                    <Header onLogout={handleSignOut} toggleSidebar={toggleSidebar} sidebarOpen={sidebarOpen} />
                    <Employee />
                  </div>
                </div>
              ) : (
                <Navigate to="/" />
              )
            }
          />
          <Route
            path="/Employee/Attendance/"
            element={
              isSignedIn ? (
                <div style={{ display: 'flex', backgroundColor: isDarkMode ? '#232333' : '#f6f5fa',margin:-8  }}>
                  {/* Sidebar and Header remain visible */}
                  <Sidebar open={sidebarOpen} onClose={toggleSidebar} />
                  <div style={{ flex: 1, marginLeft: sidebarOpen ? '30px' : '0px', marginRight: '28px' }}>
                    <Header onLogout={handleSignOut} toggleSidebar={toggleSidebar} sidebarOpen={sidebarOpen} />
                    <Attendance />
                  </div>
                </div>
              ) : (
                <Navigate to="/" />
              )
            }
          />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
