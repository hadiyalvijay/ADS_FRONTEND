import React, { useRef, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  Box,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
  IconButton,
  useMediaQuery,
} from '@mui/material';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import PersonIcon from '@mui/icons-material/Person';
import GridIcon from '@mui/icons-material/GridView';
import ChevronLeft from '@mui/icons-material/ChevronLeft';
import ChevronRight from '@mui/icons-material/ChevronRight';
import { useTheme } from '../ThemeContext'; // Adjust path as necessary
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const Sidebar = ({ open, onClose, toggleScroll }) => {
  const { isDarkMode } = useTheme();
  const sidebarRef = useRef(null);
  const navigate = useNavigate();
  const [isRotated, setIsRotated] = useState(false);




  const [isCollapsed, setIsCollapsed] = useState(localStorage.getItem('sidebarCollapsed') === 'true');
  const [showEmployeeChildren, setShowEmployeeChildren] = useState(false); // For toggling employee subitems
  const isMobile = useMediaQuery('(max-width: 768px)');

  // Collapse sidebar automatically on mobile devices
  useEffect(() => {
    if (isMobile) {
      setIsCollapsed(true);
    }
  }, [isMobile]);

  // Store sidebar collapse state in localStorage
  useEffect(() => {
    localStorage.setItem('sidebarCollapsed', isCollapsed);
  }, [isCollapsed]);

  const handleItemClick = (item) => {
    if (item === 'Employee') {
      setShowEmployeeChildren((prev) => !prev);
    } else if (item === 'Dashboard') {
      navigate('/Dashboard'); // Navigate to Dashboard page (MainContent)
    }
  };

  const handleSubItemClick = (item) => {
    if (item === 'Employee') {
      navigate('/Employee/EmployeeList');
    } else if (item === 'Attendance') {
      navigate('/Employee/Attendance');
    }
  };

  const handleSidebarToggle = () => {
    setIsRotated((prev) => !prev); // Toggle rotation state
    setIsCollapsed((prev) => {
      const newCollapsedState = !prev;
      if (newCollapsedState) {
        setShowEmployeeChildren(false);
      }
      return newCollapsedState;
    });
    toggleScroll('left');
    onClose();
  };

  return (
    <Box
      ref={sidebarRef}
      sx={{
        width: isCollapsed ? '80px' : '240px',
        height: '100vh',
        bgcolor: isDarkMode ? '#2a2b40' : '#ffffff',
        color: isDarkMode ? '#fff' : '#566a7f',
        left: 0,
        top: 0,
        transition: 'width 0.3s ease',
        zIndex: 1200,
        '&:hover': {
          width: isMobile ? '90px' : '240px',
          '& .MuiListItemText-root, & .adsh-title': {
            opacity: isMobile ? 0 : 1,
          },
          '& .toggle-button': {
            opacity: isMobile ? 0 : 1,
          },
        },
        boxShadow: isDarkMode ? '' : '1px 0 8px rgba(0, 0, 0, 0.1)',
      }}
    >
      <Box role="presentation">
        <Box display={'flex'} justifyContent={'left'} alignItems={'center'} marginTop={'17px'}>
          <img
            src="https://adsdesk.adscodegensolutions.com/ads/photos/ads_logo_only.png"
            alt="Logo"
            style={{
              width: '100%',
              maxWidth: '100px',
              height: 'auto',
              transition: 'transform 0.3s ease',
              cursor: 'pointer',
              display: 'block',
              margin: '0 auto',
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.transform = 'scale(1.1)';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform = 'scale(1)';
            }}
          />

          <Typography
            variant="h5"
            className="adsh-title"
            sx={{
              margin: '15px',
              mb: 2,
              color: isDarkMode ? '#cfc8e3' : '#536880',
              opacity: isCollapsed ? 0 : 1,
              transition: 'opacity 0.3s ease',
              display: isMobile ? 'none' : 'block',
              fontWeight: "bold",
            }}
          >
            ADSHR
          </Typography>

          <IconButton
            className="toggle-button"
            onClick={handleSidebarToggle}
            sx={{
              marginLeft: 0.3,
              border: '7px solid',
              height: '40px',
              width: '40px',
              borderColor: isDarkMode ? '#232333' : '#f6f5fa',
              borderRadius: '50%',
              bgcolor: isDarkMode ? '#696cff' : '#696cff',
              transition: 'transform 0.3s ease',
              transform: isRotated ? 'rotate(180deg)' : 'rotate(0deg)',
              '&:hover': {
                bgcolor: isDarkMode ? '#696cff' : '#696cff',
              },
              opacity: isCollapsed ? 0 : 1,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color:"#fff",
                transition: 'margin-left 0.3s ease',
                transform: isRotated ? 'rotate(180deg)' : 'rotate(0deg)', 
              }}
            >
              {isCollapsed ? <ChevronRight /> : <ChevronLeft />}
            </Box>
          </IconButton>

        </Box>

        <List sx={{ cursor: 'pointer' }}>
          {['Dashboard', 'Employee'].map((item, index) => (
            <React.Fragment key={index}>
              <ListItem
                button
                sx={{
                  '&:hover': {
                    bgcolor: isDarkMode ? '#3e3e52' : '#f5f5f5',
                  },
                }}
                onClick={() => handleItemClick(item)}
              >
                <ListItemIcon sx={{ marginLeft: '10px', color: isDarkMode ? '#c4bdd9' : '#67798f' }}>
                  {item === 'Dashboard' && <GridIcon />}
                  {item === 'Employee' && <PersonIcon />}
                </ListItemIcon>
                <ListItemText
                  primary={item}
                  sx={{
                    opacity: isCollapsed ? 0 : 1,
                    transition: 'opacity 0.3s ease',
                    color: isDarkMode ? '#c4bdd9' : '#67798f',
                  }}
                />
              </ListItem>

              {item === 'Employee' && showEmployeeChildren && (
                <>
                  {/* Only show subitems if sidebar is expanded */}
                  <ListItem button sx={{ paddingLeft: '50px' }} onClick={() => handleSubItemClick('Employee')}>
                    <ListItemIcon sx={{ color: isDarkMode ? '#c4bdd9' : '#67798f' }}>
                      <FiberManualRecordIcon sx={{ fontSize: '10px' }} />
                    </ListItemIcon>
                    <ListItemText primary="Employee" sx={{ color: isDarkMode ? '#c4bdd9' : '#67798f' }} />
                  </ListItem>
                  <ListItem button sx={{ paddingLeft: '50px' }} onClick={() => handleSubItemClick('Attendance')}>
                    <ListItemIcon sx={{ color: isDarkMode ? '#c4bdd9' : '#67798f' }}>
                      <FiberManualRecordIcon sx={{ fontSize: '10px' }} />
                    </ListItemIcon>
                    <ListItemText primary="Attendance" sx={{ color: isDarkMode ? '#c4bdd9' : '#67798f' }} />
                  </ListItem>
                </>
              )}
            </React.Fragment>
          ))}
        </List>
      </Box>
    </Box>
  );
};

Sidebar.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  toggleScroll: PropTypes.func.isRequired,
};

export default Sidebar;
