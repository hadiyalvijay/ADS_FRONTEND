import React, { useEffect, useState } from 'react';
import { Box, Typography, Button, Grid } from '@mui/material';
import { useTheme } from '../ThemeContext';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
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

    const punchIn = () => {
        setIsTimerRunning(true);
        const now = Date.now();
        setStartTime(now);
        setCurrentActivity('Punch In');
        toast.success("Punch In Successfully!");
        localStorage.setItem('startTime', now);
        logActivity('Punch In');
    };

    const lunchIn = () => {
        if (isTimerRunning) {
            setIsOnLunch(true);
            const elapsedTime = Math.floor((Date.now() - startTime) / 1000);
            setWorkTime(prev => prev + elapsedTime);
            setStartTime(Date.now());
            toast.info('Lunch In Successfully!');
            logActivity('Lunch In');
        }
    };

    const lunchOut = () => {
        if (isOnLunch) {
            const elapsedLunchTime = Math.floor((Date.now() - startTime) / 1000);
            setLunchTime(prev => prev + elapsedLunchTime);
            setIsOnLunch(false);
            setStartTime(Date.now());
            toast.success('Lunch break ended!');
            logActivity('Lunch Out');
        }
    };

    const breakIn = () => {
        if (isTimerRunning) {
            setIsOnBreak(true);
            const elapsedTime = Math.floor((Date.now() - startTime) / 1000);
            setWorkTime(prev => prev + elapsedTime);
            setStartTime(Date.now());
            toast.info('On break!');
            logActivity('Break In');
        }
    };

    const breakOut = () => {
        if (isOnBreak) {
            const elapsedBreakTime = Math.floor((Date.now() - startTime) / 1000);
            setBreakTime(prev => prev + elapsedBreakTime);
            setIsOnBreak(false);
            setStartTime(Date.now());
            toast.success('Break ended!');
            logActivity('Break Out');
        }
    };

    const punchOut = () => {
        setIsTimerRunning(false);
        const totalSecondsWorked = workTime + lunchTime + breakTime;
        const actualWorkTime = workTime;
        setTotalWorkTime(actualWorkTime);
        setIsPunchedOut(true);
        localStorage.setItem('workTime', actualWorkTime); // Save work time
        localStorage.setItem('lunchTime', lunchTime); // Save lunch time
        localStorage.setItem('breakTime', breakTime); // Save break time
        localStorage.setItem('totalWorkTime', totalSecondsWorked); // Save total work time
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
            sx={{
                bgcolor: isDarkMode ? '#2a2b40' : '#fff',
                color: isDarkMode ? '#c7c7df' : '#566a7f',
                borderRadius: 1,
                p: 5,
                height: { xs: 'auto', sm: '460px' },
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
            <ToastContainer />

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
                                        <Box>
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
        </Box>
    );
};

export default Timesheet;

