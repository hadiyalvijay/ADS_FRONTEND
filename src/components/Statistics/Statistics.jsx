// src/components/Statistics/Statistics.js
import React from 'react';
import { Box, Typography, LinearProgress } from '@mui/material';
import { useTheme } from '../ThemeContext';

const Statistics = () => {
    const { isDarkMode } = useTheme();

    const stats = [
        { label: 'Today', value: '3.45 / 8 hrs', color: 'primary' },
        { label: 'This Week', value: '28 / 40 hrs', color: 'secondary' },
        { label: 'This Month', value: '90 / 160 hrs', color: 'success' },
        { label: 'Remaining', value: '90 / 160 hrs', color: 'error' },
        { label: 'Overtime', value: '4', color: 'info' },
    ];

    return (
        <Box
            sx={{
                p: 2,
                bgcolor: isDarkMode ? '#2a2b40' : '#fff', // Background color based on theme
                color: isDarkMode ? '#fff' : '#000', // Text color based on theme
                borderRadius: 1,
            }}
        >
            <Typography variant="h6">Statistics</Typography>
            <Typography variant="body2">Data Overview</Typography>
            {stats.map((stat, index) => (
                <Box key={index} sx={{ mt: 2 }}>
                    <Typography variant="body2">{stat.label}</Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Box sx={{ width: '100%', mr: 1 }}>
                            <LinearProgress variant="determinate" value={70} color={stat.color} />
                        </Box>
                        <Box sx={{ minWidth: 35 }}>
                            <Typography
                                variant="body2"
                                sx={{ color: isDarkMode ? '#fff' : 'text.secondary' }} // Set color based on dark mode
                            >
                                {stat.value}
                            </Typography>
                        </Box>
                    </Box>
                </Box>
            ))}
        </Box>
    );
};

export default Statistics;
