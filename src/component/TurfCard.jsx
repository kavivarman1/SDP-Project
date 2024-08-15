import { height } from '@mui/system';
import React, { useState } from 'react';
import { FaWhatsapp, FaPhoneAlt, FaCalendarAlt, FaMapMarkerAlt, FaStar, FaHeart } from 'react-icons/fa'; // Import FaStar and FaHeart for rating and favorite icon
import { useNavigate } from 'react-router-dom';

const TurfCard = ({ turf, rating }) => { // Add rating as a prop
    const [showWhatsApp, setShowWhatsApp] = useState(false);
    const [showContact, setShowContact] = useState(false);
    const [isFavorite, setIsFavorite] = useState(false); // State to handle favorite status
    const navigate = useNavigate();

    const handleWhatsAppClick = () => setShowWhatsApp(!showWhatsApp);
    const handleContactClick = () => setShowContact(!showContact);
    const handleBookNowClick = () => navigate(`/booking/${turf.id}`);
    const handleFavoriteClick = () => setIsFavorite(!isFavorite); // Toggle favorite status

    const availableSports = turf.availableSports ? turf.availableSports.split(',') : [];

    return (
        <div style={containerStyle}>
            <div style={cardStyle}>
                {turf.image && (
                    <img src={`data:image/jpeg;base64,${turf.image}`} alt={turf.turfName} style={imageStyle} />
                )}
                <div style={contentStyle}>
                    <h2>{turf.turfName}</h2>
                    <p><FaMapMarkerAlt style={iconStyle} /> {turf.location}</p>
                    
                    {/* Rating Section */}
                    <div style={ratingStyle}>
                        {[...Array(5)].map((star, index) => (
                            <FaStar
                                key={index}
                                style={index < rating ? filledStarStyle : emptyStarStyle}
                            />
                        ))}
                        <span style={ratingTextStyle}>{rating}/5</span>
                    </div>

                    <div style={availableSportsContainerStyle}>
                        <div style={sportsListStyle}>
                            {availableSports.map((sport, index) => (
                                <div key={index} style={sportBoxStyle}>
                                    {sport.trim()}
                                </div>
                            ))}
                        </div>
                    </div>

                    <div style={buttonContainerStyle}>
                        <button 
                            style={buttonStyle('contact')} 
                            onClick={handleContactClick}
                        >
                            <FaPhoneAlt style={phoneIconStyle} />
                            {!showContact ? (
                                <span style={textStyle}>Contact</span>
                            ) : (
                                <span style={textStyle}>{turf.contactNumber}</span>
                            )}
                        </button>

                        <button 
                            style={buttonStyle('bookNow')} 
                            onClick={handleBookNowClick}
                        >
                            <FaCalendarAlt style={iconStyle} />
                            <span style={textStyle}>Book Now</span>
                        </button>

                        <button 
                            style={buttonStyle('whatsapp')} 
                            onClick={handleWhatsAppClick}
                        >
                            <FaWhatsapp style={iconStyle} />
                            {!showWhatsApp ? (
                                <span style={textStyle}>Chat</span>
                            ) : (
                                <span style={textStyle}>{turf.whatsappNumber}</span>
                            )}
                        </button>
                    </div>
                </div>
                <FaHeart 
                    style={{ 
                        position: 'absolute', 
                        top: '10px', 
                        right: '10px', 
                        color: isFavorite ? 'red' : '#ccc', 
                        cursor: 'pointer',
                        zIndex: 1 
                    }} 
                    onClick={handleFavoriteClick} 
                />
            </div>
        </div>
    );
};

// Styles for buttons, icons, and rating
const containerStyle = {
    width: '100%',
    display: 'flex',
    marginBottom: '16px',
    height: '90%'
};

const cardStyle = {
    display: 'flex',
    border: '1px solid #ccc',
    borderRadius: '8px',
    padding: '16px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    width: '100%',
    maxWidth: '1000px',
    transition: 'transform 0.3s ease-in-out',
    backgroundColor: '#fff',
    position: 'relative',
    height: '100%'
};

const imageStyle = {
    width: '300px',
    height: '250px',
    objectFit: 'cover',
    marginRight: '16px',
    borderRadius: '8px',
};

const contentStyle = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
};

const availableSportsContainerStyle = {
    marginTop: '10px',
};

const sportsListStyle = {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '8px',
    marginTop: '8px',
};

const sportBoxStyle = {
    padding: '5px 10px',
    borderRadius: '4px',
    backgroundColor: '#e0e0e0',
    fontSize: '14px',
    color: '#333',
};

const buttonContainerStyle = {
    display: 'flex',
    gap: '10px',
    marginTop: '16px',
};

const buttonStyle = (type) => ({
    display: 'flex',
    alignItems: 'center',
    border: '1px solid #ccc',
    borderRadius: '8px',
    padding: '8px 16px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    backgroundColor: type === 'contact' ? '#4caf50' : type === 'bookNow' ? '#2196F3' : '#25d366', // Color based on button type
    cursor: 'pointer',
    transition: 'transform 0.3s, background-color 0.3s',
    transform: 'scale(1)',
    position: 'relative',
    overflow: 'hidden',
    textAlign: 'left',
    width: '150px',
    justifyContent: 'center',
});

const iconStyle = {
    marginRight: '8px',
    color: '#333',
};

// CSS for vibrating phone icon
const phoneIconStyle = {
    ...iconStyle,
    animation: 'vibrate 0.5s infinite',
};

const textStyle = {
    display: 'inline-block',
    marginLeft: '8px',
};

const ratingStyle = {
    display: 'flex',
    alignItems: 'center',
    marginTop: '8px',
};

const filledStarStyle = {
    color: '#FFD700', // Gold color for filled stars
    marginRight: '4px',
};

const emptyStarStyle = {
    color: '#ccc', // Grey color for empty stars
    marginRight: '4px',
};

const ratingTextStyle = {
    marginLeft: '8px',
    fontSize: '16px',
    color: '#333',
};

// Adding the vibrate animation
const styles = `
    @keyframes vibrate {
        0% { transform: translateX(0); }
        25% { transform: translateX(-1px); }
        50% { transform: translateX(1px); }
        75% { transform: translateX(-1px); }
        100% { transform: translateX(0); }
    }
`;

// Inject styles into the document
const styleSheet = document.createElement("style");
styleSheet.type = "text/css";
styleSheet.innerText = styles;
document.head.appendChild(styleSheet);

export default TurfCard;
