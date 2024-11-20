import React, { useState, useEffect } from 'react';
import { Avatar, TextField, Button, Typography, Link, Snackbar, Box, Paper, CircularProgress } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import 'typeface-cormorant-garamond';
import 'typeface-saira-stencil-one';

const SignIn = ({ onSignIn }) => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('hadiyalvijay7777@gmail.com');
    const [password, setPassword] = useState('123');
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [isSignIn, setIsSignIn] = useState(true);
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate("/Dashboard");

    useEffect(() => {
        const formElement = document.getElementById('signin-form');
        formElement.classList.add('zoom-in');
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setTimeout(async () => {
            if (isSignIn) {
                try {
                    const response = await axios.post('http://localhost:5000/api/auth/login', { email, password });
                    const { token } = response.data;
                    localStorage.setItem('token', token);
                    localStorage.setItem('username', username);
                    onSignIn();
                    navigate('/Dashboard');
                } catch (error) {
                    if (error.response && error.response.data) {
                        setErrorMessage(error.response.data.msg || 'Invalid email or password. Please try again.');
                    } else {
                        setErrorMessage('An error occurred. Please try again.');
                    }
                    setOpenSnackbar(true);
                }
            } else {
                try {
                    const newUser = { username, email, password };
                    const response = await axios.post('http://localhost:5000/api/auth/register', newUser);
                    const { token, username: registeredUsername } = response.data;
                    localStorage.setItem('token', token);
                    localStorage.setItem('username', registeredUsername);
                    setUsername(registeredUsername);
                    setErrorMessage('Registration successful. You can now sign in.');
                    setOpenSnackbar(true);
                    setIsSignIn(true);
                } catch (error) {
                    if (error.response && error.response.data) {
                        if (error.response.data.msg === 'User already exists') {
                            setErrorMessage('User already exists. Please try Signing in.');
                        } else {
                            setErrorMessage('Registration failed. Please try again.');
                        }
                    } else {
                        setErrorMessage('An error occurred during registration.');
                    }
                    setOpenSnackbar(true);
                }
            }
            setLoading(false);
        }, 2000);
    };

    const handleCloseSnackbar = () => {
        setOpenSnackbar(false);
    };

    return (
        <Box
            display="flex"
            height="97vh"
            sx={{
                flexDirection: { xs: 'column', lg: 'row' },
                justifyContent: 'center',
                alignItems: 'center',
            }}
        >
            {/* Image Side */}
            <Box
                sx={{
                    display: { xs: 'none', lg: 'block' },
                    flex: 1,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundImage: "url('https://virtualdev.co/wp-content/uploads/virtual-developer-illustration-full-scale.webp')",
                    height: '100vh', // Ensure full height for large screens
                }}
            />
            <Box sx={{ width: '2px', height: '102vh', marginRight: { lg: '50px', xs: '0' }, backgroundColor: '#eaeded', marginBottom: 1, boxShadow: '2px 0px 5px rgba(0, 0, 0, 0.3)' }} />

            {/* Sign In Form */}
            <Box
                id="signin-form"
                component={Paper}
                elevation={6}
                display="flex"
                flexDirection="column"
                justifyContent="center"
                alignItems="center"
                flex="0.5"
                padding={{ xs: 3, sm: 4 }}
                bgcolor="white"
                borderRadius={4}
                marginTop={{ xs: '20px', lg: '10px' }}
                marginRight="40px"
                sx={{
                    color: "#566a7f",
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
                    '@keyframes zoom-in': {
                        '0%': { transform: 'scale(0.8)', opacity: 0 },
                        '100%': { transform: 'scale(1)', opacity: 1 },
                    },
                }}
            >
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', width: '100%', padding: 1 }}>
                    <img
                        src="https://adsdesk.adscodegensolutions.com/ads/photos/ads_logo_only.png"
                        alt="ADS Logo"
                        style={{
                            width: '170px',
                        }}
                    />
                    <Box
                        sx={{
                            fontFamily: '"Saira Stencil One",  sans-serif',
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
                        }}>
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
                        {isSignIn ? 'Please sign-in to your account' : 'Please create account your account'}
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
                                        color: '#778791',
                                    }
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
                                    color: '#778791',
                                }
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
                                    color: '#778791',
                                }
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
                                position: 'relative',
                            }}
                            onMouseOver={(e) => e.target.style.boxShadow = '0 8px 16px rgba(0, 0, 0, 0.2)'}
                            onMouseOut={(e) => e.target.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)'}
                            disabled={loading}
                        >
                            {loading ? (
                                <CircularProgress size={24} color="inherit" />
                            ) : (
                                isSignIn ? 'Sign in' : 'Sign Up'
                            )}
                        </Button>
                    </form>

                    <Typography marginTop={3} textAlign="center">
                        <Link href="#" color="primary" underline="none" fontWeight={'bold'} fontSize={15} onClick={() => navigate('/forgot-password')}>
                            Forgot password?
                        </Link>
                    </Typography>
                    <Typography
                        marginTop={1}
                        textAlign="center"
                        sx={{
                            fontSize: { xs: '0.999rem', sm: '0.5rem', md: '1rem' },
                            padding: { xs: '0 16px', sm: '0' },
                        }}
                    >
                        {isSignIn ? "Don't have an account?" : "Already have an account?"}{' '}
                        <Link
                            href="#"
                            color="primary"
                            underline="none"
                            onClick={() => setIsSignIn(!isSignIn)}
                            sx={{
                                display: 'inline-block',
                                fontWeight: 'bold',
                            }}
                        >
                            {isSignIn ? 'Sign Up' : 'Sign In'}
                        </Link>
                    </Typography>
                </Box>
            </Box>

            {/* Snackbar for error messages */}
            <Snackbar open={openSnackbar} autoHideDuration={3000} onClose={handleCloseSnackbar} message={errorMessage} />
        </Box>
    );
};

export default SignIn;
