// ActionButtons.js
import React from 'react';
import { Box, Button } from '@mui/material';

const ActionButtons = ({ isTimerRunning, isOnBreak, isOnLunch, punchIn, lunchIn, lunchOut, breakIn, breakOut, punchOut }) => {
    return (
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
    );
};

export default ActionButtons;
