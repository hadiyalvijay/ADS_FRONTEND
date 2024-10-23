import React, { useState, useEffect } from 'react';
import { Avatar, TextField, Button, Typography, Link, Snackbar, Box, Paper } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const SignIn = ({ onSignIn }) => {
    const avatarStyle = { backgroundColor: '#1bbd7e' };
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('hadiyalvijay7777@gmail.com');
    const [password, setPassword] = useState('123');
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [isSignIn, setIsSignIn] = useState(true);

    const navigate = useNavigate();

    useEffect(() => {
        const formElement = document.getElementById('signin-form');
        formElement.classList.add('zoom-in');
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (isSignIn) {
            // Sign In logic
            try {
                const response = await axios.post('http://localhost:5000/api/auth/login', {
                    email,
                    password,
                });

                const { token } = response.data;
                localStorage.setItem('token', token);
                onSignIn();
                navigate('/home');
            } catch (error) {
                setErrorMessage('Invalid email or password. Please try again.');
                setOpenSnackbar(true);
            }
        } else {
            // Registration logic
            try {
                const newUser = { username, email, password };
                await axios.post('http://localhost:5000/api/auth/register', newUser);
                setErrorMessage('Registration successful. You can now sign in.');
                setOpenSnackbar(true);
                setIsSignIn(true);
                setUsername(''); 
                setEmail('');    // Reset the email field after successful registration
                setPassword(''); // Reset the password field after successful registration
            } catch (error) {
                setErrorMessage('Registration failed. Please try again.');
                setOpenSnackbar(true);
            }
        }
    };

    const handleCloseSnackbar = () => {
        setOpenSnackbar(false);
    };

    return (
        <Box display="flex" height="90vh" width="100%">
            <Box 
              
                sx={{ display: { xs: 'none', lg: 'block' }, flex: 1, backgroundSize: 'cover', backgroundPosition: 'center', backgroundImage:"url('https://virtualdev.co/wp-content/uploads/virtual-developer-illustration-full-scale.webp')"}} 
            />
            <Box sx={{ width: '2px', height: '99vh', marginRight: '50px', backgroundColor: '#eaeded', marginBottom: 1, boxShadow: '2px 0px 5px rgba(0, 0, 0, 0.3)' }} />
            <Box
                id="signin-form"
                component={Paper}
                elevation={6}
                display="flex"
                flexDirection="column"
                justifyContent="center"
                alignItems="center"
                flex="0.5"
                padding={4}
                bgcolor="white"
                borderRadius={4}
                marginTop="80px"
                marginRight="40px"
                sx={{
                    cursor: 'pointer',
                    animation: 'pulse 1s ease-in-out infinite, zoom-in 0.5s ease-out',
                    transition: 'all 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55)',
                    '&:hover': { transform: 'translateY(-10px) scale(1.05)', boxShadow: 24 },
                    '@keyframes pulse': {
                        '0%': { transform: 'scale(1)' },
                        '50%': { transform: 'scale(1.02)' },
                        '100%': { transform: 'scale(1)' }
                    },
                    '@keyframes zoom-in': {
                        '0%': { transform: 'scale(0.8)', opacity: 0 },
                        '100%': { transform: 'scale(1)', opacity: 1 }
                    }
                }}
            >
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', width: '100%', maxWidth: 400, padding: 3, bgcolor: 'white' }}>
                    <Avatar
                        style={avatarStyle}
                        sx={{
                            width: 60,
                            height: 60,
                            mb: 2,
                            transition: 'all 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55)',
                            '&:hover': { transform: 'scale(1.2) rotate(360deg)', boxShadow: '0 0 15px rgba(27, 189, 126, 0.5)' }
                        }}
                    >
                        <LockOutlinedIcon fontSize="large" />
                    </Avatar>
                    <Typography variant="h4" component="h1" fontWeight="bold" marginBottom={3} textAlign="center">
                        {isSignIn ? 'Sign In' : 'Sign Up'}
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
                                fullWidth
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
                        />
                        <Button type="submit" variant="contained" color="primary" fullWidth size="large">
                            {isSignIn ? 'Sign In' : 'Sign Up'}
                        </Button>
                    </form>
                    <Typography marginTop={3} textAlign="center">
                        <Link href="#" color="primary" underline="none" onClick={() => navigate('/forgot-password')}>
                            Forgot password?
                        </Link>
                    </Typography>
                    <Typography marginTop={1} textAlign="center">
                        {isSignIn ? "Don't have an account?" : "Already have an account?"}{' '}
                        <Link href="#" color="primary" underline="none" onClick={() => setIsSignIn(!isSignIn)}>
                            {isSignIn ? 'Sign Up' : 'Sign In'}
                        </Link>
                    </Typography>
                </Box>
            </Box>

            <Snackbar open={openSnackbar} autoHideDuration={3000} onClose={handleCloseSnackbar} message={errorMessage} />
        </Box>
    );
};

export default SignIn;
