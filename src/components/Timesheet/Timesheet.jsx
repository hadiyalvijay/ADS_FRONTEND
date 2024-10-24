import React, { useEffect, useState } from 'react';
import { Box, Typography, Button } from '@mui/material';
import { useTheme } from '../ThemeContext';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Timesheet = () => {
    const { isDarkMode } = useTheme();

    const [time, setTime] = useState({
        hours: '00',
        minutes: '00',
        seconds: '00',
        period: 'AM',
    });

    const [digitalTime, setDigitalTime] = useState('');
    const [isTimerRunning, setIsTimerRunning] = useState(false);
    const [startTime, setStartTime] = useState(null);
    const [currentActivity, setCurrentActivity] = useState('');
    const [isOnLunch, setIsOnLunch] = useState(false);
    const [isOnBreak, setIsOnBreak] = useState(false);
    const [workTime, setWorkTime] = useState(0);
    const [lunchTime, setLunchTime] = useState(0);
    const [breakTime, setBreakTime] = useState(0)



    useEffect(() => {
        const savedStartTime = localStorage.getItem('startTime');
        const savedWorkTime = parseInt(localStorage.getItem('workTime')) || 0;
        const savedLunchTime = parseInt(localStorage.getItem('lunchTime')) || 0;
        const savedBreakTime = parseInt(localStorage.getItem('breakTime')) || 0;

        if (savedStartTime) {
            setStartTime(parseInt(savedStartTime));
            setIsTimerRunning(true);
        }
        setWorkTime(savedWorkTime);
        setLunchTime(savedLunchTime);
        setBreakTime(savedBreakTime);
    }, []);

    useEffect(() => {
        let intervalId;

        if (isTimerRunning) {
            intervalId = setInterval(() => {
                const elapsedTime = Math.floor((Date.now() - startTime) / 1000);
                const hoursWorked = Math.floor(elapsedTime / 3600);
                const minutesWorked = Math.floor((elapsedTime % 3600) / 60);
                const secondsWorked = elapsedTime % 60;

                setTime({
                    hours: hoursWorked.toString().padStart(2, '0'),
                    minutes: minutesWorked.toString().padStart(2, '0'),
                    seconds: secondsWorked.toString().padStart(2, '0'),
                    period: hoursWorked >= 12 ? 'PM' : 'AM',
                });
            }, 1000);
        }

        // updateClock();
        return () => clearInterval(intervalId);
    }, [isTimerRunning, startTime]);


    const punchIn = () => {
        setIsTimerRunning(true);
        setStartTime(Date.now());
        setCurrentActivity('Punch In');
        toast.success("Punch In Successfully!");
        localStorage.setItem('startTime', Date.now());
    };

    const lunchIn = () => {
        if (isTimerRunning) {
            setIsOnLunch(true);
            setStartTime(Date.now());
            toast.info('Lunch In Successfully!');
        }
    };

    const lunchOut = () => {
        setIsOnLunch(false);
        setStartTime(null);
        toast.info('Lunch Out Successfully!');
    };

    const breakIn = () => {
        if (isTimerRunning) {
            setIsOnBreak(true);
            setStartTime(Date.now());
            toast.info("Break In Successfully!");
        }
    };

    const breakOut = () => {
        setIsOnBreak(false);
        setStartTime(null);
        toast.info("Break Out Successfully!");
    };

    const punchOut = () => {
        setIsTimerRunning(false);
        const elapsedTime = Math.floor((Date.now() - startTime) / 1000);
        const totalWorkTime = workTime + elapsedTime; // Update total work time
        setWorkTime(totalWorkTime);
        localStorage.setItem('workTime', totalWorkTime); // Save to local storage
        setTime({
            hours: '00',
            minutes: '00',
            seconds: '00',
            period: 'AM',
        });
        setStartTime(null);
        setCurrentActivity('');
        localStorage.removeItem('startTime');
        toast.success("Punch Out Successfully!");
    };

    
    const formatTotalWorkTime = (totalSeconds) => {
        const hours = Math.floor(totalSeconds / 3600);
        const minutes = Math.floor((totalSeconds % 3600) / 60);
        const seconds = totalSeconds % 60;
        return `${hours} hours ${minutes} minutes ${seconds} seconds`;
    };

    const setProgress = (progress) => {
        return (progress / 60) * (2 * Math.PI * 36);
    };

    const hourCircleStroke = isDarkMode ? "#ff4500" : "#007bff";
    const overtimeCircleStroke = isDarkMode ? "#FFD700" : "#FFC107";

    const hoursWorked = parseFloat(time.hours) + (parseFloat(time.minutes) / 60);
    const isOvertime = hoursWorked > 8;


    const hoursInCircle = Math.min(hoursWorked, 8);
    const overtimeInCircle = isOvertime ? hoursWorked - 8 : 0;

    return (
        <Box
            sx={{
                bgcolor: isDarkMode ? '#2a2b40' : '#fff',
                color: isDarkMode ? '#fff' : '#000',
                borderRadius: 1,
                p: 3,
            }}
        >
            <Typography variant="h6" sx={{ mb: 2 }}>
                Timesheet
            </Typography>
            <Typography>Current session: {formatTotalWorkTime(workTime)} / 8 hrs</Typography>
            <Typography variant="h4" sx={{ my: 2, textAlign: 'center' }}>
                {`${time.hours}:${time.minutes}:${time.seconds} ${time.period}`} {/* Display formatted time */}
            </Typography>

            <Box sx={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center', mt: 3 }}>
                {/* Hours */}
                <Box className="clock-item" sx={{ textAlign: 'center' }}>
                    <svg width="80" height="80">
                        <circle
                            className="progress-ring__circle"
                            stroke={hourCircleStroke}
                            strokeWidth="4"
                            fill="transparent"
                            r="36"
                            cx="40"
                            cy="40"
                            style={{
                                strokeDasharray: 2 * Math.PI * 36,
                                strokeDashoffset: 2 * Math.PI * 36 - setProgress(hoursInCircle * 60),
                                transform: 'rotate(-90deg)',
                                transformOrigin: '50% 50%',
                                transition: '0.35s stroke-dashoffset',
                            }}
                        />
                        {/* Circle for overtime */}
                        {isOvertime && (
                            <circle
                                className="progress-ring__circle-overtime"
                                stroke={overtimeCircleStroke}
                                strokeWidth="4"
                                fill="transparent"
                                r="36"
                                cx="40"
                                cy="40"
                                style={{
                                    strokeDasharray: 2 * Math.PI * 36,
                                    strokeDashoffset: 2 * Math.PI * 36 - setProgress(overtimeInCircle * 60), // Overtime calculation
                                    transform: 'rotate(-90deg)',
                                    transformOrigin: '50% 50%',
                                    transition: '0.35s stroke-dashoffset',
                                }}
                            />
                        )}
                        <circle
                            className="progress-dot"
                            fill={isOvertime ? overtimeCircleStroke : hourCircleStroke}
                            r="3"
                            cx="40"
                            cy="4"
                            style={{
                                transform: `rotate(${setProgress(hoursInCircle * 60)}deg)`, // Limit to 8 hours
                                transformOrigin: '40px 40px',
                                transition: '0.35s transform',
                            }}
                        />
                        <text
                            x="50%"
                            y="50%"
                            dominantBaseline="middle"
                            textAnchor="middle"
                            fill={isOvertime ? overtimeCircleStroke : hourCircleStroke}
                            fontSize="14px"
                        >
                            {time.hours}
                        </text>
                    </svg>
                    <Typography className="time-unit">Hours</Typography>
                </Box>
                {/* Minutes */}
                <Box className="clock-item" sx={{ textAlign: 'center' }}>
                    <svg width="80" height="80">
                        <circle
                            className="progress-ring__circle"
                            stroke={isDarkMode ? "#FFFF" : "#17a2b8"} // Maintain original colors for minutes
                            strokeWidth="4"
                            fill="transparent"
                            r="36"
                            cx="40"
                            cy="40"
                            style={{
                                strokeDasharray: 2 * Math.PI * 36,
                                strokeDashoffset: 2 * Math.PI * 36 - setProgress(time.minutes),
                                transform: 'rotate(-90deg)',
                                transformOrigin: '50% 50%',
                                transition: '0.35s stroke-dashoffset',
                            }}
                        />
                        <circle
                            className="progress-dot"
                            fill={isDarkMode ? "#FFFF" : "#17a2b8"}
                            r="3"
                            cx="40"
                            cy="4"
                            style={{
                                transform: `rotate(${setProgress(time.minutes)}deg)`,
                                transformOrigin: '40px 40px',
                                transition: '0.35s transform',
                            }}
                        />
                        <text
                            x="50%"
                            y="50%"
                            dominantBaseline="middle"
                            textAnchor="middle"
                            fill={isDarkMode ? "#FFFF" : "#17a2b8"}
                            fontSize="14px"
                        >
                            {time.minutes}
                        </text>
                    </svg>
                    <Typography className="time-unit">Minutes</Typography>
                </Box>
                {/* Seconds */}
                <Box className="clock-item" sx={{ textAlign: 'center' }}>
                    <svg width="80" height="80">
                        <circle
                            className="progress-ring__circle"
                            stroke={isDarkMode ? "#FFFF" : "#28a745"} // Maintain original colors for seconds
                            strokeWidth="4"
                            fill="transparent"
                            r="36"
                            cx="40"
                            cy="40"
                            style={{
                                strokeDasharray: 2 * Math.PI * 36,
                                strokeDashoffset: 2 * Math.PI * 36 - setProgress(time.seconds),
                                transform: 'rotate(-90deg)',
                                transformOrigin: '50% 50%',
                                transition: '0.35s stroke-dashoffset',
                            }}
                        />
                        <circle
                            className="progress-dot"
                            fill={isDarkMode ? "#FFFF" : "#28a745"}
                            r="3"
                            cx="40"
                            cy="4"
                            style={{
                                transform: `rotate(${setProgress(time.seconds)}deg)`,
                                transformOrigin: '40px 40px',
                                transition: '0.35s transform',
                            }}
                        />
                        <text
                            x="50%"
                            y="50%"
                            dominantBaseline="middle"
                            textAnchor="middle"
                            fill={isDarkMode ? "#FFFF" : "#28a745"}
                            fontSize="14px"
                        >
                            {time.seconds}
                        </text>
                    </svg>
                    <Typography className="time-unit">Seconds</Typography>
                </Box>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-around', mt: 4 }}>
                {!isTimerRunning ? (
                    <Box>
                        <Button variant="contained" color="primary" onClick={punchIn}>
                            Punch In
                        </Button>
                    </Box>
                ) : (
                    <Box>
                        {isOnBreak ? (
                            <Button variant="contained" color="success" onClick={breakOut}>
                                Break Out
                            </Button>
                        ) : (
                            <Box>
                                {isOnLunch ? (
                                    <Button variant="contained" color="secondary" onClick={lunchOut}>
                                        Lunch Out
                                    </Button>
                                ) : (
                                    <Box sx={{ textAlign: "center", gap: 2 }}>
                                        <Box >
                                            <Button variant="contained" color="primary" onClick={punchOut}>
                                                Punch Out
                                            </Button>
                                        </Box>
                                        <Box sx={{ display: 'flex', gap: 2, mt: 1 }}>
                                            <Button variant="contained" color="secondary" onClick={lunchIn}>
                                                Lunch In
                                            </Button>
                                            <Button variant="contained" color="success" onClick={breakIn}>
                                                Break In
                                            </Button>
                                        </Box>
                                    </Box>
                                )}
                            </Box>
                        )}
                    </Box>
                )}
            </Box>
            <ToastContainer />

        </Box>
    );
};

export default Timesheet;
