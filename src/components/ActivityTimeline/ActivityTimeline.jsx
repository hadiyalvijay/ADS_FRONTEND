import React from 'react';
import { List, ListItem, Box, Typography } from '@mui/material';
import { useTheme } from '../ThemeContext';

const ActivityTimeline = ({ activityLog }) => {
  const { isDarkMode } = useTheme();

 
  const getDynamicColor = (index, isBorder = false) => {
    const hue = (index * 60) % 360; 
    const saturation = 50 + (index * 10) % 50;
    const lightness = isBorder ? 80 : 50; 
    return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
  };

 
  const hslToRgba = (hsl, opacity) => {
    const [hue, saturation, lightness] = hsl.match(/\d+/g).map(Number);
    const c = (1 - Math.abs(2 * lightness / 100 - 1)) * (saturation / 100);
    const x = c * (1 - Math.abs(((hue / 60) % 2) - 1));
    const m = lightness / 100 - c / 2;

    let r = 0, g = 0, b = 0;
    if (hue >= 0 && hue < 60) {
      r = c; g = x; b = 0;
    } else if (hue >= 60 && hue < 120) {
      r = x; g = c; b = 0;
    } else if (hue >= 120 && hue < 180) {
      r = 0; g = c; b = x;
    } else if (hue >= 180 && hue < 240) {
      r = 0; g = x; b = c;
    } else if (hue >= 240 && hue < 300) {
      r = x; g = 0; b = c;
    } else {
      r = c; g = 0; b = x;
    }

    r = Math.round((r + m) * 255);
    g = Math.round((g + m) * 255);
    b = Math.round((b + m) * 255);

    return `rgba(${r}, ${g}, ${b}, ${opacity})`;
  };

  return (
    <Box
      sx={{
        padding: 2,
        bgcolor: isDarkMode ? '#2a2b40' : '#fefeff',
        borderRadius: 3,
        height: '460px',
        overflowY: 'auto',
      }}
    >
      <Typography
        variant="h6"
        sx={{
          marginBottom: 2,
          fontWeight: 'bold',
          fontSize: '1.5rem',
        }}
      >
        Activity Timeline
      </Typography>
      <List>
        {activityLog.length > 0 ? (
          activityLog.map((activity, index) => {
            const iconColorHSL = getDynamicColor(index);
            const borderColorRGBA = hslToRgba(iconColorHSL, 0.5);

            return (
              <div key={index}>
                <ListItem
                  sx={{
                    borderRadius: 1,
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}
                >
                  <div style={{ position: 'relative', marginRight: '20px' }}>
                    <div
                      style={{
                        marginTop: '4px',
                        fontSize: 15,
                        backgroundColor: iconColorHSL,
                        borderRadius: '50%',
                        width: '12px',
                        height: '12px',
                        boxShadow: `0 0 10px 4px ${borderColorRGBA}`,
                      }}
                    />
                    {index < activityLog.length - 1 && (
                      <div
                        style={{
                          top: '23px',
                          position: 'absolute',
                          left: '50%',
                          transform: 'translateX(-50%)',
                          width: '1px',
                          height: '35px',
                          backgroundColor: 'lightblue',
                        }}
                      />
                    )}
                  </div>

                  
                  <Typography
                    sx={{
                      color: isDarkMode ? '#c7c7df' : '#566a7f',
                      flexGrow: 1,
                      margin: '10px',
                      fontSize: '1rem',
                    }}
                  >
                    {activity.description}
                  </Typography>

                 
                  <Typography
                    sx={{
                      color: isDarkMode ? '#a1a1c7' : '#8792a0',
                      fontSize: '13px',
                      gap: '50px',
                    }}
                  >
                    {activity.time}
                  </Typography>
                </ListItem>
              </div>
            );
          })
        ) : (
          <Typography
            sx={{
              textAlign: 'center',
              fontStyle: 'italic',
              marginTop: 2,
              color: isDarkMode ? '#c7c7df' : '#566a7f',
            }}
          >
            No activities logged yet.
          </Typography>
        )}
      </List>
    </Box>
  );
};

export default ActivityTimeline;