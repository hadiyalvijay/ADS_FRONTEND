import React from 'react';
import { useLocation } from 'react-router-dom';
import { useTheme } from '../ThemeContext';

const Attendance = () => {
  const { isDarkMode } = useTheme();
  const location = useLocation();
 
  const pathSegments = location.pathname.split('/').filter(Boolean);


  return (
    <div style={{ color: isDarkMode ? '#c7c7df' : '#566a7f' }}>
      <h1>{pathSegments[pathSegments.length - 1]}</h1>
      <p>{pathSegments.join(' / ')}</p>
    </div>
  );
};

export default Attendance;
