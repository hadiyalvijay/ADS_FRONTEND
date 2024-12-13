import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Sidebar from './components/Sidebar/Sidebar';
import MobileSidebar from './components/Sidebar/MobileSidebar';
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
    return savedSidebarState ? JSON.parse(savedSidebarState) : false;
  });

  const { isDarkMode } = useTheme();
  const isMobile = useMediaQuery('(max-width: 900px)');

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
  };

  const handleSignOut = () => {
    setIsSignedIn(false);
    setUsername('');
    localStorage.clear();
  };

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 18) return 'Good Afternoon';
    return 'Good Evening';
  };

  const LayoutWrapper = ({ children }) => (
    <div
      style={{
        display: 'flex',
        height: '100vh',
        backgroundColor: isDarkMode ? '#232333' : '#f6f5fa',
      }}
    >
      {isSignedIn &&
        (isMobile ? (<>
          {sidebarOpen && (
            <div
              style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                backgroundColor: 'rgba(0, 0, 0, #9ca7b5)',
                backdropFilter: 'blur(5px)',
                zIndex: 999,
              }}
              onClick={() => setSidebarOpen(false)}
            ></div>
          )}
          <MobileSidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
        </>
        ) : (
          <Sidebar open={sidebarOpen} onClose={toggleSidebar} />
        ))}
      <div
        style={{
          flex: 1,
          marginLeft: !isMobile ? '70px' : '20px',
          marginRight: '20px',
          transition: 'margin-left 0.3s ease',
          overflow: 'auto',
          filter: isMobile && sidebarOpen ? 'blur(5px)' : 'none',
        }}
      >
        <div style={{ margin: "100" }}>
          <Header onLogout={handleSignOut} toggleSidebar={toggleSidebar} sidebarOpen={sidebarOpen} />
        </div>
        {children}
      </div>
    </div>
  );

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={isSignedIn ? <Navigate to="/Dashboard" /> : <SignIn onSignIn={handleSignIn} />}
        />
        <Route
          path="/Dashboard"
          element={
            isSignedIn ? (
              <LayoutWrapper>
                <Box style={{ color: isDarkMode ? '#c7c7df' : '#566a83', marginTop: isMobile ? "80px" : "30px" }}>
                  <h1>{getGreeting()}, {username}</h1>
                  <p>{new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
                </Box>
                <div style={{ marginTop: isMobile ? "" : "20px" }}>
                  <MainContent sidebarOpen={sidebarOpen} />
                </div>
              </LayoutWrapper>
            ) : (
              <Navigate to="/" />
            )
          }
        />
        <Route
          path="/Employee/EmployeeList"
          element={
            isSignedIn ? (
              <LayoutWrapper>
                <Employee />
              </LayoutWrapper>
            ) : (
              <Navigate to="/" />
            )
          }
        />
        <Route
          path="/Employee/Attendance/"
          element={
            isSignedIn ? (
              <LayoutWrapper>
                <Attendance />
              </LayoutWrapper>
            ) : (
              <Navigate to="/" />
            )
          }
        />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
};

export default App;
