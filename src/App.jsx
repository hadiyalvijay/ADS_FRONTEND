import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Sidebar from './components/Sidebar/Sidebar';
import MainContent from './components/MainContent/MainContent';
import Header from './components/MainContent/Header';
import SignIn from './components/SignIn/signin';
import { useTheme } from './components/ThemeContext';
import { Box, useMediaQuery } from '@mui/material';
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
    return savedSidebarState ? JSON.parse(savedSidebarState) : false; // Default to false (sidebar hidden)
  });

  const { isDarkMode, toggleTheme } = useTheme();
  const isMobile = useMediaQuery('(max-width: 900px)'); // Check if the screen size is under 900px

  useEffect(() => {
    localStorage.setItem('isDarkMode', isDarkMode);
  }, [isDarkMode]);

  // Toggle sidebar state
  const toggleSidebar = () => {
    const newState = !sidebarOpen;
    setSidebarOpen(newState);
    localStorage.setItem('sidebarOpen', JSON.stringify(newState));
  };

  const handleSignIn = (username) => {
    console.log('Signing in with username:', username);
    setIsSignedIn(true);
    setUsername(username);
    localStorage.setItem('username', username);
    localStorage.setItem('isSignedIn', 'true');
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
                <div style={{
                  display: 'flex',
                  backgroundColor: isDarkMode ? '#232333' : '#f6f5fa',
                  margin: -8,
                  overflow: 'hidden',
                }}>
                  {/* Show sidebar if screen width is larger than 900px or if the sidebar is toggled */}
                  {(!isMobile || sidebarOpen) && (
                    <Sidebar open={sidebarOpen} onClose={toggleSidebar} />
                  )}
                  <div style={{
                    margin: '25px',
                    flex: 1,
                    marginLeft: (!isMobile || sidebarOpen) ? '70px' : '25px',
                    // marginRight: '25px',
                    marginTop: '5px',
                    marginBottom: '5px',
                    transition: 'margin-left 0.3s ease',
                  }}>
                    <Header onLogout={handleSignOut} toggleSidebar={toggleSidebar} sidebarOpen={sidebarOpen} />
                    <Box style={{ color: isDarkMode ? '#c7c7df' : '#566a83' }}>
                      <h1>Welcome, {username}</h1>
                      <p>{dayName}, {dayNumber} {monthName} {year}</p>
                    </Box>
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
                <div style={{
                  display: 'flex',
                  backgroundColor: isDarkMode ? '#232333' : '#f6f5fa',
                  margin: -8,
                  overflow: 'hidden',
                }}>
                  {/* Show sidebar if screen width is larger than 900px or if the sidebar is toggled */}
                  {(!isMobile || sidebarOpen) && (
                    <Sidebar open={sidebarOpen} onClose={toggleSidebar} />
                  )}
                  <div style={{
                    flex: 1,
                    marginLeft: (!isMobile || sidebarOpen) ? '70px' : '25px',
                    marginRight: '25px',
                    marginTop: '5px',
                    marginBottom: '5px',
                    transition: 'margin-left 0.3s ease',
                  }}>
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
                <div style={{
                  display: 'flex',
                  backgroundColor: isDarkMode ? '#232333' : '#f6f5fa',
                  margin: -8,
                  overflow: 'hidden',
                }}>
                  {/* Show sidebar if screen width is larger than 900px or if the sidebar is toggled */}
                  {(!isMobile || sidebarOpen) && (
                    <Sidebar open={sidebarOpen} onClose={toggleSidebar} />
                  )}
                  <div style={{
                    flex: 1,
                    marginLeft: (!isMobile || sidebarOpen) ? '70px' : '25px',
                    marginRight: '25px',
                    marginTop: '5px',
                    marginBottom: '5px',
                    transition: 'margin-left 0.3s ease',
                  }}>
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
