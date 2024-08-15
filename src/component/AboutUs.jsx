import React from 'react';
import image1 from './images/aboutus1.webp';
import image2 from './images/aboutus2.webp';
import image3 from './images/aboutus3.jpg';
import backgroundImage from './images/aboutusbg.jpg'; // Import your background image here

const AboutUs = () => {
  const aboutData = [
    {
      image: image1,
      text: 'Welcome to our Turf Booking Website! We offer a seamless way to book your favorite sports turfs online. Our platform is designed to provide an easy and efficient booking experience for all sports enthusiasts.',
    },
    {
      image: image2,
      text: 'Our website features a wide range of sports turfs, each equipped with state-of-the-art facilities. Whether you\'re looking to book a football field, cricket ground, or any other sports venue, we have got you covered.',
    },
    {
      image: image3,
      text: 'With real-time availability and secure payment options, you can book your preferred slot hassle-free. Join us today and enjoy a smooth and enjoyable turf booking experience!',
    },
  ];

  return (
    <div
      style={{
        padding: '20px',
        fontFamily: 'Arial, sans-serif',
        backgroundImage: `url(${backgroundImage})`, // Set the background image
        backgroundSize: 'cover', // Cover the entire area
        backgroundPosition: 'center', // Center the image
        backgroundAttachment: 'fixed', // Fixed position for parallax effect
        minHeight: '100vh', // Ensure it covers the full viewport height
      }}
    >
      <h1 style={{ textAlign: 'center', marginBottom: '20px', color: '#000' }}>About Us</h1>
      {aboutData.map((item, index) => (
        <div
          key={index}
          style={{
            display: 'flex',
            flexDirection: index % 2 === 0 ? 'row' : 'row-reverse',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '40px',
            padding: '20px',
            backgroundColor: 'rgba(255, 255, 255, 0.8)', // Semi-transparent background for readability
            borderRadius: '10px',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
            animation: 'fadeIn 1s ease-out',
            opacity: '0',
            animationFillMode: 'forwards',
            animationDelay: `${index * 0.5}s`,
          }}
        >
          <img
            src={item.image}
            alt="About Turf"
            style={{
              width: '300px',
              height: '200px',
              objectFit: 'cover',
              marginRight: index % 2 === 0 ? '20px' : '0',
              marginLeft: index % 2 !== 0 ? '20px' : '0',
              borderRadius: '10px',
            }}
          />
          <p
            style={{
              flex: '1',
              fontSize: '16px',
              lineHeight: '1.5',
              padding: '10px',
              backgroundColor: 'transparent',
              borderRadius: '0',
              boxShadow: 'none',
              color: '#000', // Set text color to black
            }}
          >
            {item.text}
          </p>
        </div>
      ))}

      {/* Inline CSS for keyframes animation */}
      <style>
        {`
          @keyframes fadeIn {
            from {
              opacity: 0;
              transform: translateY(20px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
        `}
      </style>
    </div>
  );
};

export default AboutUs;
