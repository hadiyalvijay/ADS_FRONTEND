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
                    width: sidebarOpen ? 'calc(100% - 250px)' : '100%', // Adjust width based on sidebar
                }}
            >
                <Toolbar sx={{ minHeight: 56, px: 2 }}>
                    {/* Show the menu icon only on mobile screens */}
                    {isMobile && (
                        <IconButton
                            size="large"
                            edge="start"
                            color="inherit"
                            onClick={toggleSidebar}
                            sx={{ mr: 2 }}
                        >
                            <MenuIcon />
                        </IconButton>
                    )}
                    <Box sx={{ flexGrow: 1 }} />
                    <IconButton
                        size="large"
                        edge="end"
                        color="inherit"
                        onClick={toggleTheme}
                        sx={{ ml: 2 }}
                    >
                        {isDarkMode ? <Brightness7 /> : <Brightness4 />}
                    </IconButton>
                    <IconButton size="large" edge="end" color="inherit" sx={{ ml: 2 }}>
                        <Search />
                    </IconButton>
                    <IconButton size="large" edge="end" color="inherit" sx={{ ml: 2 }}>
                        <Notifications />
                    </IconButton>
                    <Tooltip title="Open settings">
                        <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                            <Avatar sx={{ bgcolor: '#2a2b40' }}>
                                {firstLetter}
                            </Avatar>
                        </IconButton>
                    </Tooltip>
                    <Menu
                        anchorEl={anchorElUser}
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'right',
                        }}
                        keepMounted
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
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
