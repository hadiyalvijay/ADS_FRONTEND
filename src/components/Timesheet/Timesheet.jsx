// Timesheet.js
import React, { useEffect, useState } from 'react';
import { Box, Typography } from '@mui/material';
import { useTheme } from '../ThemeContext';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Clock from './Clock';
import ActionButtons from './ActionButtons';

const Timesheet = ({labels,getTimeValue,handleToggle}) => {
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
    const [activeState, setActiveState] = useState("in");

    useEffect(() => {
        // Loading saved times from localStorage
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

    // Time update logic
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
        setActiveState("in");
    };

    const lunchIn = () => {
        if (isTimerRunning) {
            setIsOnLunch(true);
            const elapsedTime = Math.floor((Date.now() - startTime) / 1000);
            setWorkTime(prev => prev + elapsedTime);
            setStartTime(Date.now());
            toast.info('Lunch In Successfully!');
        }
    };

    const lunchOut = () => {
        if (isOnLunch) {
            const elapsedLunchTime = Math.floor((Date.now() - startTime) / 1000);
            setLunchTime(prev => prev + elapsedLunchTime);
            setIsOnLunch(false);
            setStartTime(Date.now());
            toast.success('Lunch break ended!');
        }
    };

    const breakIn = () => {
        if (isTimerRunning) {
            setIsOnBreak(true);
            const elapsedTime = Math.floor((Date.now() - startTime) / 1000);
            setWorkTime(prev => prev + elapsedTime);
            setStartTime(Date.now());
            toast.info('On break!');
        }
    };

    const breakOut = () => {
        if (isOnBreak) {
            const elapsedBreakTime = Math.floor((Date.now() - startTime) / 1000);
            setBreakTime(prev => prev + elapsedBreakTime);
            setIsOnBreak(false);
            setStartTime(Date.now());
            toast.success('Break ended!');
        }
    };

    const punchOut = () => {
        setIsTimerRunning(false);
        const totalSecondsWorked = workTime + lunchTime + breakTime; 
        const actualWorkTime = workTime; // Total work time is now just work time
        setTotalWorkTime(actualWorkTime); // Store the actual work time
        setIsPunchedOut(true); // Mark that the user has punched out
        localStorage.setItem('workTime', actualWorkTime); // Save work time
        localStorage.setItem('lunchTime', lunchTime); // Save lunch time
        localStorage.setItem('breakTime', breakTime); // Save break time
        localStorage.setItem('totalWorkTime', totalSecondsWorked); // Save total work time
        localStorage.removeItem('startTime');
        setActiveState("out");
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
                color: isDarkMode ? '#fff' : '#000',
                borderRadius: 1,
                p: 3,
                height:'365px'
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
                <Typography>Current session: {formatTotalWorkTime(workTime)} / 8 hrs</Typography>
            )}
            <Typography variant="h4" sx={{ my: 2, textAlign: 'center' }}>
                {`${time.hours}:${time.minutes}:${time.seconds} ${time.period}`} 
            </Typography>
            <Clock time={time} isDarkMode={isDarkMode} />
            <ActionButtons
                isTimerRunning={isTimerRunning}
                isOnBreak={isOnBreak}
                isOnLunch={isOnLunch}
                punchIn={punchIn}
                lunchIn={lunchIn}
                lunchOut={lunchOut}
                breakIn={breakIn}
                breakOut={breakOut}
                punchOut={punchOut}
                activeState={activeState}
                setActiveState={setActiveState}
                workTime={workTime} // Pass work time to the component if needed
            />
            <ToastContainer />
        </Box>
    );
};

export default Timesheet;
