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
    Card,
    CardContent,
    TextField,
    Grid,
    Container,
} from '@mui/material';
import {
    Search,
    Notifications,
    Brightness4,
    Brightness7,
} from '@mui/icons-material';
import Timesheet from '../Timesheet/Timesheet';
import Statistics from '../Statistics/Statistics';
import ActivityTimeline from '../ActivityTimeline/ActivityTimeline';
import SearchFilters from '../SearchFilters/SearchFilters';
import { useTheme } from '../ThemeContext';
import Sidebar from '../Sidebar/Sidebar';

const Header = ({ onLogout }) => {
    const navigate = useNavigate();
    const [anchorElUser, setAnchorElUser] = useState(null);
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const { isDarkMode, toggleTheme } = useTheme();

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
                flexDirection: 'column',
                height: '100vh',
                width: '100vw', 
                backgroundColor: isDarkMode ? '#232333' : '#f5f5f9',
                margin: -1,
            }}
        >
            <Sidebar open={sidebarOpen} onClose={setSidebarOpen} />

            <AppBar
                // position="fixed"
                sx={{
                    bgcolor: isDarkMode ? '#2a2b40' : '#fff',
                    color: isDarkMode ? '#fff' : '#000',
                    ml: 44,
                    right: 0,
                    mr: 7,
                    width: "77.5vw",
                    borderRadius: 2,
                    mt: 3,
                }}
            >
                <Toolbar sx={{ minHeight: 56 }}>
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
                            backgroundColor: isDarkMode ? '#fff' : '#fff',
                            borderRadius: 2,
                            width: '90%',
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

            <Toolbar sx={{ minHeight: 56 }} /> {/* Placeholder for AppBar height */}

            <Container
                maxWidth="xl"
                sx={{
                    flexGrow: 1,
                    bgcolor: isDarkMode ? '#232333' : '#f5f5f9',
                    color: isDarkMode ? '#fff' : '#000',
                    ml: 44,
                    mr: 2,
                    mb: 0,
                    padding: 0,
                    mt: 8,
                    display: 'flex', // Ensure the container uses flexbox
                    flexDirection: 'column', // Column layout for children
                }}
            >
                <Grid container spacing={2} sx={{ p: 0 }}>
                    <Grid item xs={12} sm={4}>
                        <Card
                            sx={{
                                bgcolor: isDarkMode ? '#2a2b40' : '#fff',
                                height: '100%',
                                borderRadius: 2,
                            }}
                        >
                            <CardContent sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                                <Timesheet />
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <Card
                            sx={{
                                bgcolor: isDarkMode ? '#2a2b40' : '#fff',
                                height: '100%',
                                borderRadius: 2,
                            }}
                        >
                            <CardContent sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                                <Statistics />
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <Card
                            sx={{
                                bgcolor: isDarkMode ? '#2a2b40' : '#fff',
                                height: '100%',
                                borderRadius: 2,
                            }}
                        >
                            <CardContent sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                                <ActivityTimeline />
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>

                <Grid container spacing={3} sx={{ p: 0, mt: 2 }}>
                    <Grid item xs={12}>
                        <SearchFilters />
                    </Grid>
                </Grid>
            </Container>
        </Box>
    );
};

// Define PropTypes
Header.propTypes = {
    onLogout: PropTypes.func.isRequired,
};

export default Header;
