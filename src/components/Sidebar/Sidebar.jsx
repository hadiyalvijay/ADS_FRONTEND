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

const Sidebar = ({ open, onClose, toggleScroll }) => {
    const { isDarkMode } = useTheme();
    const sidebarRef = useRef(null);
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [showChildren, setShowChildren] = useState(false);
    const isMobile = useMediaQuery('(max-width: 768px)');

    const handleItemClick = (item) => {
        console.log(`${item} clicked`);
    };

    const toggleEmployeeChildren = () => {
        setShowChildren((prev) => !prev);
    };

    // Collapse sidebar automatically on mobile devices
    useEffect(() => {
        if (isMobile) {
            setIsCollapsed(true);
        }
    }, [isMobile]);

    return (
        <Box
            ref={sidebarRef}
            sx={{
                width: isCollapsed ? '90px' : '240px',
                height: '100vh',
                bgcolor: isDarkMode ? '#2a2b40' : '#fff',
                color: isDarkMode ? '#fff' : '#000',
                position: 'fixed',
                left: 0,
                top: 0,
                transition: 'width 0.3s ease',
                zIndex: 1000,
                '&:hover': {
                    width: isMobile ? '90px' : '240px',
                    '& .MuiListItemText-root, & .adsh-title': {
                        opacity: isMobile ? 0 : 1,
                    },
                    '& .toggle-button': {
                        opacity: isMobile ? 0 : 1,
                    },
                },
            }}
        >
            <Box role="presentation">
                <Box display={'flex'} justifyContent={'left'} alignItems={'center'}>
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
                            display: isMobile ? 'none' : 'block', // Hide title on mobile
                        }}
                    >
                        ADSHR
                    </Typography>

                    <IconButton
                        className="toggle-button"
                        onClick={() => {
                            setIsCollapsed((prev) => !prev);
                            toggleScroll('left'); // Trigger scroll effect to left
                            onClose(); // Close sidebar when toggling
                        }}
                        sx={{
                            border: '8px solid',
                            height: '50px',
                            width: '50px',
                            borderColor: isDarkMode ? '#232333' : '#f6f5fa',
                            borderRadius: '50%',
                            bgcolor: isDarkMode ? '#8000ff' : '#8000ff',
                            '&:hover': {
                                bgcolor: isDarkMode ? '#8000ff' : '#8000ff',
                            },
                            opacity: isCollapsed ? 0 : 1,
                        }}
                    >
                        {isCollapsed ? <ChevronRight /> : <ChevronLeft />}
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
                                onClick={() => {
                                    if (item === 'Employee') {
                                        toggleEmployeeChildren();
                                    } else {
                                        handleItemClick(item);
                                    }
                                }}
                            >
                                <ListItemIcon sx={{ justifyContent: 'center', color: isDarkMode ? '#c4bdd9' : '#67798f' }}>
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
                            {item === 'Employee' && showChildren && !isCollapsed && (
                                <>
                                    {['Employee', 'Attendance'].map((childItem, idx) => (
                                        <ListItem
                                            key={idx}
                                            button
                                            sx={{
                                                pl: 4,
                                                color: isDarkMode ? '#9b94b0' : '#67798f',
                                                '&:hover': {
                                                    bgcolor: isDarkMode ? '#3e3e52' : '#f5f5f5',
                                                },
                                            }}
                                            onClick={() => handleItemClick(childItem)}
                                        >
                                            <ListItemIcon sx={{ justifyContent: 'center', color: isDarkMode ? '#9b94b0' : '#67798f' }}>
                                                <FiberManualRecordIcon fontSize="small" />
                                            </ListItemIcon>
                                            <ListItemText
                                                primary={childItem}
                                                sx={{
                                                    opacity: isCollapsed ? 0 : 1,
                                                    transition: 'opacity 0.3s ease',
                                                }}
                                            />
                                        </ListItem>
                                    ))}
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
    toggleScroll: PropTypes.func.isRequired, // Add toggleScroll as a prop
};

export default Sidebar;
