import React, { useState } from 'react';
import { Grid, Paper } from '@mui/material';
import ActivityTimeline from '../ActivityTimeline/ActivityTimeline';
import Timesheet from '../Timesheet/Timesheet';
import Statistics from '../Statistics/Statistics';
import { useTheme } from '../ThemeContext';

const MainContent = ({ sidebarOpen }) => {
  const { isDarkMode } = useTheme();

  // Lifted state for activity log
  const [activityLog, setActivityLog] = useState([]);
  // Lifted state for time tracking
  const [workTime, setWorkTime] = useState(0);
  const [lunchTime, setLunchTime] = useState(0);
  const [breakTime, setBreakTime] = useState(0);
  const [totalWorkTime, setTotalWorkTime] = useState(0);

  const logActivity = (action) => {
    const timestamp = new Date().toLocaleTimeString();
    setActivityLog((prevLog) => [
      ...prevLog,
      { time: timestamp, description: action },  // Add both time and action
    ]);
  };

  return (
    <>
      <Grid
        container
        spacing={2}
        justifyContent="space-between"
        alignItems="stretch"
        sx={{
          // marginLeft: sidebarOpen ? '200px' : '90px',
          transition: 'all 0.3s ease-in-out',
          color: isDarkMode ? '#c7c7df' : '#566a7f',
        }}
        
      >
        <Grid item xs={12} sm={6} md={4}>
          <Paper
            elevation={3}
            sx={{
              bgcolor: isDarkMode ? '#2a2b40' : '#fff',
              color: isDarkMode ? '#c7c7df' : '#566a7f',
            }}
          >
            <Timesheet
              setActivityLog={setActivityLog}
              logActivity={logActivity}
              activityLog={activityLog}
              setWorkTime={setWorkTime}
              setLunchTime={setLunchTime}
              setBreakTime={setBreakTime}
              setTotalWorkTime={setTotalWorkTime}
            />
          </Paper>
        </Grid>

        {/* Statistics Component */}
        <Grid item xs={12} sm={6} md={4}>
          <Paper
            elevation={3}
            sx={{
              bgcolor: isDarkMode ? '#2a2b40' : '#fff',
              color: isDarkMode ? '#c7c7df' : '#566a7f',
            }}
          >
            <Statistics
              statsData={[
                { label: 'Work Time', value: `${Math.floor(workTime / 3600)}h ${Math.floor((workTime % 3600) / 60)}m`, progress: (workTime / 28800) * 100, color: 'primary' },
                { label: 'Lunch Time', value: `${Math.floor(lunchTime / 3600)}h ${Math.floor((lunchTime % 3600) / 60)}m`, progress: (lunchTime / 3600) * 100, color: 'secondary' },
                { label: 'Break Time', value: `${Math.floor(breakTime / 3600)}h ${Math.floor((breakTime % 3600) / 60)}m`, progress: (breakTime / 3600) * 100, color: 'success' },
                { label: 'Total Work Time', value: `${Math.floor(totalWorkTime / 3600)}h ${Math.floor((totalWorkTime % 3600) / 60)}m`, progress: (totalWorkTime / 28800) * 100, color: 'primary' },
              ]}
            />
          </Paper>
        </Grid>

        {/* ActivityTimeline Component */}
        <Grid item xs={12} sm={6} md={4}>
          <Paper
            elevation={3}
            sx={{
              bgcolor: isDarkMode ? '#2a2b40' : '#fff',
              color: isDarkMode ? '#c7c7df' : '#566a7f',
            }}
          >
            <ActivityTimeline activityLog={activityLog} />
          </Paper>
        </Grid>
      </Grid>
    </>
  );
};

export default MainContent;
