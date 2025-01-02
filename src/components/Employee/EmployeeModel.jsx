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
  Box,
  useMediaQuery
} from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import CloseIcon from '@mui/icons-material/Close';
import { useTheme } from '../ThemeContext';
import axios from 'axios';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Grow ref={ref} {...props} timeout={700} />;
});

const EmployeeModal = ({ isOpen, onClose, employeeData }) => {
  const { isDarkMode } = useTheme();
  const [open, setOpen] = useState(false);
  const [profilePicBase64, setProfilePicBase64] = useState("");
  const isMobile = useMediaQuery('(max-width: 900px)');
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
    employmentType: '',
    birthDate: '',
    joiningDate: '',
    aadharCard: '',
    panCard: '',
    gender: '',
    role: '',
    profilepic: '',
  });
  const [error, setError] = useState(false);

  const theme = createTheme({
    palette: {
      mode: isDarkMode ? 'dark' : 'light',
      background: {
        default: isDarkMode ? '#121212' : '#fff',
        paper: isDarkMode ? '#232333' : '#fff',
      }
    }
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataToSubmit = new FormData();

    if (profilePicBase64) {
      const response = await fetch(profilePicBase64);
      const blob = await response.blob();
      const file = new File([blob], 'profilePic.jpg', { type: blob.type || 'image/jpeg' });
      formDataToSubmit.append('profilepic', file);
    }

    Object.keys(formData).forEach(key => {
      if (key !== 'profilepic') {
        formDataToSubmit.append(key, formData[key]);
      }
    });

    if (formData.password !== formData.confirmPassword) {
      setError(true);
      return;
    }

    try {
      const isEditing = !!employeeData;
      const url = isEditing
        ? `http://localhost:5000/api/employees/${employeeData._id}`
        : 'http://localhost:5000/api/employees';

      const method = isEditing ? 'put' : 'post';

      const response = await axios[method](url, formDataToSubmit, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      localStorage.setItem('token', response.data.token);

      setProfilePicBase64('');
      handleClose();
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };
  React.useEffect(() => {
    if (employeeData && !open) {
      setFormData({
        ...formData,
        firstName: employeeData.firstName || '',
        middleName: employeeData.middleName || '',
        lastName: employeeData.lastName || '',
        department: employeeData.department || '',
        designation: employeeData.designation || '',
        mobileNumber: employeeData.mobileNumber || '',
        officeEmail: employeeData.officeEmail || '',
        personalEmail: employeeData.personalEmail || '',
        password: '',
        confirmPassword: '',
        technology: employeeData.technology || '',
        skypeId: employeeData.skypeId || '',
        employmentType: employeeData.employmentType || '',
        birthDate: employeeData.birthDate ? employeeData.birthDate.split('T')[0] : '',
        joiningDate: employeeData.joiningDate ? employeeData.joiningDate.split('T')[0] : '',
        aadharCard: employeeData.aadharCard || '',
        panCard: employeeData.panCard || '',
        gender: employeeData.gender || '',
        role: employeeData.role || '',
        profilepic: '',
      });

     
      if (employeeData.profilePic) {
        
        setProfilePicBase64(employeeData.profilePic);
      } else {
        
        setProfilePicBase64('/path-to-default-profile-pic.jpg');
      }

      setOpen(true);
    }
  }, [employeeData]);


  const handleImageUpload = (event) => {
    const file = event.target.files[0];

    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        alert('File is too large. Max size is 5MB.');
        return;
      }

      const allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];
      if (!allowedTypes.includes(file.type)) {
        alert('Only JPEG, PNG, and GIF images are allowed.');
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePicBase64(reader.result);
      };
      reader.readAsDataURL(file);

      setFormData(prevState => ({
        ...prevState,
        profilepic: file
      }));
    }
  };

  const handleOpen = () => setOpen(true);
  
  React.useEffect(() => {
    setOpen(isOpen);
  }, [isOpen]);

  const handleClose = () => {
    setOpen(false);
    if (onClose) onClose();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  const dialogTitle = employeeData ? 'Edit Employee' : 'Add New Employee';
  const button = employeeData ? 'Update' : 'Save';


  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {!employeeData && !open && (
        <Button
          variant="contained"
          startIcon={<AddCircleIcon />}
          onClick={() => setOpen(true)}
          style={{ height: isMobile ? "45px" : "45px", width: isMobile ? "90px" : "170px", backgroundColor: "#696cff", color: 'white' }}
        >
          {isMobile ? 'Add' : 'Add Employee'}
        </Button>
      )}
      <Dialog
        open={open}
        onClose={handleClose}
        maxWidth="md"
        fullWidth
        TransitionComponent={Transition}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{ timeout: 500 }}
      >
        <DialogTitle>
          {dialogTitle}
          <IconButton
            onClick={handleClose}
            sx={{ position: 'absolute', right: 8 }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>

        <form onSubmit={handleSubmit}>
          <DialogContent dividers>
            <Grid container spacing={3}>
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
                      <MenuItem value="Trainee">Trainee</MenuItem>
                      <MenuItem value=".netdeveloper">.Net Developer</MenuItem>
                      <MenuItem value="reactdeveloper">React Developer</MenuItem>
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

              <Fade in={open} timeout={1900}>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth required>
                    <InputLabel>Employment Type</InputLabel>
                    <Select
                      name="employmentType"
                      value={formData.employmentType}
                      onChange={handleChange}
                      label="Employment Type"
                    >
                      <MenuItem value="">Please select Type</MenuItem>
                      <MenuItem value="fulltime">Full-Time</MenuItem>
                      <MenuItem value="parttime">Part-Time</MenuItem>
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
                      type="file"
                      label="Profile Picture"
                      name="profilepic"
                      inputProps={{ accept: "image/jpeg,image/png,image/gif" }}
                      onChange={handleImageUpload}
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />
                    <Box
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
                  {button}
                </Button>
              </DialogActions>
            </Grid>
          </DialogContent>
        </form>
      </Dialog >
    </ThemeProvider >
  );
};

export default EmployeeModal;
