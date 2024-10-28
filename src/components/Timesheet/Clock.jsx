import React, { useState } from 'react';
import { Box, Typography, Button } from '@mui/material';

const Clock = ({ time, isDarkMode }) => {
    const [activeState, setActiveState] = useState("in");

    // Define label mappings based on the active state (in/out)
    const labels = activeState === "in" 
        ? { hours: 'Hours', minutes: 'Minutes', seconds: 'Seconds' } 
        : { hours: 'Work', minutes: 'Lunch', seconds: 'Break' };

    // Define time values based on the active state (for example purposes, the same time object is used)
    const getTimeValue = (type) => {
        switch (type) {
            case 'hours':
                return time.hours;
            case 'minutes':
                return time.minutes;
            case 'seconds':
                return time.seconds;
            default:
                return 0;
        }
    };

    const handleToggle = () => {
        setActiveState(prevState => (prevState === "in" ? "out" : "in"));
    };

    return (
        <Box>
            {/* Display Progress Rings for Hours, Minutes, and Seconds */}
            <Box sx={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center', mt: 3 }}>
                <ProgressRing 
                    value={getTimeValue('hours')} 
                    label={labels.hours} 
                    strokeColor={isDarkMode ? "#ff4500" : "#007bff"} 
                    max={24} 
                />
                <ProgressRing 
                    value={getTimeValue('minutes')} 
                    label={labels.minutes} 
                    strokeColor={isDarkMode ? "#FFFF" : "#17a2b8"} 
                />
                <ProgressRing 
                    value={getTimeValue('seconds')} 
                    label={labels.seconds} 
                    strokeColor={isDarkMode ? "#FFFF" : "#28a745"} 
                />
            </Box>
        </Box>
    );
};

const ProgressRing = ({ value, label, strokeColor, max = 60 }) => {
    // Function to calculate progress for the progress ring
    const setProgress = (progress) => (progress / max) * (2 * Math.PI * 36);

    return (
        <Box className="clock-item" sx={{ textAlign: 'center' }}>
            <svg width="80" height="80" role="img" aria-label={`${label} progress`}>
                <circle
                    className="progress-ring__circle"
                    stroke={strokeColor}
                    strokeWidth="4"
                    fill="transparent"
                    r="36"
                    cx="40"
                    cy="40"
                    style={{
                        strokeDasharray: 2 * Math.PI * 36,
                        strokeDashoffset: 2 * Math.PI * 36 - setProgress(value),
                        transform: 'rotate(-90deg)',
                        transformOrigin: '50% 50%',
                        transition: '0.35s stroke-dashoffset',
                    }}
                />
                <circle
                    className="progress-dot"
                    fill={strokeColor}
                    r="3"
                    cx="40"
                    cy="4"
                    style={{
                        transform: `rotate(${setProgress(value)}deg)`,
                        transformOrigin: '40px 40px',
                        transition: '0.35s transform',
                    }}
                />
                <text
                    x="50%"
                    y="50%"
                    dominantBaseline="middle"
                    textAnchor="middle"
                    fill={strokeColor}
                    fontSize="14px"
                >
                    {value}
                </text>
            </svg>
            <Typography className="time-unit">{label}</Typography>
        </Box>
    );
};

export default Clock;
