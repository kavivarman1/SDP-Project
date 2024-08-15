import React, { useState } from 'react';
import { TextField, Button, Typography, Paper, Snackbar, Select, MenuItem, InputLabel, FormControl, OutlinedInput, Chip, IconButton } from '@mui/material';
import { Alert } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import './Advertise.css';

const sportsOptions = [
  'Football (Soccer)', 'Cricket', 'Rugby', 'Field Hockey', 'American Football', 'Lacrosse', 'Tennis', 
  'Baseball', 'Softball', 'Ultimate Frisbee', 'Gaelic Football', 'Australian Rules Football', 'Touch Rugby', 
  'Golf Practice (Driving Range)', 'Futsal', 'Athletics', 'Running/Walking Tracks', 
  'Multi-sport Training', 'Volleyball', 'Badminton', 'Archery'
];

const Advertisement = () => {
  const [formData, setFormData] = useState({
    turfName: '',
    ownerName: '',
    location: '',
    totalSqFeet: '',
    contactNumber: '',
    whatsappNumber: '',
    email: '',
    perHour: '',
    availableSports: [],
    image: null,
    imageName: '',
    password: '',
  });
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');

  // Handle input field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  // Handle Available Sports change
  const handleSportsChange = (event) => {
    const { value } = event.target;
    setFormData((prevData) => ({ 
      ...prevData, 
      availableSports: typeof value === 'string' ? value.split(',') : value 
    }));
  };

  // Remove sport from the list
  const handleRemoveSport = (sportToRemove) => {
    setFormData((prevData) => ({
      ...prevData,
      availableSports: prevData.availableSports.filter(sport => sport !== sportToRemove)
    }));
  };

  // Handle file input changes
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prevData) => ({ ...prevData, image: file, imageName: file.name }));
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataToSend = new FormData();
    Object.keys(formData).forEach((key) => {
      if (key === 'availableSports') {
        formDataToSend.append(key, formData[key].join(','));
      } else {
        formDataToSend.append(key, formData[key] || '');
      }
    });

    try {
      const response = await fetch('http://localhost:8080/api/advertisements/advertise', {
        method: 'POST',
        body: formDataToSend,
      });

      if (response.ok) {
        const result = await response.text();
        setSnackbarMessage('Advertisement submitted successfully!');
        setSnackbarMessage('Email will be sent within 24hrs!');
        setSnackbarSeverity('success');
        setFormData({
          turfName: '',
          ownerName: '',
          location: '',
          totalSqFeet: '',
          contactNumber: '',
          whatsappNumber: '',
          email: '',
          perHour: '',
          availableSports: [],
          image: null,
          imageName: '',
          password: '',
        });
      } else {
        const errorBody = await response.text();
        setSnackbarMessage(`Failed to submit advertisement: ${errorBody}`);
        setSnackbarSeverity('error');
      }
    } catch (error) {
      setSnackbarMessage(`An error occurred while submitting: ${error.message}`);
      setSnackbarSeverity('error');
    } finally {
      setSnackbarOpen(true);
    }
  };

  // Close Snackbar
  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  return (
    <div className="advertisement-page">
      <Paper className="advertisement-container">
        <Typography variant="h4" className="advertisement-title">Advertise Your Turf</Typography>
        <form onSubmit={handleSubmit} className="advertisement-form">
          <TextField
            name="turfName"
            label="Turf Name"
            variant="outlined"
            fullWidth
            margin="normal"
            value={formData.turfName}
            onChange={handleChange}
          />

          <TextField
            name="ownerName"
            label="Owner Name"
            variant="outlined"
            fullWidth
            margin="normal"
            value={formData.ownerName}
            onChange={handleChange}
          />

          <TextField
            name="location"
            label="Location"
            variant="outlined"
            fullWidth
            margin="normal"
            value={formData.location}
            onChange={handleChange}
          />

          <TextField
            type="number"
            name="totalSqFeet"
            label="Total sq.feet"
            variant="outlined"
            fullWidth
            margin="normal"
            value={formData.totalSqFeet}
            onChange={handleChange}
          />

          <TextField
            type="number"
            name="perHour"
            label="Price Per Hour"
            variant="outlined"
            fullWidth
            margin="normal"
            value={formData.perHour}
            onChange={handleChange}
          />

          <FormControl variant="outlined" fullWidth margin="normal">
            <InputLabel id="available-sports-label">Available Sports</InputLabel>
            <Select
              labelId="available-sports-label"
              id="available-sports"
              multiple
              value={formData.availableSports}
              onChange={handleSportsChange}
              input={<OutlinedInput id="select-multiple-chip" label="Available Sports" />}
              renderValue={(selected) => (
                <div className="chips">
                  {selected.map((value) => (
                    <Chip
                      key={value}
                      label={value}
                      className="chip"
                      onDelete={() => handleRemoveSport(value)}
                      deleteIcon={<CloseIcon />}
                    />
                  ))}
                </div>
              )}
            >
              {sportsOptions.map((sport) => (
                <MenuItem key={sport} value={sport}>
                  {sport}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <TextField
            name="contactNumber"
            label="Contact Number"
            variant="outlined"
            fullWidth
            margin="normal"
            value={formData.contactNumber}
            onChange={handleChange}
          />

          <TextField
            name="whatsappNumber"
            label="Whatsapp Number"
            variant="outlined"
            fullWidth
            margin="normal"
            value={formData.whatsappNumber}
            onChange={handleChange}
          />

          <TextField
            name="email"
            label="Email"
            variant="outlined"
            fullWidth
            margin="normal"
            value={formData.email}
            onChange={handleChange}
          />

          <TextField
            name="password"
            label="Password"
            type="password"
            variant="outlined"
            fullWidth
            margin="normal"
            value={formData.password}
            onChange={handleChange}
          />

          <input
            accept="image/*"
            type="file"
            id="upload-button-file"
            style={{ display: 'none' }}
            onChange={handleFileChange}
          />
          <label htmlFor="upload-button-file">
            <Button variant="contained" component="span" className="upload-button">
              Upload Turf Image
            </Button>
            {formData.imageName && (
              <Typography variant="body2" className="file-name">
                {formData.imageName}
              </Typography>
            )}
          </label>

          <Button type="submit" variant="contained" color="primary" className="submit-button">
            Submit
          </Button>
        </form>
      </Paper>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default Advertisement;
