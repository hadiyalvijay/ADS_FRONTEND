import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import {
    Box,
    AppBar,
    Toolbar,
    IconButton,
    Avatar,
    Tooltip,
    Menu,
    MenuItem,
    TextField,
    useMediaQuery,
} from '@mui/material';
import {
    Search,
    Notifications,
    Brightness4,
    Brightness7,
    Menu as MenuIcon,
} from '@mui/icons-material';
import { useTheme } from '../ThemeContext';
import Sidebar from '../Sidebar/Sidebar';
import MainContent from './MainContent';

const Header = ({ onLogout }) => {
    const [anchorElUser, setAnchorElUser] = useState(null);
    const [sidebarOpen, setSidebarOpen] = useState(false); 
    const { isDarkMode, toggleTheme } = useTheme();
    const isMobile = useMediaQuery('(max-width: 768px)');
    const isMedium = useMediaQuery('(max-width: 1024px)');

    const user = {
        name: 'Vijay Hadiyal',
        email: 'vijayhadiyal7777@outlook.com',
        avatarUrl: 'https://avatars.githubusercontent.com/u/19550456',
    };

    const toggleSidebar = () => {
        setSidebarOpen((prev) => !prev);
    };

    const handleOpenUserMenu = (event) => setAnchorElUser(event.currentTarget);
    const handleCloseUserMenu = () => setAnchorElUser(null);

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'row',
                height: '100vh',
                width: '100vw',
                backgroundColor: isDarkMode ? '#232333' : '#f5f5f9',
                margin: -1,
            }}
        >
            {/* Sidebar Component */}
            <Sidebar open={sidebarOpen} onClose={toggleSidebar} />

            <AppBar
                sx={{
                    bgcolor: isDarkMode ? '#2a2b40' : '#fff',
                    color: isDarkMode ? '#fff' : '#000',
                    width: isMobile ? '100%' : 'calc(100% - 240px)',
                    ml: isMobile ? 0 : (sidebarOpen && isMedium ? '240px' : 0), // Adjust margin for sidebar width
                    borderRadius: isMobile ? 0 : 2,
                    mt: isMobile ? 0 : 3,
                }}
            >
                <Toolbar sx={{ minHeight: 56, px: 2 }}>
                    <IconButton
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        onClick={toggleSidebar} // Toggle sidebar on click
                        sx={{ mr: 2, display: { xs: 'block', sm: 'none' } }} // Only show on mobile
                    >
                        <MenuIcon />
                    </IconButton>
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
                            <Avatar alt={user.name} src={user.avatarUrl} />
                        </IconButton>
                    </Tooltip>
                    <Menu
                        sx={{ mt: '45px' }}
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

            {/* Main Content Area */}
            <MainContent />

        </Box>
    );
};

Header.propTypes = {
    onLogout: PropTypes.func.isRequired,
};

export default Header;
