
import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

const ForgotPassword = ({ open, handleClose }) => {
  const handleSubmit = (event) => {
    event.preventDefault();
   
    handleClose(); 
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Forgot Password</DialogTitle>
      <form onSubmit={handleSubmit}>
        <TextField
          autoFocus
          margin="dense"
          label="Email Address"
          type="email"
          fullWidth
          required
        />
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit">Send Reset Link</Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default ForgotPassword;
