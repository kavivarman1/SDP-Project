import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import BookingForm from './BookingForm';
import image1 from './images/f20.jpg';
import image2 from './images/final18.jpg';
import image3 from './images/football2.jpg';
import image4 from './images/football2.jpg';
import image5 from './images/football2.jpg';
import image6 from './images/football2.jpg';
import Footer from './Footer';

const BookingPage = () => {
    const { id } = useParams();
    const [turf, setTurf] = useState(null);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    useEffect(() => {
        axios.get(`http://localhost:8080/api/accept/${id}`)
            .then(response => setTurf(response.data))
            .catch(error => console.error('Error fetching turf details:', error));
    }, [id]);

    if (!turf) return <div>Loading...</div>;

    const availableSportsArray = turf.availableSports ? turf.availableSports.split(',') : [];

    const imagePaths = [
        image1,
        image2,
        image3,
        image4,
        image5,
        image6
    ];

    const handleNext = () => {
        setCurrentImageIndex((prevIndex) => (prevIndex + 1) % imagePaths.length);
    };

    const handlePrevious = () => {
        setCurrentImageIndex((prevIndex) => (prevIndex - 1 + imagePaths.length) % imagePaths.length);
    };

    return (
        <div style={pageStyle}>
            <div style={detailsContainerStyle}>
                <div style={{ ...infoBoxStyle, animation: 'fadeIn 1s ease-in-out' }}>
                    <h2>Turf Details</h2>
                    {turf.image && (
                        <img src={`data:image/jpeg;base64,${turf.image}`} alt={turf.turfName} style={imageStyle} />
                    )}
                    <p><strong>Turf Name:</strong> {turf.turfName}</p>
                    <p><strong>Location:</strong> {turf.location}</p>
                </div>


                <div style={{ ...infoBoxStyle, animation: 'fadeIn 1s ease-in-out 0.5s' }}>
                    <h2>Owner Information</h2>
                    <p><strong>Name:</strong> {turf.ownerName}</p>
                    <p><strong>Email:</strong> {turf.email}</p>
                    <p><strong>Contact Number:</strong> {turf.contactNumber}</p>
                    <p><strong>WhatsApp Number:</strong> {turf.whatsappNumber}</p>
                </div>
                <div style={sliderContainerStyle}>
                    <button onClick={handlePrevious} style={arrowButtonStyle}>◀</button>
                    <img src={imagePaths[currentImageIndex]} alt={`Image ${currentImageIndex + 1}`} style={{ ...imageStyleSlider, animation: 'slideIn 0.8s ease' }} />
                    <button onClick={handleNext} style={arrowButtonStyle}>▶</button>
                </div>

                <div style={{ ...combinedBoxStyle, animation: 'fadeIn 1s ease-in-out 0.7s' }}>
                    <div style={overviewBoxStyle}>
                        <h2>Turf Overview</h2>
                        <p>One of the standout features of Greenwave Fields is its excellent drainage system, which keeps the turf playable even after heavy rain. The facilities, including changing rooms and parking, are clean and well-organized. Overall, Greenwave Fields is an excellent choice for both casual games and competitive matches. Contact: info@greenwavefields.com / (555) 123-4567</p>
                    </div>
                    <div style={availableSportsBoxStyle}>
                        <h2>Available Sports</h2>
                        {availableSportsArray.length > 0 ? (
                            availableSportsArray.map((sport, index) => (
                                <p key={index}>{sport.trim()}</p>
                            ))
                        ) : (
                            <p>No sports available.</p>
                        )}
                    </div>
                    <div style={timingBoxStyle}>
                        <h2>Timing</h2>
                        <p>Opened From : 5:00 AM</p>
                        <p>Opened Until : 11:00 PM</p>
                    </div>
                </div>

                <div style={bookingFormContainerStyle}>
                    <BookingForm turfName={turf.turfName} turfId={turf.id} />
                </div>
            </div>
            <Footer />
        </div>
    );
};

// Styles
const pageStyle = {

    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
};

const detailsContainerStyle = {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
    flex: 1,
};

const infoBoxStyle = {
    padding: '16px',
    backgroundColor: '#fff',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    animation: 'fadeIn 1s ease-in-out',
};

const imageStyle = {
    width: '100%',
    maxWidth: '600px',
    height: 'auto',
    borderRadius: '8px',
    marginBottom: '16px',
};

const sliderContainerStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '16px',
    padding: '16px 0',
};

const imageStyleSlider = {
    width: '600px',
    height: 'auto',
    borderRadius: '8px',
    animation: 'slideIn 0.8s ease',
};

const arrowButtonStyle = {
    backgroundColor: '#fff',
    border: 'none',
    fontSize: '24px',
    cursor: 'pointer',
    padding: '8px',
    borderRadius: '4px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    transition: 'transform 0.2s',
};

const combinedBoxStyle = {
    border: '1px solid #ccc',
    borderRadius: '8px',
    padding: '16px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    backgroundColor: '#fff',
    display: 'flex',
    gap: '20px',
    flexDirection: 'row',
    animation: 'fadeIn 1s ease-in-out',
};

const overviewBoxStyle = {
    flex: 1.6,
    padding: '16px',
};

const availableSportsBoxStyle = {
    flex: 1,
    padding: '16px',
};

const timingBoxStyle = {
    flex: 1,
    padding: '16px',
};

const bookingFormContainerStyle = {
    marginTop: '20px',
    marginBottom: '10px',
};

// Keyframes
const styles = `
@keyframes fadeIn {
    0% { opacity: 0; transform: translateY(20px); }
    100% { opacity: 1; transform: translateY(0); }
}

@keyframes slideIn {
    0% { transform: translateX(-100%); }
    100% { transform: translateX(0); }
}
`;

// Injecting keyframes into the document head
const styleSheet = document.createElement('style');
styleSheet.type = 'text/css';
styleSheet.innerText = styles;
document.head.appendChild(styleSheet);

export default BookingPage;
