import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Sidebar from './components/Sidebar/Sidebar';
import MobileSidebar from './components/Sidebar/MobileSidebar';
import MainContent from './components/MainContent/MainContent';
import Header from './components/MainContent/Header';
import SignIn from './components/SignIn/signin';
import Employee from './components/Employee/Employee';
import Attendance from './components/Attendance/Attendance';
import UserProfile from './components/Employee/UserProfile';
import { useTheme } from './components/ThemeContext';
import { Box, useMediaQuery } from '@mui/material';
import { Loader2 } from 'lucide-react';
import EnhancedLoading from './components/EnhancedLoading';
import axios from 'axios';

const LoadingOverlay = () => (
  <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
    <EnhancedLoading className="text-white" overlay />
  </div>
);

const App = () => {
  const location = useLocation();

  const [isLoading, setIsLoading] = useState(false);
  const [pageLoading, setPageLoading] = useState(false);
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

 
  useEffect(() => {
    const initializeApp = async () => {
      setIsLoading(true);
      try {
       
        await new Promise(resolve => setTimeout(resolve, 1000));
      } finally {
        setIsLoading(false);
      }
    };
    initializeApp();
  }, []);

  const toggleSidebar = () => {
    const newState = !sidebarOpen;
    setSidebarOpen(newState);
    localStorage.setItem('sidebarOpen', JSON.stringify(newState));
  };

  const handleSignIn = async (username) => {
    setPageLoading(true);
    try {
     
      const response = await axios.get('http://localhost:5000/api/employees');
      const employee = response.data.find(emp => emp.username === username);

      if (employee) {
        const fullName = `${employee.firstName} ${employee.middleName || ''}`.trim();
        console.log(fullName);
        setUsername(fullName);  
        localStorage.setItem('username', fullName);

      } else {
        setUsername(username);
        localStorage.setItem('username', username);
      }

      setIsSignedIn(true);
      localStorage.setItem('isSignedIn', 'true');
      await new Promise(resolve => setTimeout(resolve, 1000)); 
    } catch (error) {
      console.error('Error during sign in:', error);
    } finally {
      setPageLoading(false);
    }
  };

  const handleSignOut = () => {
    setPageLoading(true);
    setIsSignedIn(false);
    setUsername('');


    const isDarkMode = localStorage.getItem('isDarkMode');

    localStorage.clear();
    if (isDarkMode) {
      localStorage.setItem('isDarkMode', isDarkMode);
    }

    setPageLoading(false);
  };



  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 18) return 'Good Afternoon';
    return 'Good Evening';
  };

  if (isLoading || pageLoading) {
    return (
      <div className={`min-h-screen flex items-center justify-center ${isDarkMode ? 'bg-[#232333]' : 'bg-[#ffffff]'}`}>
        <EnhancedLoading fullScreen />
      </div>
    );
  }


  const LayoutWrapper = ({ children }) => (
    <div
      className={`
        flex h-auto w-auto 
        ${isDarkMode ? 'bg-[#232333]' : 'bg-slate-50'}
        ${pageLoading ? 'pointer-events-none' : ''}
      `}
      style={{
        display: 'flex',
        height: 'auto',
        width: 'auto',
        backgroundColor: isDarkMode ? '#232333' : '#f6f5fa',
      }}
    >
      {pageLoading && <LoadingOverlay />}
      {isSignedIn && (
        isMobile ? (
          <>
            {sidebarOpen && (
              <div
                style={{
                  position: 'fixed',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  backgroundColor: 'rgba(0, 0, 0, 0.5)',
                  backdropFilter: 'blur(5px)',
                  zIndex: 999,
                }}
                onClick={() => setSidebarOpen(false)}
              />
            )}
            <MobileSidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
          </>
        ) : (
          <Sidebar open={sidebarOpen} onClose={toggleSidebar} />
        )
      )}
      <div
        style={{
          flex: 1,
          marginLeft: !isMobile ? '120px' : '20px',
          marginRight: '120px',
          transition: 'margin-left 0.3s ease',
          filter: isMobile && sidebarOpen ? 'blur(5px)' : 'none',
        }}
      >
        <Header onLogout={handleSignOut} toggleSidebar={toggleSidebar} sidebarOpen={sidebarOpen} />
        {children}
      </div>
    </div>
  );

  return (
      <Routes location={location} key={location.key}>
        <Route
          path="/loading"
          element={
            <div className={`min-h-screen flex items-center justify-center ${isDarkMode ? 'bg-[#232333]' : 'bg-slate-50'}`}>
              <EnhancedLoading size="large" />
            </div>
          }
        />
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
              <LayoutWrapper>
                <Box
                  style={{
                    color: isDarkMode ? '#c7c7df' : '#566a83',
                    marginTop: isMobile ? '85px' : '30px',
                    fontSize: '24px',
                  }}
                >
                  <h1 style={{ fontSize: '40px' }}>
                    {getGreeting()}, {username}
                  </h1>
                  <p style={{ fontSize: '20px' }}>
                    {new Date().toLocaleDateString('en-US', {
                      weekday: 'long',
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </p>
                </Box>
                <MainContent
                  sidebarOpen={sidebarOpen}
                  setPageLoading={setPageLoading}
                />
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
                <Box style={{ fontSize: isMobile ? '18px' : '25px', marginTop: isMobile ? '100px' : '10px' }}>
                  <Employee setPageLoading={setPageLoading} />
                </Box>
              </LayoutWrapper>
            ) : (
              <Navigate to="/" />
            )
          }
        />
        <Route
          path="/Employee/Attendance"
          element={
            isSignedIn ? (
              <LayoutWrapper>
                <Box style={{ fontSize: isMobile ? '18px' : '25px', marginTop: isMobile ? '100px' : '10px' }}>
                  <Attendance setPageLoading={setPageLoading} />
                </Box>
              </LayoutWrapper>
            ) : (
              <Navigate to="/" />
            )
          }
        />
        <Route
          path="/User Profile/Profile"
          element={
            isSignedIn ? (
              <LayoutWrapper>
                <Box
                  style={{
                    fontSize: isMobile ? '18px' : '30px',
                    marginTop: isMobile ? '100px' : '10px',
                  }}
                >
                  <Box style={{ color: isDarkMode ? '#c7c7df' : '#566a7f' }}>
                    <p>
                      {window.location.pathname
                        .split('/')
                        .filter(segment => segment)
                        .map(segment => decodeURIComponent(segment))
                        .join(' / ')}
                    </p>
                  </Box>
                  <UserProfile setPageLoading={setPageLoading} key={location.key} />
                </Box>
              </LayoutWrapper>
            ) : (
              <Navigate to="/" />
            )
          }
        />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
   
  );
};

export default App;
