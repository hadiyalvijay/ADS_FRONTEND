import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Header from './Header/Header';
import SignIn from './SignIn/signin';
// import Register from './SignIn/register';

const Home = () => {
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
    <Router>
      <div>
        {isSignedIn ? (
          <>
            <Header onLogout={handleSignOut} />
            <Routes>
              <Route path="/" />
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </>
        ) : (
          <Routes>
            {/* <Route path="/register" element={<Register />} /> */}
            <Route path="/" element={<SignIn onSignIn={handleSignIn} />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        )}
      </div>
    </Router>
  );
};

export default Home;
