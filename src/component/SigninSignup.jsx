import React, { useState } from 'react';
import axios from 'axios';
import { TextField, Typography, Button, Link, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Google, Lock } from '@mui/icons-material'; // Import Google and Lock icons from MUI
import signInImage from './images/singinform2.jpg'; // Replace with actual path
import signUpImage from './images/signinform.jpg'; // Replace with actual path
import bgimage from './images/signinbg.jpg';

const SigninSignup = () => {
  const [isSignIn, setIsSignIn] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const handleToggle = () => {
    setIsSignIn(!isSignIn);
    setErrorMessage('');
  };

  const handleSignIn = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8080/api/auth/login', { email, password });
      alert('Login successful');
      navigate('/home'); // Navigate to home page on successful sign-in
    } catch (error) {
      setErrorMessage('Invalid credentials');
    }
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8080/api/auth/register', {
        firstname: firstName,
        lastname: lastName,
        username: `${firstName} ${lastName}`,
        email,
        password
      });
      alert('Registration successful');
      navigate('/home'); // Navigate to home page on successful sign-up
    } catch (error) {
      console.error('Signup error:', error.response ? error.response.data : error.message);
      if (error.response && error.response.status === 409) {
        setErrorMessage('User already exists');
      } else {
        setErrorMessage('An error occurred');
      }
    }
  };

  const handleForgotPassword = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Box 
      display="flex" 
      flexDirection="row"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
      sx={{
        backgroundImage: `url(${bgimage})`, // Correctly reference background image
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        padding: 2,
        color: 'black',
      }}
    >
      <Box
        display="flex"
        flexDirection={isSignIn ? 'row' : 'row-reverse'}
        alignItems="center"
        sx={{ 
          maxWidth: '800px', 
          width: '100%', 
          borderRadius: '8px',
          overflow: 'hidden',
          boxShadow: '0 0 10px rgba(0,0,0,0.2)',
          backgroundColor: 'white',
          padding: 2,
          marginLeft:'80px',
        }}
      >
        {isSignIn && (
          <Box 
            component="img" 
            src={signInImage} 
            alt="Sign In" 
            sx={{ 
              flex: 1, 
              height: '400px',
              objectFit: 'cover',
              maxWidth: '350px'
            }} 
          />
        )}
        <Box
          flex={2}
          display="flex"
          flexDirection="column"
          alignItems="center"
          p={2}
        >
          {isSignIn ? (
            <form onSubmit={handleSignIn} style={{ width: '100%' }}>
              <Typography variant="h4" style={{ display: 'flex', alignItems: 'center' }}>
                <Lock sx={{ marginRight: '8px' }} /> Sign In
              </Typography>
              <TextField
                label="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                fullWidth
                margin="normal"
                InputProps={{ style: { color: 'black' } }}
              />
              <TextField
                label="Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                fullWidth
                margin="normal"
                InputProps={{ style: { color: 'black' } }}
              />
              <Link component="button" onClick={handleForgotPassword} style={{ marginTop: '10px', marginBottom: '10px' }}>
                Forgot Password?
              </Link>
              {errorMessage && <Typography color="error">{errorMessage}</Typography>}
              <Button type="submit" variant="contained" color="primary" fullWidth>
                Sign In
              </Button>
              <Typography variant="body2" style={{ marginTop: '10px', textAlign: 'center' }}>
                or
              </Typography>
              <Button 
                variant="outlined" 
                color="primary" 
                fullWidth
                sx={{ marginTop: '10px', display: 'flex', alignItems: 'center' }}
                startIcon={<Google />}
              >
                Sign In with Google
              </Button>
              <Typography variant="body2" style={{ marginTop: '10px', textAlign: 'center' }}>
                Don't have an account? <Link component="button" onClick={handleToggle}>Sign Up</Link>
              </Typography>
            </form>
          ) : (
            <form onSubmit={handleSignUp} style={{ width: '100%' }}>
              <Typography variant="h4" style={{ display: 'flex', alignItems: 'center' }}>
                <Lock sx={{ marginRight: '8px' }} /> Sign Up
              </Typography>
              <TextField
                label="First Name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                fullWidth
                margin="normal"
                InputProps={{ style: { color: 'black' } }}
              />
              <TextField
                label="Last Name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                fullWidth
                margin="normal"
                InputProps={{ style: { color: 'black' } }}
              />
              <TextField
                label="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                fullWidth
                margin="normal"
                InputProps={{ style: { color: 'black' } }}
              />
              <TextField
                label="Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                fullWidth
                margin="normal"
                InputProps={{ style: { color: 'black' } }}
              />
              {errorMessage && <Typography color="error">{errorMessage}</Typography>}
              <Button type="submit" variant="contained" color="primary" fullWidth>
                Sign Up
              </Button>
              <Typography variant="body2" style={{ marginTop: '10px', textAlign: 'center' }}>
                or
              </Typography>
              <Button 
                variant="outlined" 
                color="primary" 
                fullWidth
                sx={{ marginTop: '10px', display: 'flex', alignItems: 'center' }}
                startIcon={<Google />}
              >
                Sign Up with Google
              </Button>
              <Typography variant="body2" style={{ marginTop: '10px', textAlign: 'center' }}>
                Already have an account? <Link component="button" onClick={handleToggle}>Sign In</Link>
              </Typography>
            </form>
          )}
        </Box>
        {!isSignIn && (
          <Box 
            component="img" 
            src={signUpImage} 
            alt="Sign Up" 
            sx={{ 
              flex: 1, 
              height: '520px',
              objectFit: 'cover',
              maxWidth: '350px'
            }} 
          />
        )}
      </Box>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Forgot Password</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To reset your password, please enter your email address here. We will send updates
            occasionally.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            label="Email Address"
            type="email"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleClose}>Submit</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default SigninSignup;
