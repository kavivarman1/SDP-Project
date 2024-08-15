import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles'; // Corrected imports
import CssBaseline from '@mui/material/CssBaseline'; // Corrected import
import AdminPage from './component/Admin/AdminPage';
import UserManagement from './component/Admin/UserManagement';
import TurfManagement from './component/Admin/TurfManagement';
import Feedback from './component/Admin/AcceptedTable';
import Partners from './component/Admin/Partners';
import Home from './component/Home';
import BookingPage from './component/BookingPage';
import SignInSignUp from './component/SigninSignup';
import BookingForm from './component/BookingForm';
import Navbar from './component/Navbar';
import Advertisement from './component/Advertise';
import AdminSignin from './component/AdminSignin';
import AboutUs from './component/AboutUs';
import ContactUs from './component/ContactUs';
import TurfCard from './component/TurfCard';

const theme = createTheme({
  palette: {
    mode: 'light', // or 'dark'
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
    success: {
      main: '#4caf50',
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Navbar /> {/* Added Navbar */}
        <Routes>
          <Route path="/home" element={<Home/>} />
          <Route path="/advertise" element={<Advertisement />} />
          <Route path="/booking/:id" element={<BookingPage />} />
          <Route path="/booking" element={<BookingPage />} />
          <Route path="/signin-signup" element={<SignInSignUp type="user" />} />
          <Route path="/admin-signin" element={<AdminSignin />} /> 
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/contact-us" element={<ContactUs />} /> 
          <Route path="/AdminPage" element={<AdminPage />} />
          <Route path="/booking/:id" element={<BookingPage />} />
          {/* Add other routes here */}
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
  