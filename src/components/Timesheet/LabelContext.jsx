import React, { useState, useEffect, useCallback } from 'react';
import { Clock } from 'lucide-react';

const Timesheet = () => {
  const [timeState, setTimeState] = useState({
    hours: '00',
    minutes: '00',
    seconds: '00',
    period: 'AM'
  });
  const [workStatus, setWorkStatus] = useState({
    isTimerRunning: false,
    startTime: null,
    isOnLunch: false,
    isOnBreak: false,
    workTime: 0,
    lunchTime: 0,
    breakTime: 0,
    totalWorkTime: 0,
    isPunchedOut: false
  });
  const [notification, setNotification] = useState({ message: '', type: '' });

  const API_URL = 'http://localhost:5000/api/timesheet';

  // API call wrapper with authentication
  const apiCall = async (endpoint, method = 'GET', body = null) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_URL}${endpoint}`, {
        method,
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: body ? JSON.stringify(body) : null
      });
      
      if (!response.ok) throw new Error('API request failed');
      return await response.json();
    } catch (error) {
      showNotification(error.message, 'error');
      throw error;
    }
  };

  const showNotification = (message, type = 'success') => {
    setNotification({ message, type });
    setTimeout(() => setNotification({ message: '', type: '' }), 3000);
  };

  // Fetch current timesheet on component mount
  useEffect(() => {
    const fetchTimesheet = async () => {
      try {
        const data = await apiCall('/current');
        if (data?._id) {
          setWorkStatus(prev => ({
            ...prev,
            isTimerRunning: true,
            startTime: new Date(data.startTime).getTime(),
            isOnLunch: data.status === 'ON_LUNCH',
            isOnBreak: data.status === 'ON_BREAK',
            workTime: data.workTime,
            lunchTime: data.lunchTime,
            breakTime: data.breakTime
          }));
        }
      } catch (error) {
        console.error('Error fetching timesheet:', error);
      }
    };
    fetchTimesheet();
  }, []);

  // Timer effect
  useEffect(() => {
    let intervalId;
    if (workStatus.isTimerRunning && workStatus.startTime) {
      intervalId = setInterval(() => {
        const now = new Date();
        const elapsed = Math.floor((now - workStatus.startTime) / 1000);
        
        setTimeState({
          hours: String(Math.floor(elapsed / 3600)).padStart(2, '0'),
          minutes: String(Math.floor((elapsed % 3600) / 60)).padStart(2, '0'),
          seconds: String(elapsed % 60).padStart(2, '0'),
          period: now.getHours() >= 12 ? 'PM' : 'AM'
        });
      }, 1000);
    }
    return () => clearInterval(intervalId);
  }, [workStatus.isTimerRunning, workStatus.startTime]);

  // Action handlers
  const handlePunchIn = async () => {
    try {
      const data = await apiCall('/punch-in', 'POST');
      setWorkStatus(prev => ({
        ...prev,
        isTimerRunning: true,
        startTime: new Date(data.startTime).getTime()
      }));
      showNotification('Punched in successfully!');
    } catch (error) {
      console.error('Punch in failed:', error);
    }
  };

  const handlePunchOut = async () => {
    try {
      const data = await apiCall('/punch-out', 'POST');
      setWorkStatus(prev => ({
        ...prev,
        isTimerRunning: false,
        totalWorkTime: data.totalWorkTime,
        isPunchedOut: true
      }));
      showNotification('Punched out successfully!');
    } catch (error) {
      console.error('Punch out failed:', error);
    }
  };

  const handleBreak = async (type) => {
    try {
      const endpoint = workStatus.isOnBreak ? '/break-out' : '/break-in';
      const data = await apiCall(endpoint, 'POST');
      setWorkStatus(prev => ({
        ...prev,
        isOnBreak: !prev.isOnBreak,
        breakTime: data.breakTime,
        startTime: new Date(data.startTime).getTime()
      }));
      showNotification(`Break ${workStatus.isOnBreak ? 'ended' : 'started'}!`);
    } catch (error) {
      console.error('Break action failed:', error);
    }
  };

  const handleLunch = async () => {
    try {
      const endpoint = workStatus.isOnLunch ? '/lunch-out' : '/lunch-in';
      const data = await apiCall(endpoint, 'POST');
      setWorkStatus(prev => ({
        ...prev,
        isOnLunch: !prev.isOnLunch,
        lunchTime: data.lunchTime,
        startTime: new Date(data.startTime).getTime()
      }));
      showNotification(`Lunch ${workStatus.isOnLunch ? 'ended' : 'started'}!`);
    } catch (error) {
      console.error('Lunch action failed:', error);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Timesheet</h2>
        <Clock className="w-6 h-6 text-gray-600 dark:text-gray-300" />
      </div>

      <div className="text-center mb-8">
        <div className="text-4xl font-bold text-gray-800 dark:text-white mb-2">
          {`${timeState.hours}:${timeState.minutes}:${timeState.seconds} ${timeState.period}`}
        </div>
        <div className="text-sm text-gray-600 dark:text-gray-400">
          {workStatus.isPunchedOut 
            ? `Total Work Time: ${formatTime(workStatus.totalWorkTime)} / 8hrs`
            : `Current Session: ${formatTime(workStatus.workTime)} / 8hrs`}
        </div>
      </div>

      <div className="flex justify-center gap-4 mb-6">
        {!workStatus.isTimerRunning ? (
          <button
            onClick={handlePunchIn}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Punch In
          </button>
        ) : (
          <div className="flex flex-col gap-4">
            {workStatus.isOnBreak ? (
              <button
                onClick={handleBreak}
                className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                End Break
              </button>
            ) : workStatus.isOnLunch ? (
              <button
                onClick={handleLunch}
                className="px-6 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition-colors"
              >
                End Lunch
              </button>
            ) : (
              <>
                <button
                  onClick={handlePunchOut}
                  className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                >
                  Punch Out
                </button>
                <div className="flex gap-4">
                  <button
                    onClick={handleLunch}
                    className="px-6 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition-colors"
                  >
                    Start Lunch
                  </button>
                  <button
                    onClick={handleBreak}
                    className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                  >
                    Take Break
                  </button>
                </div>
              </>
            )}
          </div>
        )}
      </div>

      {notification.message && (
        <div className={`fixed top-4 right-4 p-4 rounded-lg shadow-lg ${
          notification.type === 'error' ? 'bg-red-500' : 'bg-green-500'
        } text-white`}>
          {notification.message}
        </div>
      )}
    </div>
  );
};

const formatTime = (seconds) => {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;
  return `${hours}h ${minutes}m ${secs}s`;
};

export default Timesheet;