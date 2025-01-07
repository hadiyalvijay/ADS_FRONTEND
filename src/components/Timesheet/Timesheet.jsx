import React, { useEffect, useState, useRef } from 'react';
import { Box, Typography, Button, Grid, Popper, Paper, Fade, Modal } from '@mui/material';
import { useTheme } from '../ThemeContext';
import Clock from './Clock';

const Timesheet = ({ setActivityLog, logActivity, activityLog }) => {
    const { isDarkMode } = useTheme();
    const [time, setTime] = useState({ hours: '00', minutes: '00', seconds: '00', period: 'AM' });
    const [digitalTime, setDigitalTime] = useState('');
    const [isTimerRunning, setIsTimerRunning] = useState(false);
    const [startTime, setStartTime] = useState(null);
    const [currentActivity, setCurrentActivity] = useState('');
    const [isOnLunch, setIsOnLunch] = useState(false);
    const [isOnBreak, setIsOnBreak] = useState(false);
    const [workTime, setWorkTime] = useState(0);
    const [lunchTime, setLunchTime] = useState(0);
    const [breakTime, setBreakTime] = useState(0);
    const [totalWorkTime, setTotalWorkTime] = useState(0);
    const [isPunchedOut, setIsPunchedOut] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);
    const [popperMessage, setPopperMessage] = useState('');
    const [popperColor, setPopperColor] = useState('success');
    const containerRef = useRef(null);
    const [isPopperOpen, setIsPopperOpen] = useState(false);

    useEffect(() => {
        const savedStartTime = localStorage.getItem('startTime');
        const savedWorkTime = parseInt(localStorage.getItem('workTime')) || 0;
        const savedLunchTime = parseInt(localStorage.getItem('lunchTime')) || 0;
        const savedBreakTime = parseInt(localStorage.getItem('breakTime')) || 0;
        const savedTotalWorkTime = parseInt(localStorage.getItem('totalWorkTime')) || 0;

        if (savedStartTime) {
            setStartTime(parseInt(savedStartTime));
            setIsTimerRunning(true);
        }
        setWorkTime(savedWorkTime);
        setLunchTime(savedLunchTime);
        setBreakTime(savedBreakTime);
        setTotalWorkTime(savedTotalWorkTime);
    }, []);

    useEffect(() => {
        let intervalId;
        const updateClock = () => {
            const now = new Date();
            setDigitalTime(now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true }));
        };

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

        updateClock();

        return () => clearInterval(intervalId);
    }, [isTimerRunning, startTime]);

    const showPopper = (message, color = 'success') => {
        setPopperMessage(message);
        setPopperColor(color);
        setIsPopperOpen(true);
        setTimeout(() => setIsPopperOpen(false), 3000);
    };

    const punchIn = () => {
        setIsTimerRunning(true);
        const now = Date.now();
        setStartTime(now);
        setCurrentActivity('Punch In');
        showPopper('Punch In Successfully!');
        localStorage.setItem('startTime', now);
        logActivity('Punch In');
    };

    const lunchIn = () => {
        if (isTimerRunning) {
            setIsOnLunch(true);
            const elapsedTime = Math.floor((Date.now() - startTime) / 1000);
            setWorkTime(prev => prev + elapsedTime);
            setStartTime(Date.now());
            showPopper('Lunch In Successfully!', 'info');
            logActivity('Lunch In');
        }
    };

    const lunchOut = () => {
        if (isOnLunch) {
            const elapsedLunchTime = Math.floor((Date.now() - startTime) / 1000);
            setLunchTime(prev => prev + elapsedLunchTime);
            setIsOnLunch(false);
            setStartTime(Date.now());
            showPopper('Lunch break ended!');
            logActivity('Lunch Out');
        }
    };

    const breakIn = () => {
        if (isTimerRunning) {
            setIsOnBreak(true);
            const elapsedTime = Math.floor((Date.now() - startTime) / 1000);
            setWorkTime(prev => prev + elapsedTime);
            setStartTime(Date.now());
            showPopper('On break!');
            logActivity('Break In');
        }
    };

    const breakOut = () => {
        if (isOnBreak) {
            const elapsedBreakTime = Math.floor((Date.now() - startTime) / 1000);
            setBreakTime(prev => prev + elapsedBreakTime);
            setIsOnBreak(false);
            setStartTime(Date.now());
            showPopper('Break ended!');
            logActivity('Break Out');
        }
    };

    const punchOut = () => {
        setIsTimerRunning(false);
        const totalSecondsWorked = workTime + lunchTime + breakTime;
        const actualWorkTime = workTime;
        setTotalWorkTime(actualWorkTime);
        setIsPunchedOut(true);
        localStorage.setItem('workTime', actualWorkTime); 
        localStorage.setItem('lunchTime', lunchTime); 
        localStorage.setItem('breakTime', breakTime); 
        localStorage.setItem('totalWorkTime', totalSecondsWorked);
        localStorage.removeItem('startTime');
        logActivity('Punch Out');
    };

    const formatTotalWorkTime = (totalSeconds) => {
        const hours = Math.floor(totalSeconds / 3600);
        const minutes = Math.floor((totalSeconds % 3600) / 60);
        const seconds = totalSeconds % 60;
        return `${hours}h ${minutes}m ${seconds}s`;
    };

    return (
        <Box
            ref={containerRef}
            sx={{
                bgcolor: isDarkMode 
                    ? 'rgba(42, 43, 64, 0.7)'
                    : 'rgba(255, 255, 255, 0.25)',
                color: isDarkMode ? '#c7c7df' : '#566a7f',
                borderRadius: 3,
                p: 5,
                height: { xs: 'auto', sm: '460px' },
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
            <Typography variant="h6" sx={{ mb: 2 }}>
                Timesheet
            </Typography>
            
            {isPunchedOut ? (
                <Typography variant="body1" sx={{ my: 2, color: 'green' }}>
                    Total Work Time: {formatTotalWorkTime(totalWorkTime)} / 8 hrs
                </Typography>
            ) : (
                <Typography>
                    Current session: {formatTotalWorkTime(workTime)} / 8 hrs
                </Typography>
            )}
            <Typography variant="h4" sx={{ my: 2, textAlign: 'center' }}>
                {`${time.hours}:${time.minutes}:${time.seconds} ${time.period}`}
            </Typography>
            <Clock time={time} isDarkMode={isDarkMode} />

            <Modal
                open={isPopperOpen}
                onClose={() => setIsPopperOpen(false)}
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: '50vh',
                    width: '50vw',
                    backdropFilter: 'blur(10px)',
                    WebkitBackdropFilter: 'blur(10px)',
                    
                }}
            >
                <Fade in={isPopperOpen} timeout={350}>
                    <Paper 
                        sx={{ 
                            p: 4,
                            bgcolor: popperColor === 'success' 
                                ? 'success.light'
                                : popperColor === 'info'
                                ? 'info.light'
                                : 'primary.light',
                            color: 'white',
                            borderRadius: 2,
                            maxWidth: '90vw',
                            textAlign: 'center'
                        }}
                    >
                        <Typography variant="h4">{popperMessage}</Typography>
                    </Paper>
                </Fade>
            </Modal>

            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
                {!isTimerRunning ? (
                    <Button 
                        variant="contained" 
                        color="primary" 
                        onClick={punchIn}
                        sx={{ position: 'static' }}
                    >
                        Punch In
                    </Button>
                ) : (
                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
                        {isOnBreak ? (
                            <Button 
                                variant="contained" 
                                color="success" 
                                onClick={breakOut}
                                sx={{ position: 'static' }}
                            >
                                Break Out
                            </Button>
                        ) : isOnLunch ? (
                            <Button 
                                variant="contained" 
                                color="secondary" 
                                onClick={lunchOut}
                                sx={{ position: 'static' }}
                            >
                                Lunch Out
                            </Button>
                        ) : (
                            <>
                                <Button 
                                    variant="contained" 
                                    color="primary" 
                                    onClick={punchOut}
                                    sx={{ position: 'static' }}
                                >
                                    Punch Out
                                </Button>
                                <Box sx={{ display: 'flex', gap: 2 }}>
                                    <Button 
                                        variant="contained" 
                                        color="secondary" 
                                        onClick={lunchIn}
                                        sx={{ position: 'static' }}
                                    >
                                        Lunch In
                                    </Button>
                                    <Button 
                                        variant="contained" 
                                        color="success" 
                                        onClick={breakIn}
                                        sx={{ position: 'static' }}
                                    >
                                        Break In
                                    </Button>
                                </Box>
                            </>
                        )}
                    </Box>
                )}
            </Box>
        </Box>
    );
};

export default Timesheet;

