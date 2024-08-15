import React, { useState } from 'react';
import { TextField, Button, Typography, Container } from '@mui/material';
import contactBackground from './images/contactus.jpg'; // Import your background image
import Footer from './Footer';
const ContactUs = () => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle form submission logic here
    console.log('Form submitted:', form);
  };

  return (
    <div
      style={{
        backgroundImage: `url(${contactBackground})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight: '100vh',
        padding: '20px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'white',
      }}
    >
      <Container
        style={{
          backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background for the form
          padding: '20px',
          borderRadius: '8px',
          width: '100%',
          maxWidth: '600px',
        }}
      >
        <Typography variant="h4" gutterBottom>
          Contact Us
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Name"
            name="name"
            value={form.name}
            onChange={handleChange}
            fullWidth
            variant="outlined"
            margin="normal"
            required
            style={{ backgroundColor: 'white' }}
          />
          <TextField
            label="Email"
            name="email"
            value={form.email}
            onChange={handleChange}
            fullWidth
            variant="outlined"
            margin="normal"
            type="email"
            required
            style={{ backgroundColor: 'white' }}
          />
          <TextField
            label="Message"
            name="message"
            value={form.message}
            onChange={handleChange}
            fullWidth
            variant="outlined"
            margin="normal"
            multiline
            rows={4}
            required
            style={{ backgroundColor: 'white' }}
          />
          <Button type="submit" variant="contained" color="primary" style={{ marginTop: '16px' }}>
            Send Message
          </Button>
        </form>
      </Container>
    </div>
  );
};

export default ContactUs;
