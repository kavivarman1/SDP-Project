import React, { useState } from 'react';
import { TextField, Typography, Button, Link, Box, Alert } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Lock } from '@mui/icons-material'; // Import Lock icon from MUI
import adminSignInImage from './images/signinform.jpg'; // Replace with actual path
import bgimage from './images/signinbg.jpg';

const AdminSignin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [formError, setFormError] = useState('');
  const navigate = useNavigate();

  const handleSignIn = (e) => {
    e.preventDefault();
    
    // Reset errors
    setEmailError(false);
    setPasswordError(false);
    setFormError('');

    // Validate email and password
    if (!email || !password) {
      setFormError('Please fill all the fields.');
      if (!email) setEmailError(true);
      if (!password) setPasswordError(true);
      return;
    }

    if (password.length < 8) {
      setFormError('Password must be at least 8 characters.');
      setPasswordError(true);
      return;
    }

    // Navigate to AdminPage directly without authentication
    navigate('/AdminPage');
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
        flexDirection="row"
        alignItems="center"
        sx={{ 
          maxWidth: '800px', 
          width: '100%', 
          borderRadius: '8px',
          overflow: 'hidden',
          boxShadow: '0 0 10px rgba(0,0,0,0.2)',
          backgroundColor: 'white',
          padding: 2,
          marginLeft: '80px',
        }}
      >
        <Box 
          component="img" 
          src={adminSignInImage} 
          alt="Admin Sign In" 
          sx={{ 
            flex: 1, 
            height: '400px',
            objectFit: 'cover',
            maxWidth: '350px'
          }} 
        />
        <Box
          flex={2}
          display="flex"
          flexDirection="column"
          alignItems="center"
          p={2}
        >
          <form onSubmit={handleSignIn} style={{ width: '100%' }}>
            <Typography variant="h4" style={{ display: 'flex', alignItems: 'center' }}>
              <Lock sx={{ marginRight: '8px' }} /> Admin Sign In
            </Typography>
            
            {formError && (
              <Alert severity="error" sx={{ width: '100%', marginBottom: '10px' }}>
                {formError}
              </Alert>
            )}

            <TextField
              label="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              fullWidth
              margin="normal"
              InputProps={{ style: { color: 'black' } }}
              error={emailError}
              helperText={emailError ? 'Email is required' : ''}
            />
            <TextField
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              fullWidth
              margin="normal"
              InputProps={{ style: { color: 'black' } }}
              error={passwordError}
              helperText={passwordError ? 'Password must be at least 8 characters' : ''}
            />
            <Button type="submit" variant="contained" color="primary" fullWidth>
              Sign In
            </Button>
            <Typography variant="body2" style={{ marginTop: '10px', textAlign: 'center' }}>
              Go back to <Link href="/" color="primary">Home</Link>
            </Typography>
          </form>
        </Box>
      </Box>
    </Box>
  );
};

export default AdminSignin;
