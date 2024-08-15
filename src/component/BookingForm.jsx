import React, { useState } from 'react';
import './BookingForm.css'; // Import the CSS file for styling
import img from './images/Booking copy.png';
import { MenuItem, Select, FormControl, InputLabel, InputAdornment } from '@mui/material';
import { Google, Payment, Phone, ErrorOutline, CheckCircle } from '@mui/icons-material';
import axios from 'axios'; // Ensure you have axios installed

const BookingForm = ({ turfName, turfId }) => { // Add turfId as prop
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    contactNumber: '',
    date: '',
    fromTime: '',
    toTime: '',
    numberOfPlayers: '',
    paymentMethod: '',
    turfName: turfName || '', // Include turfName in the form data
    turfId: turfId || '' // Include turfId in the form data
  });

  const [showError, setShowError] = useState(false);
  const [bookingSuccess, setBookingSuccess] = useState(false); // New state variable

  const availableTimes = [
    '5:00 AM', '6:00 AM', '7:00 AM', '8:00 AM', '9:00 AM', '10:00 AM', '11:00 AM',
    '12:00 PM', '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM', '6:00 PM',
    '7:00 PM', '8:00 PM', '9:00 PM', '10:00 PM'
  ];

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleTimeChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value }, validateTimes);
  };

  const validateTimes = () => {
    const { fromTime, toTime } = formData;
    if (!fromTime || !toTime) return false;

    const fromIndex = availableTimes.indexOf(fromTime);
    const toIndex = availableTimes.indexOf(toTime);

    if (fromIndex >= toIndex) {
      setShowError(true);
      return false;
    } else {
      setShowError(false);
      return true;
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!validateTimes()) return;

    axios.post('http://localhost:8080/api/bookings', formData)
      .then(response => {
        console.log('Booking successful:', response.data);
        setBookingSuccess(true); // Set bookingSuccess to true on successful booking
      })
      .catch(error => {
        console.error('Error booking turf:', error);
      });
  };

  return (
    <div className="booking-page">
      <div className="image-container">
        <img src={img} alt="Turf" className="page-image" />
        <div className="booking-box">
          <h2 className="booking-title">Book {turfName}</h2> {/* Use dynamic turf name */}
          <form className="booking-form" onSubmit={handleSubmit}>
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />

            <label htmlFor="contactNumber">Contact Number:</label>
            <input
              type="text"
              id="contactNumber"
              name="contactNumber"
              value={formData.contactNumber}
              onChange={handleChange}
              required
            />

            <label htmlFor="date">Date:</label>
            <input
              type="date"
              id="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              required
            />

            <label htmlFor="from-time">From:</label>
            <FormControl fullWidth margin="normal">
              <Select
                id="from-time"
                name="fromTime"
                value={formData.fromTime}
                onChange={handleTimeChange}
                required
              >
                {availableTimes.map((time, index) => (
                  <MenuItem key={index} value={time}>
                    {time}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <label htmlFor="to-time">To:</label>
            <FormControl fullWidth margin="normal">
              <Select
                id="to-time"
                name="toTime"
                value={formData.toTime}
                onChange={handleTimeChange}
                required
              >
                {availableTimes.map((time, index) => (
                  <MenuItem key={index} value={time}>
                    {time}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            {showError && (
              <div className="error-message">
                <ErrorOutline style={{ color: 'red', marginRight: '5px' }} />
                <span style={{ color: 'red' }}>Check the timing</span>
              </div>
            )}

            <label htmlFor="players">Number of Players:</label>
            <input
              type="number"
              id="numberOfPlayers"
              name="numberOfPlayers"
              value={formData.numberOfPlayers}
              onChange={handleChange}
              max="100"
              required
            />

            <FormControl fullWidth margin="normal">
              <InputLabel>Payment Method</InputLabel>
              <Select
                name="paymentMethod" // Add name attribute
                value={formData.paymentMethod}
                onChange={handleChange} // Use handleChange function
                startAdornment={
                  <InputAdornment position="start">
                    {formData.paymentMethod === 'GPay' && <Google />}
                    {formData.paymentMethod === 'Paytm' && <Payment />}
                    {formData.paymentMethod === 'PhonePay' && <Phone />}
                  </InputAdornment>
                }
              >
                <MenuItem value="GPay">
                  <Google /> GPay
                </MenuItem>
                <MenuItem value="Paytm">
                  <Payment /> Paytm
                </MenuItem>
                <MenuItem value="PhonePay">
                  <Phone /> PhonePay
                </MenuItem>
              </Select>
            </FormControl>

            <button type="submit" className="submit-button">Book Now</button>
          </form>

          {bookingSuccess && (
            <div className="success-message">
              <CheckCircle style={{ color: 'green', marginRight: '5px' }} />
              <span style={{ color: 'green' }}>Booking successful!</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookingForm;