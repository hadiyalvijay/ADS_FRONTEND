import React from 'react';
import { Box, Typography, LinearProgress } from '@mui/material';
import { useTheme } from '../ThemeContext';

const Statistics = ({ statsData }) => {
    const { isDarkMode } = useTheme();

    return (
        <Box
        sx={{
            bgcolor: isDarkMode 
                ? 'rgba(42, 43, 64, 0.7)'
                : 'rgba(255, 255, 255, 0.25)',
            color: isDarkMode ? '#c7c7df' : '#566a7f',
            borderRadius: 3,
            p: 5,
            height: { xs: '460px', sm: '460px' },
            backdropFilter: 'blur(10px)',
            WebkitBackdropFilter: 'blur(10px)',
            border: '1px solid',
            borderColor: isDarkMode 
                ? 'rgba(255, 255, 255, 0.15)'
                : 'rgba(255, 255, 255, 0.8)',
            boxShadow: isDarkMode
                ? '0 8px 32px 0 rgba(0, 0, 0, 0.2)'
                : '0 8px 32px 0 rgba(200, 200, 200, 0.37)',
            // position: 'relative',
            '&::before': {
                content: '""',
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                borderRadius: 3,
                background: isDarkMode
                    ? 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, transparent 100%)'
                    : '',
                pointerEvents: 'none'
            }
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
                                sx={{ position: 'relative', zIndex: 1 }}  
                            />
                        </Box>
                        <Box sx={{ minWidth: 35}}>
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
