import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
    Box,
    Drawer,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Typography,
    IconButton,
    Collapse,
} from '@mui/material';
import LayersIcon from '@mui/icons-material/Layers';
import DescriptionIcon from '@mui/icons-material/Description';
import MenuIcon from '@mui/icons-material/Menu';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import PersonIcon from '@mui/icons-material/Person';
import AssessmentIcon from '@mui/icons-material/Assessment';
import GridIcon from '@mui/icons-material/GridView';
import { useTheme } from '../ThemeContext';

const Sidebar = ({ open, onClose }) => {
    const { isDarkMode } = useTheme();
    const [isCollapsed, setIsCollapsed] = useState(false);
    const sidebarRef = useRef(null);
    const toggleButtonRef = useRef(null);
    const [isEmployeeOpen, setIsEmployeeOpen] = useState(false);
    const [isReportsOpen, setIsReportsOpen] = useState(false);

    const toggleCollapse = () => {
        setIsCollapsed((prev) => !prev);
    };

    const toggleEmployeeList = () => {
        setIsEmployeeOpen((prev) => !prev);
    };

    const toggleReportsList = () => {
        setIsReportsOpen((prev) => !prev);
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                sidebarRef.current && !sidebarRef.current.contains(event.target) &&
                toggleButtonRef.current && !toggleButtonRef.current.contains(event.target)
            ) {
                onClose(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [onClose]);

    return (
        <Drawer
            anchor="left"
            variant="temporary"
            open={open}
            onClose={onClose}
            disableScrollLock
            ModalProps={{
                onBackdropClick: onClose,
                disableEnforceFocus: true,
            }}
            // BackdropProps={{
            //     sx: {
            //         backgroundColor: 'transparent',
            //     },
            // }}
            sx={{
                '& .MuiDrawer-paper': {
                    boxSizing: 'border-box',
                    bgcolor: isCollapsed ? 'transparent' : (isDarkMode ? '#232333' : '#fff'), // Change here
                    color: isDarkMode ? '#fff' : '#000',
                    width: isCollapsed ? 80 : 240,
                    transition: 'width 0.3s ease',
                    overflow: 'hidden',
                },
            }}
            ref={sidebarRef}
        >
            <Box
                sx={{
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    height: '100%',
                    transition: 'opacity 0.3s ease',
                    opacity: isCollapsed ? 0.5 : 1,
                }}
                role="presentation"
            >
                <Box display={'flex'} justifyContent={'space-between'} alignItems={'center'}>
                    <img
                        src="https://adsdesk.adscodegensolutions.com/ads/photos/ads_logo_only.png"
                        alt="Logo"
                        style={{
                            width: isCollapsed ? '40px' : '60px',
                            height: 'auto',
                            transition: 'width 0.3s ease',
                        }}
                    />
                    <Typography variant="h5" sx={{ mb: 2, visibility: isCollapsed ? 'hidden' : 'visible' }}>
                        ADS
                    </Typography>
                    <Box
                        sx={{
                            position: 'absolute',
                            left: isCollapsed ? 'calc(80% - 28px)' : 'calc(240px - 28px)',
                            transition: 'left 0.3s ease',
                        }}
                        ref={toggleButtonRef} 
                    >
                        <IconButton onClick={toggleCollapse}>
                            {isCollapsed ? <ArrowForwardIosIcon /> : <ArrowBackIosIcon />}
                        </IconButton>
                    </Box>
                </Box>

                <List>
                    <ListItem button onClick={toggleEmployeeList} sx={{ justifyContent: 'center' }}>
                        <ListItemIcon sx={{ justifyContent: 'center' }}>
                            <LayersIcon />
                        </ListItemIcon>
                        <ListItemText primary={isCollapsed ? '' : 'Employee'} sx={{ textAlign: 'center' }} />
                    </ListItem>
                    <Collapse in={isEmployeeOpen} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding>
                            <ListItem button sx={{ pl: 4, justifyContent: 'center' }}>
                                <ListItemIcon sx={{ justifyContent: 'center' }}>
                                    <DescriptionIcon />
                                </ListItemIcon>
                                <ListItemText primary={isCollapsed ? '' : 'Attendance'} sx={{ textAlign: 'center' }} />
                            </ListItem>
                        </List>
                    </Collapse>

                    <ListItem button onClick={toggleReportsList} sx={{ justifyContent: 'center' }}>
                        <ListItemIcon sx={{ justifyContent: 'center' }}>
                            <AssessmentIcon />
                        </ListItemIcon>
                        <ListItemText primary={isCollapsed ? '' : 'Reports'} sx={{ textAlign: 'center' }} />
                    </ListItem>
                    <Collapse in={isReportsOpen} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding>
                            <ListItem button sx={{ pl: 4, justifyContent: 'center' }}>
                                <ListItemIcon sx={{ justifyContent: 'center' }}>
                                    <PersonIcon />
                                </ListItemIcon>
                                <ListItemText primary={isCollapsed ? '' : 'User Reports'} sx={{ textAlign: 'center' }} />
                            </ListItem>
                        </List>
                    </Collapse>

                    {/* Additional menu items */}
                    <ListItem button sx={{ justifyContent: 'center' }}>
                        <ListItemIcon sx={{ justifyContent: 'center' }}>
                            <GridIcon />
                        </ListItemIcon>
                        <ListItemText primary={isCollapsed ? '' : 'Dashboard'} sx={{ textAlign: 'center' }} />
                    </ListItem>
                </List>
            </Box>
        </Drawer>
    );
};

// Define PropTypes
Sidebar.propTypes = {
    open: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
};

export default Sidebar;
