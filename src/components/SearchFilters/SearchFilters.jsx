import React from 'react';
import { Box, TextField, Button, Grid } from '@mui/material';
import { useTheme } from '../ThemeContext';

const SearchFilters = () => {
    const { isDarkMode } = useTheme();

    return (
        <Box
            sx={{
                p: 2,
                bgcolor: isDarkMode ? '#2a2b40' : '#fff', // Background color based on theme
                color: isDarkMode ? '#fff' : '#000', // Text color based on theme
                borderRadius: 2,
            }}
        >
            <Grid container spacing={2} justifyContent="space-between">
                <Grid item xs={12} sm={3}>
                    <TextField
                        fullWidth
                        label="Date"
                        variant="outlined"
                        InputProps={{
                            sx: {
                                bgcolor: '#fff',
                                color: '#000',
                                border: '1px solid #ccc',
                                height: '50px', 
                                textAlign: 'center',
                                '& .MuiInputBase-input': {
                                    textAlign: 'center', // Center-align input text
                                },
                                '&::placeholder': {
                                    textAlign: 'center', // Center-align placeholder text
                                    color: '#888', // Optional: change placeholder color
                                },
                                '&:focus': {
                                    color: '#fff',
                                    bgcolor: isDarkMode ? '#2a2b40' : '#fff',
                                },
                            },
                        }}
                        InputLabelProps={{
                            sx: {
                                color: isDarkMode ? '' : '#000',
                            },
                        }}
                    />
                </Grid>

                <Grid item xs={12} sm={3}>
                    <TextField
                        fullWidth
                        label="Select Month"
                        variant="outlined"
                        InputProps={{
                            sx: {
                                bgcolor: '#fff',
                                color: '#000',
                                border: '1px solid #ccc',
                                height: '50px',
                                textAlign: 'center',
                                '& .MuiInputBase-input': {
                                    textAlign: 'center', // Center-align input text
                                },
                                '&::placeholder': {
                                    textAlign: 'center', // Center-align placeholder text
                                    color: '#888', // Optional: change placeholder color
                                },
                                '&:focus': {
                                    color: '#fff',
                                    bgcolor: isDarkMode ? '#2a2b40' : '#fff',
                                },
                            },
                        }}
                        InputLabelProps={{
                            sx: {
                                color: isDarkMode ? '' : '#000',
                            },
                        }}
                    />
                </Grid>

                <Grid item xs={12} sm={3}>
                    <TextField
                        fullWidth
                        label="Select Year"
                        variant="outlined"
                        InputProps={{
                            sx: {
                                bgcolor: '#fff',
                                color: '#000',
                                border: '1px solid #ccc',
                                height: '50px',
                                textAlign: 'center',
                                '& .MuiInputBase-input': {
                                    textAlign: 'center', // Center-align input text
                                },
                                '&::placeholder': {
                                    textAlign: 'center', // Center-align placeholder text
                                    color: '#888', // Optional: change placeholder color
                                },
                                '&:focus': {
                                    color: '#fff',
                                    bgcolor: isDarkMode ? '#2a2b40' : '#fff',
                                },
                            },
                        }}
                        InputLabelProps={{
                            sx: {
                                color: isDarkMode ? '' : '#000',
                            },
                        }}
                    />
                </Grid>

                <Grid item xs={12} sm={3} mt={0.3}>
                    <Button
                        fullWidth
                        variant="contained"
                        sx={{
                            height: '40px', // Maintain height
                            bgcolor: isDarkMode ? '#00f53d' : '#000',
                            color: '#fff',
                            '&:hover': {
                                bgcolor: isDarkMode ? '#00b030' : '#333',
                            },
                        }}
                    >
                        Filter
                    </Button>
                </Grid>
            </Grid>
        </Box>
    );
};

export default SearchFilters;
