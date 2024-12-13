import React from 'react';
import { Box, Typography, LinearProgress } from '@mui/material';
import { useTheme } from '../ThemeContext';

const Statistics = ({ statsData }) => {
    const { isDarkMode } = useTheme();

    return (
        <Box
            sx={{
                p: 2,
                bgcolor: isDarkMode ? '#2a2b40' : '#fff',
                color: isDarkMode ? '#c7c7df' : '#566a7f', 
                borderRadius: 1,
                height: { xs: 'auto', md: '460px' },
                overflow: 'auto',
            }}
        >
            <Typography variant="h6">Statistics</Typography>
            <Typography variant="body2">Data Overview</Typography>
            {statsData.map((stat, index) => (
                <Box key={index} sx={{ mt: 2 }}>
                    <Typography variant="body2">{stat.label}</Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', flexDirection: { xs: 'column', sm: 'row' } }}>
                        <Box sx={{ width: '100%', mr: 1 }}>
                            <LinearProgress 
                                variant="determinate" 
                                value={stat.progress} 
                                color={stat.color} 
                            />
                        </Box>
                        <Box sx={{ minWidth: 35 }}>
                            <Typography
                                variant="body2"
                                sx={{ color: isDarkMode ? '#c7c7df' : '#566a7f' }} 
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
