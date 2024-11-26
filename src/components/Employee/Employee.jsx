import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useTheme } from '../ThemeContext';
import EmployeeModel from './EmployeeModel';
import { Box } from '@mui/material';
import Employeelist from './Employeelist';

const Employee = () => {
  const { isDarkMode } = useTheme();
  const location = useLocation();

  // Split the current path into segments
  const pathSegments = location.pathname.split('/').filter(Boolean);

  return (
    <div style={{ color: isDarkMode ? '#c7c7df' : '#566a7f' }}>
      <h1>{pathSegments[pathSegments.length - 1]}</h1>
        <p>{pathSegments.join(' / ')}</p>
      <Box sx={{ display: "flex", justifyContent: "end"}}>

        <EmployeeModel />

      </Box>
      <Box sx={{ display: "flex", justifyContent: "end"}}>

        <Employeelist />
        
      </Box>
    </div>
  );
};

export default Employee;
