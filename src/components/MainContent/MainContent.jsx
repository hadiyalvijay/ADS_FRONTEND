import React, { useState } from 'react';
import PropTypes from 'prop-types';
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

    const scrollHeader = (direction) => {
        const headerElement = document.getElementById('header'); // Ensure your header has this id
        if (direction === 'left') {
            headerElement.scrollLeft += 200; // Adjust the value as needed for speed
        } else {
            headerElement.scrollLeft -= 200; // Adjust the value as needed for speed
        }
    };

    return (
        <>
            <AppBar position="static" sx={{ zIndex: 1301, transition: 'transform 0.3s ease', bgcolor: isDarkMode ? '#2a2b40' : '#fff' }} id="header">
                <Toolbar>
                    <IconButton color="inherit" onClick={toggleSidebar}>
                        <MenuIcon />
                    </IconButton>

                    <Box flexGrow={1} display="flex" alignItems="center">
                        <TextField placeholder="Search…" variant="outlined" size="small" sx={{ marginRight: 2 }} />
                        <IconButton color="inherit">
                            <Search />
                        </IconButton>
                    </Box>

                    <IconButton color="inherit" onClick={toggleTheme}>
                        {isDarkMode ? <Brightness7 /> : <Brightness4 />}
                    </IconButton>

                    <IconButton color="inherit">
                        <Notifications />
                    </IconButton>

                    <Tooltip title="Open settings">
                        <IconButton onClick={handleOpenUserMenu}>
                            <Avatar alt={user.name} src={user.avatarUrl} />
                        </IconButton>
                    </Tooltip>

                    <Menu
                        anchorEl={anchorElUser}
                        open={Boolean(anchorElUser)}
                        onClose={handleCloseUserMenu}
                    >
                        <MenuItem onClick={onLogout}>Logout</MenuItem>
                    </Menu>
                </Toolbar>
            </AppBar>

            <Sidebar open={sidebarOpen} onClose={toggleSidebar} toggleScroll={scrollHeader} />

            <MainContent />
        </>
    );
};

Header.propTypes = {
    onLogout: PropTypes.func.isRequired,
};

export default Header;
