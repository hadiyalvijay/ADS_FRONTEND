import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Box, AppBar, Toolbar, IconButton, Avatar, Tooltip, Menu, MenuItem, TextField, useMediaQuery } from '@mui/material';
import { Search, Notifications, Brightness4, Brightness7, Menu as MenuIcon } from '@mui/icons-material';
import { useTheme } from '../ThemeContext';
import Sidebar from '../Sidebar/Sidebar';

const Header = ({ onLogout, sidebarOpen, toggleSidebar }) => {
    const [anchorElUser, setAnchorElUser] = useState(null);
    const { isDarkMode, toggleTheme } = useTheme();
    const isMobile = useMediaQuery('(max-width: 1000px)');  
    const username = localStorage.getItem('username') || 'Guest';
    const firstLetter = username.charAt(0).toUpperCase();

    useEffect(() => {
        const savedSidebarState = localStorage.getItem('sidebarOpen');
        if (savedSidebarState) {
            sidebarOpen = JSON.parse(savedSidebarState);
        }
    }, [toggleSidebar]);
    

    const handleOpenUserMenu = (event) => setAnchorElUser(event.currentTarget);
    const handleCloseUserMenu = () => setAnchorElUser(null);

    return (
        <Box sx={{ display: 'flex', flexDirection: 'row' }}>
            <AppBar
                sx={{
                    position: "static",
                    bgcolor: isDarkMode ? '#2a2b40' : '#fff',
                    color: isDarkMode ? '#fff' : '#000',
                    borderRadius: isMobile ? 0 : 1,
                    mt: isMobile ? 0 : 2,
                    zIndex: 1100,
                    transition: 'width 0.3s ease, margin-left 0.3s ease',
                }}
            >
                <Toolbar sx={{ minHeight: 56, px: 2 }}>
                    {/* Show the menu icon only on mobile screens */}
                    {isMobile && (
                        <IconButton
                            edge="start"
                            color="inherit"
                            aria-label="menu"
                            onClick={toggleSidebar}
                            sx={{ mr: 2 }}
                        >
                            <MenuIcon />
                        </IconButton>
                    )}
                    <Tooltip title="Search">
                        <IconButton size="large" aria-label="search" sx={{ color: isDarkMode ? '#fff' : '#000' }}>
                            <Search />
                        </IconButton>
                    </Tooltip>
                    <TextField
                        variant="outlined"
                        size="small"
                        placeholder="Search..."
                        sx={{
                            backgroundColor: '#fff',
                            borderRadius: 2,
                            flexGrow: 1,
                            ml: 1,
                        }}
                    />
                    <Tooltip title="Notifications">
                        <IconButton size="large" aria-label="notifications" sx={{ color: isDarkMode ? '#fff' : '#000', ml: 1 }}>
                            <Notifications />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="Toggle Theme">
                        <IconButton size="large" onClick={toggleTheme} sx={{ color: isDarkMode ? '#FFD700' : '#000080' }}>
                            {isDarkMode ? <Brightness7 /> : <Brightness4 />}
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="Settings">
                        <IconButton size="large" onClick={handleOpenUserMenu}>
                            <Avatar alt={username} sx={{ bgcolor: isDarkMode ? '#424242' : '#1976d2' }}>
                                {firstLetter}
                            </Avatar>
                        </IconButton>
                    </Tooltip>
                    <Menu
                        sx={{ mt: '55px', ml: '12px' }}
                        anchorEl={anchorElUser}
                        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                        keepMounted
                        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                        open={Boolean(anchorElUser)}
                        onClose={handleCloseUserMenu}
                    >
                        <MenuItem onClick={onLogout}>Logout</MenuItem>
                    </Menu>
                </Toolbar>
            </AppBar>
        </Box>
    );
};

Header.propTypes = {
    onLogout: PropTypes.func.isRequired,
    sidebarOpen: PropTypes.bool.isRequired,
    toggleSidebar: PropTypes.func.isRequired,
};

export default Header;
