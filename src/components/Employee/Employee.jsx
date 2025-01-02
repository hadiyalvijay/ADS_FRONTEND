import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useTheme } from '../ThemeContext';
import EmployeeModel from './EmployeeModel';
import { Box, useMediaQuery } from '@mui/material';
import Employeelist from './Employeelist';

const Employee = ({setPageLoading}) => {
  const { isDarkMode } = useTheme();
  const location = useLocation();
  const isMobile = useMediaQuery('(max-width: 900px)');
  const currentUsername = localStorage.getItem('username');


  
  const pathSegments = location.pathname.split('/').filter(Boolean);

  return (
    <div style={{ color: isDarkMode ? '#c7c7df' : '#566a7f', width: isMobile ? '90vw' : 'auto' }}>
      <h1>{pathSegments[pathSegments.length - 1]}</h1>
      <p>{pathSegments.join(' / ')}</p>
      <Box sx={{ display: "flex", justifyContent: "end" }}>

        <EmployeeModel />

      </Box>
      <Box sx={{ display: "flex", justifyContent: "center", position:"relative", width:"100%"  }}>

        <Employeelist currentUsername={currentUsername} setPageLoading={setPageLoading} />

      </Box>
    </div>
  );
};

export default Employee;
