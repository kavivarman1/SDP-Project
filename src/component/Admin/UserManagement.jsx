import React, { useEffect, useState } from 'react';
import axios from 'axios';

const UserManagement = () => {
    const [bookings, setBookings] = useState([]);

    useEffect(() => {
        fetchBookings();
    }, []);

    const fetchBookings = async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/bookings');
            setBookings(response.data);
        } catch (error) {
            console.error('Error fetching bookings:', error);
        }
    };

    const tableStyle = {
        width: '100%',
        borderCollapse: 'collapse',
        margin: '25px 0',
        fontSize: '18px',
        textAlign: 'left',
        boxShadow: '0 0 20px rgba(0, 0, 0, 0.1)',
        animation: 'fadeIn 1s ease-in-out',
    };

    const headerStyle = {
        backgroundColor: '#C8102E',
        color: '#ffffff',
        textAlign: 'left',
        fontWeight: 'bold',
        animation: 'slideDown 0.5s ease-in-out',
    };

    const cellStyle = {
        padding: '12px 15px',
        borderBottom: '1px solid #dddddd',
        transition: 'background-color 0.3s ease-in-out',
    };

    const rowStyle = {
        transition: 'background-color 0.3s ease-in-out, transform 0.3s ease-in-out',
    };

    const hoverEffect = {
        backgroundColor: '#F7D7D7',
        transform: 'scale(1.02)',
    };

    return (
        <div style={{ marginRight: '80%'}}>
            <h1 style={{ textAlign: 'center', color: 'error', fontSize: '2em', marginBottom: '20px' }}>
                Booking Details
            </h1>
            <table style={tableStyle}>
                <thead>
                    <tr style={headerStyle}>
                        <th style={cellStyle}>ID</th>
                        <th style={cellStyle}>Name</th>
                        <th style={cellStyle}>Email</th>
                        <th style={cellStyle}>Contact Number</th>
                        <th style={cellStyle}>Date</th>
                        <th style={cellStyle}>From Time</th>
                        <th style={cellStyle}>To Time</th>
                        <th style={cellStyle}>Number of Players</th>
                        <th style={cellStyle}>Payment Method</th>
                        <th style={cellStyle}>Turf Name</th>
                        <th style={cellStyle}>Turf ID</th>
                    </tr>
                </thead>
                <tbody>
                    {bookings.map((booking) => (
                        <tr
                            key={booking.id}
                            style={rowStyle}
                            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = hoverEffect.backgroundColor}
                            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'white'}
                        >
                            <td style={cellStyle}>{booking.id}</td>
                            <td style={cellStyle}>{booking.name}</td>
                            <td style={cellStyle}>{booking.email}</td>
                            <td style={cellStyle}>{booking.contactNumber}</td>
                            <td style={cellStyle}>{booking.date}</td>
                            <td style={cellStyle}>{booking.fromTime}</td>
                            <td style={cellStyle}>{booking.toTime}</td>
                            <td style={cellStyle}>{booking.numberOfPlayers}</td>
                            <td style={cellStyle}>{booking.paymentMethod}</td>
                            <td style={cellStyle}>{booking.turfName}</td>
                            <td style={cellStyle}>{booking.turfId}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default UserManagement;
