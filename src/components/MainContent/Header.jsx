// Header.jsx
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Box, AppBar, Toolbar, IconButton, Avatar, Tooltip, Menu, MenuItem, TextField, useMediaQuery, Badge, Button } from '@mui/material';
import { Search, Notifications, Brightness4, Brightness7, Menu as MenuIcon } from '@mui/icons-material';
import { useTheme } from '../ThemeContext';
import { IoSunnyOutline, IoMoonOutline, IoSearch } from "react-icons/io5";
import { TbWorld } from "react-icons/tb";
import { FiGrid } from "react-icons/fi";
import { HiRefresh } from "react-icons/hi";
import { CreditCardIcon, LogOutIcon, SettingsIcon, UserIcon } from 'lucide-react';
import { TiPower } from "react-icons/ti";
import { useNavigate } from 'react-router-dom';

const Header = ({ onLogout, sidebarOpen, toggleSidebar }) => {
    const navigate = useNavigate();
    const [anchorElUser, setAnchorElUser] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const { isDarkMode, toggleTheme } = useTheme();
    const isMobile = useMediaQuery('(max-width: 1000px)');
    const username = localStorage.getItem('username') || 'Guest';
    const nameParts = username.split(' ');
    const firstName = nameParts[0] || '';
    const middleName = nameParts[1] || '';
    const lastName = nameParts[2] || '';
    const firstLetter = firstName.charAt(0).toUpperCase();
    const middleLetter = middleName.charAt(0).toUpperCase();
    const lastLetter = lastName.charAt(0).toUpperCase();
    const displayInitials = middleName
        ? `${firstLetter}${middleLetter}`
        : lastName
            ? `${firstLetter}${lastLetter}`
            : firstLetter;
    const [showMobileSearch, setShowMobileSearch] = useState(false);
    const [languageAnchor, setLanguageAnchor] = useState(null);
    const [notificationAnchor, setNotificationAnchor] = useState(null);

    useEffect(() => {
        const savedSidebarState = localStorage.getItem('sidebarOpen');
        if (savedSidebarState) {
            sidebarOpen = JSON.parse(savedSidebarState);
        }
    }, [toggleSidebar]);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (showMobileSearch &&
                !event.target.closest('.mobile-search-container') &&
                !event.target.closest('.search-icon-button')) {
                setShowMobileSearch(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [showMobileSearch]);

    const handleThemeToggle = () => {
        setIsLoading(true);
        setTimeout(() => {
            toggleTheme();
            setIsLoading(false);
        }, 500);
    };

    const handleOpenUserMenu = (event) => setAnchorElUser(event.currentTarget);
    const handleCloseUserMenu = () => setAnchorElUser(null);

    const handleSearchClick = () => {
        if (isMobile) {
            setShowMobileSearch(!showMobileSearch);
        }
    };

    const handleLanguageOpen = (event) => setLanguageAnchor(event.currentTarget);
    const handleLanguageClose = () => setLanguageAnchor(null);

    const handleNotificationOpen = (event) => setNotificationAnchor(event.currentTarget);
    const handleNotificationClose = () => setNotificationAnchor(null);

    const handleProfileClick = () => {
        handleCloseUserMenu();
        // Add loading state transition
        navigate('/loading');
        setTimeout(() => {
            navigate('/User Profile/Profile', {
                state: {
                    employee: {
                        username: username,
                        firstName: username.split(' ')[0],
                        middleName: username.split(' ')[1] || '',
                        email: '',
                        phone: '',
                        department: '',
                        position: 'Developer',
                        // You can add more fields as needed
                    }
                }
            });
        }, 1000);
    };

    const handleSettingsClick = () => {
        handleCloseUserMenu();
        // Add your settings navigation logic here
    };

    const handleBillingClick = () => {
        handleCloseUserMenu();
        // Add your billing navigation logic here
    };

    return (
        <>
            <div
                className="fixed top-0 left-0 right-0"
                style={{
                    backgroundColor: isDarkMode ? 'rgba(26, 26, 45,0.7)' : 'rgba(255, 255, 255, 0.25)',
                    backdropFilter: 'blur(10px)',
                    WebkitBackdropFilter: 'blur(10px)',
                    height: isMobile ? '20px' : '',
                    width: isMobile ? '100%' : '',
                }}
            />

            
            <div className="relative z-20">
                <Box
                    sx={{
                        position: isMobile ? "fixed" : "sticky",
                        bgcolor: isDarkMode 
                            ? 'rgba(42, 43, 64, 0.7)'
                            : 'rgba(255, 255, 255, 0.25)',
                        backdropFilter: 'blur(10px)',
                        WebkitBackdropFilter: 'blur(10px)',
                        color: isDarkMode ? '#c7c7df' : '#566a7f',
                        borderRadius: isMobile ? 3 : 2,
                        mt: 2.3,
                        ml: isMobile ? 0 : '',
                        width: isMobile ? "89vw" : "100%",
                        transition: 'all 0.3s ease',
                        border: '1px solid',
                        borderColor: isDarkMode 
                            ? 'rgba(255, 255, 255, 0.15)'
                            : 'rgba(255, 255, 255, 0.8)',
                        boxShadow: isDarkMode
                            ? '0 8px 32px 0 rgba(0, 0, 0, 0.2)'
                            : '0 8px 32px 0 rgba(200, 200, 200, 0.37)',
                        // position: 'relative',
                        '&::before': {
                            content: '""',
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            right: 0,
                            bottom: 0,
                            borderRadius: isMobile ? 3 : 2,
                            background: isDarkMode
                                ? 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, transparent 100%)'
                                : '',
                            pointerEvents: 'none'
                        }
                    }}
                >
                    <Toolbar sx={{ minHeight: 56, px: 2 }}>
                        {isMobile && (
                            <IconButton
                                edge="start"
                                color="inherit"
                                aria-label="menu"
                                onClick={toggleSidebar}
                                sx={{ ml: 0 }}
                            >
                                <MenuIcon />
                            </IconButton>
                        )}

                        <Tooltip title="Search">
                            <IconButton
                                className="search-icon-button"
                                size="medium"
                                aria-label="search"
                                onClick={handleSearchClick}
                                sx={{ color: isDarkMode ? '#ffffff' : '#232333' }}
                            >
                                <IoSearch />
                            </IconButton>
                        </Tooltip>

                        {!isMobile && (
                            <TextField
                                variant="outlined"
                                size="small"
                                placeholder="Search..."
                                sx={{
                                    width: '100%',
                                    backgroundColor: isDarkMode ? 'rgba(255, 255, 255, 0.1)' : '#fff',
                                    borderRadius: 3,
                                    flexGrow: 1,
                                    ml: 1,
                                    '& .MuiInputBase-input': {
                                        color: isDarkMode ? '#ffffff' : '#232333',
                                        backgroundColor: isDarkMode ? '#ffffff' : '#fff',
                                        borderRadius: 3,
                                    },
                                }}
                            />
                        )}

                        <Box sx={{ flexGrow: 1 }} />

                        <Tooltip title="Language">
                            <IconButton
                                size="medium"
                                aria-label="language"
                                onClick={handleLanguageOpen}
                                sx={{ color: isDarkMode ? '#cbcbe2' : '#566a7f' }}
                            >
                                <TbWorld />
                            </IconButton>
                        </Tooltip>

                        <Tooltip title="Shortcuts">
                            <IconButton
                                size="medium"
                                aria-label="language"
                                sx={{ color: isDarkMode ? '#cbcbe2' : '#566a7f' }}
                            >
                                <FiGrid />
                            </IconButton>
                        </Tooltip>

                        <Tooltip title="Notifications">
                            <IconButton
                                size="medium"
                                aria-label="notifications"
                                onClick={handleNotificationOpen}
                                sx={{ color: isDarkMode ? '#cbcbe2' : '#566a7f' }}
                            >
                                <Badge badgeContent={3} color="error">
                                    <Notifications />
                                </Badge>
                            </IconButton>
                        </Tooltip>

                        <Tooltip title={isDarkMode ? 'Light Mode' : 'Dark Mode'}>
                            <IconButton
                                size="medium"
                                onClick={handleThemeToggle}
                                sx={{ color: isDarkMode ? '#cbcbe2' : '#566a7f' }}
                            >
                                {isDarkMode ? <IoSunnyOutline /> : <IoMoonOutline className="text-2xl" />}
                            </IconButton>
                        </Tooltip>

                        <Tooltip title="Account Settings">
                            <IconButton
                                size="medium"
                                onClick={handleOpenUserMenu}
                            >
                                <Avatar 
                                    alt={username}
                                    className="avatar bg-label-info"
                                    sx={{ 
                                        bgcolor: '#25445c',  // Updated background color
                                        color: '#03c3ec',    // Updated text color
                                        width: '2.375rem',
                                        height: '2.375rem',
                                        cursor: 'pointer',
                                        position: 'relative'
                                    }}
                                >
                                    {displayInitials}
                                </Avatar>
                            </IconButton>
                        </Tooltip>

                        <Menu
                            sx={{
                                mt: isMobile ? '5px' : '10px',
                                ml: isMobile ? '20px' : '70px',
                                '& .MuiPaper-root': {
                                    backgroundColor: isDarkMode ? '#2a2b40' : '#ffffff',
                                    color: isDarkMode ? '#cbcbe2' : '#566a7f',
                                    minWidth: isMobile ? '80vw' : '200px',
                                    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.15)',
                                    border: '1px solid rgba(255, 255, 255, 0.1)',
                                },
                                '& .MuiMenuItem-root:hover': {
                                    backgroundColor: '#696cff20',
                                    color: '#696cff'
                                }
                            }}
                            anchorEl={anchorElUser}
                            keepMounted
                            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                            open={Boolean(anchorElUser)}
                            onClose={handleCloseUserMenu}
                        >
                            {/* User Info */}
                            <Box sx={{
                                px: 2,
                                py: 1.5,
                                borderBottom: 1,
                                borderColor: 'divider',
                                display: 'flex',
                                justifyContent: 'left',
                                alignItems: 'center',
                                gap: 5
                            }}>
                                <Avatar sx={{ width: 45, height: 45, fontSize: '2rem', mb: '5px' }}>{displayInitials}</Avatar>
                                <Box>
                                    <Box sx={{ fontWeight: 'bold' }}>{username}</Box>
                                    <Box sx={{ fontSize: '0.875rem', mt: '5px' }}>Developer</Box>
                                </Box>
                            </Box>


                            <Box sx={{
                                borderBottom: 1,
                                borderColor: 'divider',
                                height: isMobile ? '30vh' : 'none',
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'center',
                            }}>
                                <MenuItem onClick={handleProfileClick} sx={{ py: 1.5 }}>
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                                        <UserIcon size={18} />
                                        My Profile
                                    </Box>
                                </MenuItem>

                                <MenuItem onClick={handleSettingsClick} sx={{ py: 1.5 }}>
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                                        <SettingsIcon size={18} />
                                        Settings
                                    </Box>
                                </MenuItem>

                                <MenuItem onClick={handleBillingClick} sx={{ py: 1.5 }}>
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, width: '100%', justifyContent: 'space-between' }}>
                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                                            <CreditCardIcon size={18} />
                                            Billing
                                        </Box>
                                        <Box sx={{
                                            bgcolor: 'error.main',
                                            color: 'white',
                                            borderRadius: '50%',
                                            width: 20,
                                            height: 20,
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            fontSize: '0.75rem'
                                        }}>
                                            4
                                        </Box>
                                    </Box>
                                </MenuItem>
                            </Box>

                            <MenuItem onClick={onLogout} sx={{ py: 1.5, mt: '10px' }}>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                                    <TiPower size={22} />
                                    Log Out
                                </Box>
                            </MenuItem>
                        </Menu>

                    </Toolbar>
                </Box>

                {isMobile && showMobileSearch && (
                    <div className='flex justify-center items-center mobile-search-container'>
                        <TextField
                            fullWidth
                            variant="outlined"
                            size="small"
                            placeholder="Search..."
                            sx={{
                                position: 'fixed',
                                mt: 10,
                                width: '90%',
                                mx: 2,
                                borderRadius: 2,
                                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                                backdropFilter: 'blur(10px)',
                                '& .MuiInputBase-input': {
                                    color: isDarkMode ? '#fff' : '#232333',
                                },
                                boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
                                border: '1px solid rgba(255, 255, 255, 0.2)',
                                '& .MuiOutlinedInput-root': {
                                    '& fieldset': {
                                        borderColor: 'transparent',
                                    },
                                    '&:hover fieldset': {
                                        borderColor: isDarkMode ? 'rgba(255, 255, 255, 0.5)' : 'rgba(0, 0, 0, 0.2)',
                                    },
                                }
                            }}
                        />
                    </div>
                )}

                <Menu
                    anchorEl={languageAnchor}
                    open={Boolean(languageAnchor)}
                    onClose={handleLanguageClose}
                    sx={{
                        mt: '18px',
                        ml: isMobile ? '20px' : '40px',
                        '& .MuiPaper-root': {
                            width: isMobile ? '79vw' : '200px',
                            backgroundColor: isDarkMode ? '#2a2b40' : '#ffffff',
                            color: isDarkMode ? '#cbcbe2' : '#566a7f',
                            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.15)',
                            border: '1px solid rgba(255, 255, 255, 0.1)',
                        },
                        '& .MuiMenuItem-root:hover': {
                            backgroundColor: '#696cff20',
                            color: '#696cff'
                        }
                    }}
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                    }}
                >
                    <MenuItem onClick={handleLanguageClose}>English</MenuItem>
                    <MenuItem onClick={handleLanguageClose}>French</MenuItem>
                    <MenuItem onClick={handleLanguageClose}>Arabic</MenuItem>
                    <MenuItem onClick={handleLanguageClose}>German</MenuItem>
                </Menu>

                <Menu
                    anchorEl={notificationAnchor}
                    open={Boolean(notificationAnchor)}
                    onClose={handleNotificationClose}
                    sx={{
                        mt: '18px',
                        ml: isMobile ? '20px' : '40px',
                        '& .MuiPaper-root': {
                            width: isMobile ? '79vw' : '320px',
                            backgroundColor: isDarkMode ? '#323249' : '#ffffff',
                            color: isDarkMode ? '#cbcbe2' : '#566a7f',
                            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.15)',
                            border: '1px solid rgba(255, 255, 255, 0.1)',
                        },
                        '& .MuiMenuItem-root:hover': {
                            backgroundColor: '#696cff20',
                            color: '#696cff'
                        }
                    }}
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                    }}
                >
                    <Box className='flex justify-between items-center' sx={{ p: 1, borderBottom: 1, borderColor: 'divider' }}>
                        <Box sx={{ fontWeight: 'bold', fontSize: '1.1rem' }}>Notifications</Box>
                        <Box 
                            sx={{ 
                                display: 'flex', 
                                alignItems: 'center', 
                                gap: 1.5,
                                cursor: 'pointer',
                                '&:hover': {
                                    color: '#696cff'
                                }
                            }}
                        >
                            <HiRefresh size={18} />
                        </Box>
                    </Box>
                    <Box className='mx-auto  sm:mt-0 bg-[#696cff] w-100 text-white px-5 py-2 text-sm rounded sm:mr-4 flex items-center gap-1 hover:bg-[#4f52cc] shadow-lg shadow-indigo-500/50' sx={{ p: 2, display: 'flex',alignItems: 'center', justifyContent: 'center', mt:isMobile ? 1.5 : 2,mb: isMobile ? 0.5 : 1 ,mx: isMobile ? 1.5 : 2}}>
                        <Button sx={{height: '10px',width: isMobile ? '100%' : '100%',mx: isMobile ? 2 : '0', color: 'white'}}>
                            View All Notifications
                        </Button>
                    </Box>
                </Menu>
            </div>
        </>
    );
};

Header.propTypes = {
    onLogout: PropTypes.func.isRequired,
    sidebarOpen: PropTypes.bool.isRequired,
    toggleSidebar: PropTypes.func.isRequired,
};

export default Header;