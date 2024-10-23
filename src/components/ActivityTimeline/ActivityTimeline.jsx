// src/components/ActivityTimeline.js
import React from 'react';
import { Box, Typography } from '@mui/material';
import { useTheme } from '../ThemeContext';

const ActivityTimeline = () => {
    const { isDarkMode } = useTheme();

    return (
        <Box
            sx={{
                p: 2,
                bgcolor: isDarkMode ? '#2a2b40' : '#fff',
                color: isDarkMode ? '#fff' : '#000',
                borderRadius: 1,
            }}
        >
            <Typography variant="h6">Activity Timeline</Typography>
            <Typography>Recent Activities</Typography>
        </Box>
    );
};

export default ActivityTimeline;
