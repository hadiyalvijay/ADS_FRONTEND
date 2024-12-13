import React, { useState } from 'react';
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  Grid,
  IconButton,
  DialogActions,
  useTheme as useMuiTheme,
  ThemeProvider,
  createTheme,
  CssBaseline,
  Grow,
  Fade,
  Backdrop,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Input,
  Box
} from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import CloseIcon from '@mui/icons-material/Close';
import { useTheme } from '../ThemeContext';
import axios from 'axios';

const Transition = React.forwardRef(function Transition(props, ref) {
  return (
    <Grow
      ref={ref}
      {...props}
      timeout={700}
      style={{
        transformOrigin: 'center'
      }}
    />
  );
});

const EmployeeModal = () => {
  const { isDarkMode } = useTheme();
  const [open, setOpen] = useState(false);
  const [profilePicBase64, setProfilePicBase64] = useState(""); 

  const theme = createTheme({
    palette: {
      mode: isDarkMode ? 'dark' : 'light',
      background: {
        default: isDarkMode ? '#121212' : '#fff',
        paper: isDarkMode ? '#2a2b40' : '#fff',
      },
      text: {
        primary: isDarkMode ? '#fff' : '#000',
        secondary: isDarkMode ? '#c7c7df' : '#566a7f',
      }
    },
    components: {
      MuiBackdrop: {
        styleOverrides: {
          root: {
            backgroundColor: isDarkMode
              ? 'rgba(0, 0, 0, 0.8)'
              : 'rgba(0, 0, 0, 0.5)',
          },
        },
      },
    },
  });

  const handleSubmit = async (e) => {
    e.preventDefault();




    // Check if password and confirm password match
    if (formData.password !== formData.confirmPassword) {
      setError(true);
      return;
    }

    try {

      const response = await axios.post('https://ads-server-rdvc.vercel.app/api/employees', formData);
      const { token } = response.data;
      localStorage.setItem('token', token);


      setFormData({
        firstName: '',
        middleName: '',
        lastName: '',
        department: '',
        designation: '',
        mobileNumber: '',
        officeEmail: '',
        personalEmail: '',
        password: '',
        confirmPassword: '',
        technology: '',
        skypeId: '',
        employementType: '',
        birthDate: '',
        joiningDate: '',
        aadharCard: '',
        panCard: '',
        gender: '',
        role: '',
        profilepic: '',
      });
      handleClose();
    } catch (error) {
      console.error('Error submitting form:', error);
      // Optionally show an error message to the user
    }
  };

  const [formData, setFormData] = useState({
    firstName: '',
    middleName: '',
    lastName: '',
    department: '',
    designation: '',
    mobileNumber: '',
    officeEmail: '',
    personalEmail: '',
    password: '',
    confirmPassword: '',
    technology: '',
    skypeId: '',
    employementType: '',
    birthDate: '',
    joiningDate: '',
    aadharCard: '',
    panCard: '',
    gender: '',
    role: '',
    profilepic: '',
  });
  const [error, setError] = useState(false);

  const handleFileChange = (event) => {
    const file = event.target.files[0]; // Get the selected file

    if (file) {
      const reader = new FileReader();
      
      reader.onloadend = () => {
        setProfilePicBase64(reader.result); // Set the base64 string in state
      };
      
      reader.readAsDataURL(file); // Read the file as base64
    }
  };



  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   console.log('Form submitted:', formData);
  //   handleClose();
  // };


  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Fade in={true}>
        <Button
          variant="contained"
          startIcon={<AddCircleIcon />}
          onClick={handleOpen}
          sx={{
            bgcolor: isDarkMode ? 'primary.dark' : 'primary.main',
            '&:hover': {
              bgcolor: isDarkMode ? 'primary.main' : 'primary.dark',
              transform: 'scale(1.02)',
              transition: 'transform 0.2s ease-in-out'
            }
          }}
        >
          Add Employee
        </Button>
      </Fade>

      <Dialog
        open={open}
        onClose={handleClose}
        maxWidth="md"
        fullWidth
        TransitionComponent={Transition}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
        PaperProps={{
          sx: {
            bgcolor: isDarkMode ? 'background.paper' : '#fff',
            boxShadow: isDarkMode
              ? '0 8px 32px rgba(0, 0, 0, 0.5)'
              : '0 8px 32px rgba(0, 0, 0, 0.1)',
            transition: 'box-shadow 0.3s ease-in-out',
            '&:hover': {
              boxShadow: isDarkMode
                ? '0 8px 40px rgba(0, 0, 0, 0.7)'
                : '0 8px 40px rgba(0, 0, 0, 0.15)',
            }
          }
        }}
      >
        <Fade in={open} timeout={800}>
          <div>
            <DialogTitle
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                bgcolor: isDarkMode ? 'background.paper' : '#fff',
                color: isDarkMode ? 'text.primary' : 'text.primary',
                transition: 'all 0.3s ease'
              }}
            >
              Add Employee
              <IconButton
                onClick={handleClose}
                sx={{
                  color: isDarkMode ? 'text.primary' : 'text.primary',
                  transition: 'transform 0.2s ease',
                  '&:hover': {
                    transform: 'rotate(90deg)',
                  }
                }}
              >
                <CloseIcon />
              </IconButton>
            </DialogTitle>

            <form onSubmit={handleSubmit}>
              <DialogContent
                dividers
                sx={{
                  bgcolor: isDarkMode ? 'background.paper' : '#fff',
                  '& .MuiInputLabel-root': {
                    color: isDarkMode ? 'text.secondary' : 'text.secondary',
                    transition: 'color 0.3s ease'
                  },
                  '& .MuiOutlinedInput-root': {
                    transition: 'all 0.3s ease',
                    '& fieldset': {
                      borderColor: isDarkMode ? 'rgba(255, 255, 255, 0.23)' : 'rgba(0, 0, 0, 0.23)',
                      transition: 'border-color 0.3s ease'
                    },
                    '&:hover fieldset': {
                      borderColor: isDarkMode ? 'rgba(255, 255, 255, 0.5)' : 'rgba(0, 0, 0, 0.5)',
                    },
                    '&:focus-within fieldset': {
                      borderWidth: '2px',
                      transition: 'border-width 0.2s ease'
                    }
                  }
                }}
              >
                <Grid container spacing={3}>
                  {/* Fade-in effect for form fields */}
                  <Fade in={open} timeout={900}>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        required
                        fullWidth
                        label="First Name"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        placeholder="Please Enter First Name"
                        sx={{
                          input: {
                            color: isDarkMode ? 'text.primary' : 'text.primary'
                          },
                          '& .MuiInputBase-root': {
                            transition: 'transform 0.2s ease',
                            '&:focus-within': {
                              transform: 'translateY(-2px)'
                            }
                          }
                        }}
                      />
                    </Grid>
                  </Fade>

                  <Fade in={open} timeout={1100}>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        required
                        fullWidth
                        label="Middle Name"
                        name="middleName"
                        value={formData.middleName}
                        onChange={handleChange}
                        placeholder="Please Enter Middle Name"
                      />
                    </Grid>
                  </Fade>

                  <Fade in={open} timeout={1100}>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        required
                        fullWidth
                        label="Last Name"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        placeholder="Please Enter Last Name"
                      />
                    </Grid>
                  </Fade>

                  <Fade in={open} timeout={1200}>
                    <Grid item xs={12} sm={6}>
                      <FormControl fullWidth required>
                        <InputLabel>Department</InputLabel>
                        <Select
                          name="department"
                          value={formData.department}
                          onChange={handleChange}
                          label="Department"
                        >
                          <MenuItem value="Please select Current Department">Please select Current Department</MenuItem>
                          <MenuItem value="Web Development">Web Development</MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>
                  </Fade>

                  <Fade in={open} timeout={1300}>
                    <Grid item xs={12} sm={6}>
                      <FormControl fullWidth required>
                        <InputLabel>Designation</InputLabel>
                        <Select
                          name="designation"
                          value={formData.designation}
                          onChange={handleChange}
                          label="Designation"
                        >
                          <MenuItem value="">--All--</MenuItem>
                          <MenuItem value="developer">Developer</MenuItem>
                          <MenuItem value="designer">Designer</MenuItem>
                          <MenuItem value="manager">Manager</MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>
                  </Fade>

                  <Fade in={open} timeout={1400}>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        required
                        fullWidth
                        label="Mobile Number"
                        name="mobileNumber"
                        value={formData.mobileNumber}
                        onChange={handleChange}
                        placeholder="Please Enter Mobile Number"
                      />
                    </Grid>
                  </Fade>

                  <Fade in={open} timeout={1500}>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        required
                        fullWidth
                        type="email"
                        label="Office E-mail"
                        name="officeEmail"
                        value={formData.officeEmail}
                        onChange={handleChange}
                        placeholder="Please Enter Office Email"
                      />
                    </Grid>
                  </Fade>

                  <Fade in={open} timeout={1600}>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        type="email"
                        label="Personal E-mail"
                        name="personalEmail"
                        value={formData.personalEmail}
                        onChange={handleChange}
                        placeholder="Please Enter personal Email"
                      />
                    </Grid>
                  </Fade>

                  <Fade in={open} timeout={1700}>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        required
                        fullWidth
                        type="password"
                        label="Password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        placeholder="Please Enter Password"
                      />
                    </Grid>
                  </Fade>

                  <Fade in={open} timeout={1800}>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        required
                        fullWidth
                        type="password"
                        label="Confirm Password"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        placeholder="Please Confirm Password"
                      />
                    </Grid>
                  </Fade>

                  <Fade in={open} timeout={1900}>
                    <Grid item xs={12} sm={6}>
                      <FormControl fullWidth required>
                        <InputLabel>Technology</InputLabel>
                        <Select
                          name="technology"
                          value={formData.technology}
                          onChange={handleChange}
                          label="Technology"
                        >
                          <MenuItem value="">Please select Technology</MenuItem>
                          <MenuItem value="reactjs">React Js</MenuItem>
                          <MenuItem value=".net">.Net</MenuItem>
                          <MenuItem value="nodejs">Node Js</MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>
                  </Fade>

                  <Fade in={open} timeout={2000}>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label="Skype ID"
                        name="skypeId"
                        value={formData.skypeId}
                        onChange={handleChange}
                        placeholder="Enter Skype ID"
                      />
                    </Grid>
                  </Fade>

                  <Fade in={open} timeout={2100}>
                    <Grid item xs={12} sm={6}>
                      <FormControl fullWidth required>
                        <InputLabel>Employment Type</InputLabel>
                        <Select
                          name="employementType"
                          value={formData.employementType}
                          onChange={handleChange}
                          label="Employment Type"
                        >
                          <MenuItem value="">Please select EmployeementType</MenuItem>
                          <MenuItem value="full-time">Full Time</MenuItem>
                          <MenuItem value="part-time">Part Time</MenuItem>
                          <MenuItem value="contract">Contract</MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>
                  </Fade>

                  <Fade in={open} timeout={2200}>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        required
                        fullWidth
                        type="date"
                        label="Birth Date"
                        name="birthDate"
                        value={formData.birthDate}
                        onChange={handleChange}
                        InputLabelProps={{
                          shrink: true,
                        }}
                      />
                    </Grid>
                  </Fade>

                  <Fade in={open} timeout={2300}>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        required
                        fullWidth
                        type="date"
                        label="Joining Date"
                        name="joiningDate"
                        value={formData.joiningDate}
                        onChange={handleChange}
                        InputLabelProps={{
                          shrink: true,
                        }}
                      />
                    </Grid>
                  </Fade>

                  <Fade in={open} timeout={2400}>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        required
                        fullWidth
                        label="Aadhar Card"
                        name="aadharCard"
                        value={formData.aadharCard}
                        onChange={handleChange}
                        placeholder="Please Enter AadharCard Number"
                      />
                    </Grid>
                  </Fade>

                  <Fade in={open} timeout={2500}>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        required
                        fullWidth
                        label="PAN Card"
                        name="panCard"
                        value={formData.panCard}
                        onChange={handleChange}
                        placeholder="Please Enter PanCard Number"
                      />
                    </Grid>
                  </Fade>

                  <Fade in={open} timeout={2600}>
                    <Grid item xs={12} sm={6}>
                      <FormControl fullWidth required>
                        <InputLabel>Gender</InputLabel>
                        <Select
                          name="gender"
                          value={formData.gender}
                          onChange={handleChange}
                          label="Gender"
                        >
                          <MenuItem value="">Please select Gender</MenuItem>
                          <MenuItem value="male">Male</MenuItem>
                          <MenuItem value="female">Female</MenuItem>
                          <MenuItem value="other">Other</MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>
                  </Fade>

                  <Fade in={open} timeout={2700}>
                    <Grid item xs={12} sm={6}>
                      <FormControl fullWidth required>
                        <InputLabel>Role</InputLabel>
                        <Select
                          name="role"
                          value={formData.role}
                          onChange={handleChange}
                          label="ROLE"
                        >
                          <MenuItem value="">Please select Role</MenuItem>
                          <MenuItem value="director">Director</MenuItem>
                          <MenuItem value="developer">Developer</MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>
                  </Fade>
                  <Fade in={open} timeout={2800}>
                    <Grid item xs={12} sm={6}>
                      <Box sx={{ display: "flex", alignItems: "center" }}>
                        <TextField
                          fullWidth
                          required
                          type="file"
                          name="profilepic"
                          inputProps={{ accept: "image/*" }}
                          onChange={handleFileChange}
                          InputLabelProps={{
                            shrink: true,
                          }}
                          sx={{
                            '& input[type="file"]::-webkit-file-upload-button': {
                              bgcolor: isDarkMode ? '#2a2b40' : '#fff',
                              color: isDarkMode ? '#c7c7df' : '#566a7f',
                              border: 'none',
                              width: '130px',
                              margin: '-9px',
                              borderRadius: '5px',
                              cursor: 'pointer',
                              fontWeight: 'bold',
                            },
                            '& input[type="file"]': {
                              color: isDarkMode ? '#c7c7df' : '#778791'
                            },
                            '& input[type="file"]::file-selector-button': {
                              marginRight: '20px',
                            },
                          }}
                        />
                      </Box>

                      {/* Display the uploaded image (if any) */}
                      {profilePicBase64 && (
                        <Box sx={{ marginTop: '20px' }}>
                          <img
                            src={profilePicBase64}
                            alt="Profile Pic"
                            style={{ width: '100px', height: '100px', borderRadius: '50%' }}
                          />
                        </Box>
                      )}
                    </Grid>
                  </Fade>

                  <DialogActions sx={{ display: "flex", justifyContent: "end" }}>
                    <Button onClick={handleClose} color="primary">
                      Cancel
                    </Button>
                    <Button
                      type="submit"
                      variant="contained"
                      color="primary"
                      onClick={handleSubmit}
                      sx={{
                        transform: 'translateY(-2px)',
                        '&:hover': {
                          transform: 'translateY(-4px)',
                          transition: 'transform 0.3s ease'
                        }
                      }}
                    >
                      Save
                    </Button>
                  </DialogActions>
                </Grid>
              </DialogContent>
            </form>
          </div>
        </Fade>
      </Dialog>
    </ThemeProvider>
  );
};

export default EmployeeModal;
