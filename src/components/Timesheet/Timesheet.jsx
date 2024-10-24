// src/components/Timesheet.js
import React from 'react';
import { Box, Typography } from '@mui/material';
import { useTheme } from '../ThemeContext';

const Timesheet = () => {
    const { isDarkMode } = useTheme();

    return (
        <Box
            sx={{
                // p: 2,
                bgcolor: isDarkMode ? '#2a2b40' : '#fff',
                color: isDarkMode ? '#fff' : '#000',
                borderRadius: 1,
            }}
        >
            <Typography variant="h6">Timesheet</Typography>
            <Typography>Current session: 3.45 / 8 hrs</Typography>
            <Typography variant="h4" sx={{ my: 2, textAlign: 'center' }}>
                3.45 / 8 hrs
            </Typography>
        </Box>
    );
};

export default Timesheet;
