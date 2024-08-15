import React, { useEffect, useState } from 'react';
import axios from 'axios';
import TurfCard from './TurfCard';
import Banner from './Banner';
import Header from './Header';
import Footer from './Footer';

const Home = () => {
    const [turfs, setTurfs] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8080/api/accept/all')
            .then(response => setTurfs(response.data))
            .catch(error => console.error('Error fetching turfs:', error));
    }, []);

    return (
        <div>
            <Banner />
            <div style={gridStyle}>
                {turfs.map(turf => (
                    <TurfCard key={turf.id} turf={turf} rating={4} /> 
                ))}
            </div>
            <Footer/>
        </div>
    );
};

// Simple styles for the page and grid
const gridStyle = {
    display: 'grid',
    gridTemplateColumns: '1fr',  // Make each card take up the full row
    gap: '16px',
};

export default Home;
