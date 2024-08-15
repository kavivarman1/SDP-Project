import React, { useState } from 'react';
import { Box, Drawer, List, ListItem, ListItemText, Toolbar, AppBar, Typography, Card, CardContent, IconButton, Button } from '@mui/material';
import { AccountCircle, Logout, Notifications } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import PieActiveArc from './PieActiveArc'; // Custom PieChart for turf booking
import BarAnimation from './BarAnimation'; // Custom BarChart for turf booking
import UserManagement from './UserManagement';
import Logo from './logo.jpeg'; // Logo for the admin page
import TurfManagement from './TurfManagement';
import Partners from './AcceptedTable'; // Rename Feedback to Partners

const drawerWidth = 240;

const AdminPage = () => {
  const [open, setOpen] = useState(true);
  const [currentPage, setCurrentPage] = useState('Dashboard');
  const navigate = useNavigate();

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleLogout = () => {
    // Add logout logic here if needed
    navigate('/home');
  };

  const renderContent = () => {
    switch (currentPage) {
      case 'Dashboard':
        return (
          <>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
              <Card sx={{ flex: '1 1 30%', mr: 2, backgroundColor: '#6495ED', color: 'white' }}>
                <CardContent>
                  <Typography variant="h5" component="div">
                    Total Bookings
                  </Typography>
                  <Typography variant="body2">
                    150 {/* Example number, replace with actual data */}
                  </Typography>
                </CardContent>
              </Card>
              <Card sx={{ flex: '1 1 30%', mr: 2, backgroundColor: 'violet', color: 'white' }}>
                <CardContent>
                  <Typography variant="h5" component="div">
                    Total Turf Listings
                  </Typography>
                  <Typography variant="body2">
                    50 {/* Example number, replace with actual data */}
                  </Typography>
                </CardContent>
              </Card>
              <Card sx={{ flex: '1 1 30%', backgroundColor: '#E57373', color: 'white' }}>
                <CardContent>
                  <Typography variant="h5" component="div">
                    Total Revenue
                  </Typography>
                  <Typography variant="body2">
                    5,000 {/* Example number, replace with actual data */}
                  </Typography>
                </CardContent>
              </Card>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
              <Box sx={{ flex: '1 1 45%', maxWidth: '45%' }}>
                <BarAnimation /> {/* Adjust this component to show relevant data */}
              </Box>
              <Box sx={{ flex: '1 1 45%', maxWidth: '45%' }}>
                <PieActiveArc /> {/* Adjust this component to show relevant data */}
              </Box>
            </Box>
          </>
        );
      case 'Partners':
        return <Partners />;
      case 'User Management':
        return <UserManagement />;
      case 'Turf Management':
        return <TurfManagement />;
      default:
        return <Typography variant="h4">Welcome to the Admin Page</Typography>;
    }
  };

  return (
    <Box sx={{ marginRight: '5%' }}>
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          pr: 2,
          backgroundColor: '#00274d', // Set background color to navy blue
        }}
      >
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
          <Box>
            <Typography variant="h6" noWrap component="div">
              Pure Play
            </Typography>
          </Box>
          <Box sx={{ flexGrow: 1 }} /> {/* This pushes the icon to the right */}
          <IconButton edge="end" sx={{ color: '#fff' }}>
            <Notifications />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
            backgroundColor: '#00274d', // Set background color to navy blue
            color: '#fff', // Set text color to white for better contrast
            backdropFilter: 'blur(5px)', // Optional: Add a blur effect to the background
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <Toolbar />
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            mt: 4,
            mb: 2,
          }}
        >
          <img src={Logo} alt="Logo" style={{ width: '80px', height: '80px', borderRadius: '50%' }} />
          <IconButton edge="end" sx={{ mt: 2, color: '#fff' }}> {/* Set icon color to white */}
            <AccountCircle />
          </IconButton>
        </Box>
        <List>
          {['Dashboard', 'User Management', 'Turf Management', 'Partners'].map((text) => (
            <ListItem button key={text} onClick={() => handlePageChange(text)}>
              <ListItemText primary={text} sx={{ color: '#fff' }} /> {/* Set text color to white */}
            </ListItem>
          ))}
        </List>
        <Box sx={{ position: 'absolute', bottom: 16, width: '100%', px: 2 }}>
          <Button
            variant="contained"
            color="error"
            fullWidth
            onClick={handleLogout}
            sx={{ 
              color: '#fff',
              textTransform: 'none',
            }}
          >
            <Logout sx={{ marginRight: '8px' }} />
            Logout
          </Button>
        </Box>
      </Drawer>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        }}
      >
        <Toolbar />
        {renderContent()}
      </Box>
    </Box>
  );
};

export default AdminPage;
