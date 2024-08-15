import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import Language from '@mui/icons-material/Language';
import ProfileIcon from '@mui/icons-material/AccountCircle';
import Popper from '@mui/material/Popper';
import Paper from '@mui/material/Paper';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import logo from './images/logo.jpeg';
import axios from 'axios';

const languages = [
  { code: 'en', label: 'English' },
  { code: 'es', label: 'Spanish' },
  { code: 'fr', label: 'French' },
];

const Navbar = () => {
  const [languageAnchorEl, setLanguageAnchorEl] = useState(null);
  const [loginAnchorEl, setLoginAnchorEl] = useState(null);
  const [profileAnchorEl, setProfileAnchorEl] = useState(null);
  const [languageOpen, setLanguageOpen] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [darkTheme, setDarkTheme] = useState(false);
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await axios.get('/api/auth/current-user');
        if (response.status === 200) {
          setUserName(response.data.username);
          setUserEmail(response.data.email);
        }
      } catch (error) {
        console.error('Error fetching user details:', error);
      }
    };

    fetchUserDetails();
  }, []);

  const handleLanguageIconClick = (event) => {
    setLanguageAnchorEl(event.currentTarget);
    setLanguageOpen((prev) => !prev);
  };

  const handleLoginIconClick = (event) => {
    setLoginAnchorEl(event.currentTarget);
    setLoginOpen((prev) => !prev);
  };

  const handleProfileClick = (event) => {
    setProfileAnchorEl(event.currentTarget);
    setProfileOpen((prev) => !prev);
  };

  const handleClickAway = () => {
    setLanguageOpen(false);
    setLoginOpen(false);
    setProfileOpen(false);
  };

  const handleLoginSignupSelect = (type) => {
    if (type === 'admin') {
      navigate('/admin-signin');
    } else {
      navigate('/signin-signup', { state: { type } });
    }
    setLoginOpen(false);
  };

  const toggleDarkTheme = () => {
    setDarkTheme((prev) => !prev);
  };

  const handleAdvertiseClick = () => {
    navigate('/advertise');
  };

  return (
    <AppBar
      position="sticky"
      sx={{ 
        backgroundColor: 'white', 
        width: '100%', 
        boxShadow: 'none', // Remove the box shadow
        borderBottom: 'none' // Remove any border that may look like a box
      }}
      className="navbar"
    >
      <Toolbar>
        <div className="navbar-left" style={{ flex: 1, display: 'flex', alignItems: 'center' }}>
          <img
            src={logo}
            alt="Logo"
            className="logo"
            style={{ height: '40px', marginRight: '10px', borderRadius: '20px' }}
          />
          <Typography variant="h6" sx={{ fontWeight: 'bold', color: 'black', marginRight: '20px' }}>
            Pure Play
          </Typography>
        </div>

        <div className="navbar-center" style={{ display: 'flex', alignItems: 'center' }}>
          <Button
            color="inherit"
            onClick={() => navigate('/home')}
            sx={{ 
              color: 'black', 
              fontWeight: 'bold', 
              '&:hover': { color: 'blue' }
            }}
          >
            Home
          </Button>
        </div>

        <div className="navbar-right" style={{ display: 'flex', alignItems: 'center' }}>
          <Button
            color="inherit"
            onClick={handleAdvertiseClick}
            sx={{ 
              color: 'black', 
              fontWeight: 'bold', 
              '&:hover': { color: 'blue' }
            }}
          >
            Advertise
          </Button>
          <Button
            color="inherit"
            onClick={() => navigate('/about-us')}
            sx={{ 
              color: 'black', 
              fontWeight: 'bold', 
              '&:hover': { color: 'blue' }
            }}
          >
            About Us
          </Button>
          <Button
            color="inherit"
            onClick={() => navigate('/contact-us')}
            sx={{ 
              color: 'black', 
              fontWeight: 'bold', 
              '&:hover': { color: 'blue' }
            }}
          >
            Contact Us
          </Button>
          <IconButton
            color="inherit"
            onClick={handleLanguageIconClick}
            sx={{ 
              color: 'black', 
              '&:hover': { color: 'blue' }
            }}
          >
            <Language />
          </IconButton>
          <Popper
            open={languageOpen}
            anchorEl={languageAnchorEl}
            placement="bottom-start"
            disablePortal
            modifiers={[
              {
                name: 'offset',
                options: {
                  offset: [0, 10],
                },
              },
            ]}
          >
            <ClickAwayListener onClickAway={handleClickAway}>
              <Paper className="language-dropdown">
                <Autocomplete
                  options={languages}
                  getOptionLabel={(option) => option.label}
                  renderInput={(params) => <TextField {...params} label="Search language" />}
                />
              </Paper>
            </ClickAwayListener>
          </Popper>
          <Button
            color="inherit"
            onClick={handleLoginIconClick}
            sx={{ 
              color: 'black', 
              fontWeight: 'bold', 
              '&:hover': { color: 'blue' }
            }}
          >
            Login/Signup
          </Button>
          <Popper
            open={loginOpen}
            anchorEl={loginAnchorEl}
            placement="bottom-end"
            disablePortal
            style={{ zIndex: 1300 }}
          >
            <ClickAwayListener onClickAway={handleClickAway}>
              <Paper
                style={{
                  padding: '16px',
                  minWidth: '150px',
                  position: 'absolute',
                  right: 0,
                  top: '100%',
                  boxShadow: '0 2px 10px rgba(0, 0, 0, 0.2)',
                }}
              >
                <Button fullWidth onClick={() => handleLoginSignupSelect('user')} sx={{ fontWeight: 'bold', color: 'black', '&:hover': { color: 'blue' } }}>
                  User
                </Button>
                <Button fullWidth onClick={() => handleLoginSignupSelect('admin')} sx={{ fontWeight: 'bold', color: 'black', '&:hover': { color: 'blue' } }}>
                  Admin
                </Button>
              </Paper>
            </ClickAwayListener>
          </Popper>
          <IconButton
            color="inherit"
            onClick={handleProfileClick}
            sx={{ 
              color: 'black', 
              '&:hover': { color: 'blue' }
            }}
          >
            <ProfileIcon />
          </IconButton>
          <Popper
            open={profileOpen}
            anchorEl={profileAnchorEl}
            placement="bottom-end"
            disablePortal
            style={{ zIndex: 1300 }}
          >
            <ClickAwayListener onClickAway={handleClickAway}>
              <Paper
                style={{
                  padding: '16px',
                  minWidth: '200px',
                  position: 'absolute',
                  right: 0,
                  top: '100%',
                  boxShadow: '0 2px 10px rgba(0, 0, 0, 0.2)',
                }}
              >
                <Typography variant="body1" sx={{ fontWeight: 'bold', color: 'black' }}>{userName}</Typography>
                <Typography variant="body2" sx={{ fontWeight: 'bold', color: 'black' }}>{userEmail}</Typography>
              </Paper>
            </ClickAwayListener>
          </Popper>
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
