import React, { useState, useEffect } from 'react';
import { Avatar, TextField, Button, Typography, Link, Snackbar, Box, Paper, CircularProgress } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import 'typeface-cormorant-garamond';
import 'typeface-saira-stencil-one';
import Logo from "../../img/ads.png";
import { useTheme } from '../ThemeContext';


const SignIn = ({ onSignIn }) => {
    const { isDarkMode } = useTheme();

    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [isSignIn, setIsSignIn] = useState(true);
    const [loading, setLoading] = useState(false);
    const [isMobile, setIsMobile] = useState(window.innerWidth < 900);

    const navigate = useNavigate();

    // Handle screen resize to toggle isMobile
    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth < 900);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
        const formElement = document.getElementById('signin-form');
        formElement.classList.add('zoom-in');
    }, []);


    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            if (isSignIn) {
                const response = await axios.post('http://localhost:5000/api/auth/login', { email, password });
                const { token, username } = response.data;
                localStorage.setItem('token', token);
                localStorage.setItem('username', username);
                onSignIn(username);
                navigate('/Dashboard');
            } else {
                const newUser = { username, email, password };
                const response = await axios.post('http://localhost:5000/api/auth/register', newUser);
                const { token, username: registeredUsername } = response.data;
                localStorage.setItem('token', token);
                localStorage.setItem('username', registeredUsername);
                setUsername(registeredUsername);
                setErrorMessage('Registration successful. You can now sign in.');
                setOpenSnackbar(true);
                setIsSignIn(true);
            }
        } catch (error) {
            setErrorMessage(
                error.response?.data?.msg || 'An error occurred. Please try again.'
            );
            setOpenSnackbar(true);
        } finally {
            setLoading(false);
        }
    };

    const handleCloseSnackbar = () => {
        setOpenSnackbar(false);
    };

    return (
        <Box
            display="flex"
            height="99.9vh"
            width="99.6vw"
            mr={0}
            m={0}
            sx={{
                flexDirection: { xs: 'column', lg: 'row' },
                justifyContent: 'center',
                alignItems: 'center',
                bgcolor: isDarkMode ? '#2b2c40' : '#f6f5fa'
            }}
        >
            
            {!isMobile && (
                <Box
                    className="darkig"
                    sx={{
                        display: { xs: 'none', lg: 'block' },
                        flex: 1,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        backgroundImage: isDarkMode ? "" : "url('https://virtualdev.co/wp-content/uploads/virtual-developer-illustration-full-scale.webp')",
                        height: '100vh',
                    }}
                />
            )}
            <Box sx={{ width: { lg: '2px' }, height: '100vh', marginRight: { lg: '50px', xs: '0' }, bgcolor: isDarkMode ? '#232333' : '#f6f5fa', boxShadow: '2px 0px 5px rgba(0, 0, 0, 0.3)', display: isMobile ? 'none' : 'block' }} />


            <Box
                id="signin-form"
                component={Paper}
                elevation={6}
                display="flex"
                flexDirection="column"
                justifyContent="center"
                alignItems="center"
                flex={isMobile ? 1 : 0.5}
                padding={{ xs: 3, sm: 4 }}
                borderRadius={4}
                marginTop={{ xs: '22px', lg: '10px' }}
                marginBottom={{ xs: '15px', lg: '10px' }}
                sx={{
                    bgcolor: isDarkMode ? '#232438' : '#fefeff',
                    color: isDarkMode ? '#c7c7df' : '#566a7f',
                    width: { xs: '90%', sm: '80%', md: '70%', lg: '50%' },
                    cursor: 'pointer',
                    animation: 'pulse 1s ease-in-out infinite, zoom-in 0.5s ease-out',
                    transition: 'all 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55)',
                    '&:hover': { transform: 'translateY(-10px) scale(1.05)', boxShadow: 24 },
                    '@keyframes pulse': {
                        '0%': { transform: 'scale(1)' },
                        '50%': { transform: 'scale(1.02)' },
                        '100%': { transform: 'scale(1)' },
                    },
                }}
            >
                {/* Form Content */}
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', width: '100%', padding: 1 }}>
                    <img
                        src={Logo}
                        alt="ADS Logo"
                        style={{
                            width: '170px',
                        }}
                    />
                    <Box
                        sx={{
                            fontFamily: '"Saira Stencil One", sans-serif',
                            fontSize: '1.1rem',
                            color: '#aa1c21',
                        }}
                    >
                        ADSCode Gen Solutions
                    </Box>
                    <Box
                        sx={{
                            mb: 4,
                            fontFamily: '"Cormorant Garamond",sans-serif',
                            fontSize: 12,
                            color: '#aa1c21',
                            fontWeight: "bold"
                        }}
                    >
                        Your Vision, Our Technology
                    </Box>
                    <Box sx={{ mb: 1, display: "flex", width: "100%", justifyContent: "start", fontSize: 20, fontFamily: "'Lexend', sans-serif" }}>
                        Welcome to ADSHR! 👋
                    </Box>
                    <Typography
                        marginBottom={3}
                        sx={{
                            fontSize: { xs: '1rem', sm: '0.8rem' },
                            display: "flex",
                            justifyContent: "start",
                            color: '#778791',
                            textAlign: "left",
                            width: "100%",
                        }}
                    >
                        {isSignIn ? 'Please sign-in to your account' : 'Please create your account'}
                    </Typography>
                    <form onSubmit={handleSubmit} style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '16px' }}>
                        {!isSignIn && (
                            <TextField
                                label="Username"
                                placeholder="Enter username"
                                variant="outlined"
                                required
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                sx={{
                                    '& .MuiInputBase-input': {
                                        color: isDarkMode ? '#c7c7df' : '#566a7f',
                                    },
                                }}
                            />
                        )}
                        <TextField
                            label="Email"
                            placeholder="Enter email"
                            variant="outlined"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            fullWidth
                            sx={{
                                '& .MuiInputBase-input': {
                                    color: isDarkMode ? '#c7c7df' : '#566a7f',
                                },
                            }}
                        />
                        <TextField
                            label="Password"
                            placeholder="Enter password"
                            type="password"
                            variant="outlined"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            fullWidth
                            sx={{
                                '& .MuiInputBase-input': {
                                    color: isDarkMode ? '#c7c7df' : '#566a7f',
                                },
                            }}
                        />
                        <Button
                            type="submit"
                            fontWeight="bold"
                            fullWidth
                            style={{
                                backgroundColor: '#696cff',
                                color: "#fff",
                                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                                transition: 'box-shadow 0.3s ease-in-out',
                            }}
                            disabled={loading}
                        >
                            {loading ? (
                                <CircularProgress size={24} color="inherit" />
                            ) : (
                                isSignIn ? 'Sign in' : 'Sign Up'
                            )}
                        </Button>
                    </form>
                    <Typography variant="body2" marginTop={2}>
                        {isSignIn ? (
                            <>
                                New on our platform?{' '}
                                <Link
                                    underline="hover"
                                    onClick={() => setIsSignIn(false)}
                                    sx={{ color: '#666cff', cursor: 'pointer' }}
                                >
                                    Create an account
                                </Link>
                            </>
                        ) : (
                            <>
                                Already have an account?{' '}
                                <Link
                                    underline="hover"
                                    onClick={() => setIsSignIn(true)}
                                    sx={{ color: '#666cff', cursor: 'pointer' }}
                                >
                                    Sign in
                                </Link>
                            </>
                        )}
                    </Typography>
                </Box>
            </Box>

            <Snackbar
                open={openSnackbar}
                autoHideDuration={3000}
                onClose={handleCloseSnackbar}
                message={errorMessage}
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            />
        </Box>
    );
};

export default SignIn;