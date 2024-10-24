import React, { useRef, useState } from 'react';
import PropTypes from 'prop-types';
import {
    Box,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Typography,
    IconButton,
} from '@mui/material';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import PersonIcon from '@mui/icons-material/Person';
import GridIcon from '@mui/icons-material/GridView';
import ChevronLeft from '@mui/icons-material/ChevronLeft';
import ChevronRight from '@mui/icons-material/ChevronRight';
import { useTheme } from '../ThemeContext';

const Sidebar = ({ open, onClose }) => {
    const { isDarkMode } = useTheme();
    const sidebarRef = useRef(null);
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [showChildren, setShowChildren] = useState(false);

    const handleItemClick = (item) => {
        console.log(`${item} clicked`);
    };

    const toggleEmployeeChildren = () => {
        setShowChildren((prev) => !prev);
    };

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
                    width: '240px',
                    '& .MuiListItemText-root, & .adsh-title': {
                        opacity: 1,
                    },
                    '& .toggle-button': {
                        opacity: 1,
                    },
                },
            }}
        >
            <Box
                sx={{
                    m: 0.5,
                }}
                role="presentation"
            >
                <Box display={'flex'} justifyContent={'left'} alignItems={'center'}>
                    <img
                        src="https://adsdesk.adscodegensolutions.com/ads/photos/ads_logo_only.png"
                        alt="Logo"
                        style={{
                            width: '100%',      // Set width to 100% to fill the container
                            maxWidth: '100px',  // Limit the maximum width to 100 pixels
                            height: 'auto',     // Maintain aspect ratio
                            transition: 'transform 0.3s ease',
                            cursor: 'pointer',
                            opacity: 1,
                            display: 'block',   // Ensures no extra space at the bottom
                            margin: '0 auto',   // Center the image in its container
                        }}
                        onMouseOver={(e) => {
                            e.currentTarget.style.transform = 'scale(1.1)'; // Zoom in on hover
                        }}
                        onMouseOut={(e) => {
                            e.currentTarget.style.transform = 'scale(1)'; // Zoom out when not hovered
                        }}
                    />

                    <Typography
                        variant="h5"
                        className="adsh-title"
                        sx={{
                            margin: "15px",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            mb: 2,
                            color : isDarkMode ? '#cfc8e3':'#536880',
                            opacity: isCollapsed ? 0 : 1, // Hide title when collapsed
                            transition: 'opacity 0.3s ease',
                        }}
                    >
                        ADSHR
                    </Typography>

                    {/* Toggle Collapse/Expand IconButton */}
                    <IconButton
                        className="toggle-button"
                        onClick={() => setIsCollapsed((prev) => !prev)}
                        sx={{
                            border: '8px solid',
                            height: "50px",
                            width: "50px",
                            borderColor: isDarkMode ? '#232333' : '#f6f5fa',
                            borderRadius: '50%',
                            bgcolor: isDarkMode ? '#8000ff' : '#8000ff',
                            '&:hover': {
                                bgcolor: isDarkMode ? '#8000ff' : '#8000ff',
                            },
                            opacity: isCollapsed ? 0 : 1, // Hide button when collapsed
                        }}
                    >
                        {isCollapsed ? <ChevronRight /> : <ChevronLeft />}
                    </IconButton>
                </Box>

                {/* Render menu items */}
                <List sx={{cursor:"pointer"}}>
                    {['Dashboard', 'Employee'].map((item, index) => (
                        <React.Fragment key={index}>
                            <ListItem
                                button
                            
                                sx={{
                                   
                                    width: "100%",
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
                                <ListItemIcon sx={{ justifyContent: 'center', color: isDarkMode ? '#c4bdd9' : '#67798f' ,}}>
                                    {item === 'Dashboard' && <GridIcon />}
                                    {item === 'Employee' && <PersonIcon />}
                                </ListItemIcon>
                                <ListItemText
                                    primary={item}
                                    sx={{
                                        textAlign: 'center',
                                        width: 'auto',
                                        opacity: isCollapsed ? 0 : 1,
                                        transition: 'opacity 0.3s ease',
                                        color: isDarkMode ? '#c4bdd9' : '#67798f' 
                                    }}
                                />
                            </ListItem>
                            {/* Child items for Employee */}
                            {item === 'Employee' && showChildren && !isCollapsed && (
                                <>
                                    <ListItem
                                        button
                                        sx={{
                                            fontSize:"10px",
                                            pl: 4,
                                            color: isDarkMode ? '#9b94b0' : '#67798f' ,
                                            '&:hover': {
                                                bgcolor: isDarkMode ? '#3e3e52' : '#f5f5f5',
                                            },
                                        }}
                                        onClick={() => handleItemClick('Employee')}
                                    >
                                        <ListItemIcon sx={{ justifyContent: 'center', color: isDarkMode ? '#9b94b0' : '#67798f' }}>
                                            <FiberManualRecordIcon fontSize='10%'/>
                                        </ListItemIcon>
                                        <ListItemText
                                            primary="Employee"
                                            sx={{
                                                textAlign: 'center',
                                                
                                                width: 'auto',
                                                opacity: isCollapsed ? 0 : 1,
                                                transition: 'opacity 0.3s ease',
                                            }}
                                        />
                                    </ListItem>
                                    <ListItem
                                        button
                                        sx={{
                                            fontSize:"10px",
                                            pl: 4,
                                            color: isDarkMode ? '#9b94b0' : '#67798f' ,
                                            '&:hover': {
                                                bgcolor: isDarkMode ? '#3e3e52' : '#f5f5f5',
                                            },
                                        }}
                                        onClick={() => handleItemClick('Attendance')}
                                    >
                                        <ListItemIcon sx={{ justifyContent: 'center', color: isDarkMode ? '#9b94b0' : '#67798f' }}>
                                            <FiberManualRecordIcon fontSize='10%'/>
                                        </ListItemIcon>
                                        <ListItemText
                                            primary="Attendance"
                                            sx={{
                                                textAlign: 'center',
                                                width: 'auto',
                                                opacity: isCollapsed ? 0 : 1,
                                                transition: 'opacity 0.3s ease',
                                            }}
                                        />
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

// Define PropTypes
Sidebar.propTypes = {
    open: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
};

export default Sidebar;
