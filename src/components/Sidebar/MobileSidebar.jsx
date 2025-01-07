import React, { useState, useEffect } from 'react';
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
import { useTheme } from '../ThemeContext';
import { useNavigate } from 'react-router-dom';
import Logo from "../../img/ads.png";

const MobileSidebar = ({ open, onClose }) => {
    const { isDarkMode } = useTheme();
    const navigate = useNavigate();
    const isMobile = useMediaQuery('(max-width: 768px)');

   
    const [showEmployeeChildren, setShowEmployeeChildren] = useState(() => {
        return localStorage.getItem('showEmployeeChildren') === 'true' ? true : false;
    });

    const [isOpen, setIsOpen] = useState(() => {
        return localStorage.getItem('isOpen') === 'true' ? true : false;
    });
    useEffect(() => {
        localStorage.setItem('isOpen', isOpen);
    }, [isOpen]);
    
    useEffect(() => {
        if (!isMobile) {
            setShowEmployeeChildren(false);
        }
    }, [isMobile]);

  
    const handleItemClick = (item) => {
        if (item === 'Employee') {
            setShowEmployeeChildren((prev) => {
                const newState = !prev;
                localStorage.setItem('showEmployeeChildren', newState);
                return newState;
            });
        } else if (item === 'Dashboard') {
            navigate('/Dashboard');
            onClose();
        }
    };

    const handleSubItemClick = (item) => {
        if (item === 'Employee') {
            navigate('/Employee/EmployeeList');
            onClose();
        } else if (item === 'Attendance') {
            navigate('/Employee/Attendance');
            onClose();
        }
    };
    
    if (!isMobile || !open) {
        return null;
    }

    return (
        <Box
            sx={{
                position: isMobile ? 'fixed' : 'sticky',
                height: '100vh',
                bgcolor: isDarkMode ? '#2a2b40' : '#ffffff',
                color: isDarkMode ? '#fff' : '#566a7f',
                left: 0,
                top: 0,
                transition: 'transform 0.5s ease-in-out',
                zIndex: 1300,
                width: "75vw",
                boxShadow: isDarkMode ? '' : '1px 0 8px rgba(0, 0, 0, 0.1)',
            }}
        >
           
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    p: 2
                }}
            >
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <img
                        src={Logo}
                        alt="Logo"
                        style={{
                            width: '120px',
                            height: 'auto',
                            marginRight: '10px'
                        }}
                    />
                    <Typography
                        variant="h5"
                        sx={{
                            color: isDarkMode ? '#cfc8e3' : '#536880',
                            fontWeight: 'bold'
                        }}
                    >
                        ADSHR
                    </Typography>
                </Box>

                <IconButton
                    className="toggle-button"
                    onClick={onClose}
                    sx={{
                        marginLeft: "140px",
                        border: '7px solid',
                        height: '40px',
                        width: '40px',
                        borderColor: isDarkMode ? '#232333' : '#f6f5fa',
                        borderRadius: '50%',
                        bgcolor: isDarkMode ? '#696cff' : '#696cff',
                        transition: 'transform 0.3s ease',
                      
                        '&:hover': {
                            bgcolor: isDarkMode ? '#696cff' : '#696cff',
                        },
                       
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
                            color: "#fff",
                            transition: 'margin-left 0.3s ease',
                          
                        }}
                    >
                        {<ChevronLeft />}
                    </Box>
                </IconButton>
            </Box>

            {/* Navigation List */}
            <List sx={{ color: isDarkMode ? '#c4bdd9' : '#67798f' }}>
                {['Dashboard', 'Employee'].map((item) => (
                    <React.Fragment key={item}>
                        <ListItem
                            button
                            onClick={() => handleItemClick(item)}
                            sx={{
                                '&:hover': {
                                    bgcolor: isDarkMode ? '#3e3e52' : '#f5f5f5',
                                },
                            }}
                        >
                            <ListItemIcon sx={{ color: isDarkMode ? '#c4bdd9' : '#67798f' }}>
                                {item === 'Dashboard' && <GridIcon />}
                                {item === 'Employee' && <PersonIcon />}
                            </ListItemIcon>
                            <ListItemText primary={item} />
                        </ListItem>

                        {item === 'Employee' && showEmployeeChildren && (
                            <>
                                <ListItem button sx={{ paddingLeft: '50px' }} onClick={() => handleSubItemClick('Employee')}>
                                    <ListItemIcon sx={{ color: isDarkMode ? '#c4bdd9' : '#67798f' }}>
                                        <FiberManualRecordIcon sx={{ fontSize: '10px' }} />
                                    </ListItemIcon>
                                    <ListItemText primary="Employee" sx={{ color: isDarkMode ? '#cfc8e3' : '#536880' }} />
                                </ListItem>

                                <ListItem button sx={{ paddingLeft: '50px' }} onClick={() => handleSubItemClick('Attendance')}>
                                    <ListItemIcon sx={{ color: isDarkMode ? '#c4bdd9' : '#67798f' }}>
                                        <FiberManualRecordIcon sx={{ fontSize: '10px' }} />
                                    </ListItemIcon>
                                    <ListItemText primary="Attendance" sx={{ color: isDarkMode ? '#cfc8e3' : '#536880' }} />
                                </ListItem>
                            </>
                        )}
                    </React.Fragment>
                ))}
            </List>
        </Box>
    );
};

MobileSidebar.propTypes = {
    open: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
};

export default MobileSidebar;





