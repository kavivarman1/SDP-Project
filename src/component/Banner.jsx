import React, { useState, useEffect } from 'react';
import { TextField, InputAdornment, MenuItem, Select, FormControl, InputLabel } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import './Banner.css';

const quotes = [
  
];

const Banner = ({ cards = [] }) => {
  const [currentQuoteIndex, setCurrentQuoteIndex] = useState(0);
  const [rating, setRating] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredCards, setFilteredCards] = useState(cards);
  const [isTransparent, setIsTransparent] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      if (offset > 100) { // Adjust the scroll offset as needed
        setIsTransparent(true);
      } else {
        setIsTransparent(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentQuoteIndex((prevIndex) => (prevIndex + 1) % quotes.length);
    }, 5000); // Change quote every 5 seconds

    return () => clearInterval(intervalId);
  }, []);

  const handleRatingChange = (event) => {
    setRating(event.target.value);
  };

  const handleSearchChange = (event) => {
    const term = event.target.value;
    setSearchTerm(term);

    const filtered = cards.filter(card =>
      card.address.toLowerCase().includes(term.toLowerCase())
    );
    setFilteredCards(filtered);
  };

  return (
    <div className={`banner ${isTransparent ? 'transparent' : ''}`}>
      <div className="quote-container">
        <blockquote className="quote">
          {quotes[currentQuoteIndex]}
        </blockquote>
      </div>
      <div className="search-container">
        <TextField
          label="Search Location"
          variant="outlined"
          size="small"
          value={searchTerm}
          onChange={handleSearchChange}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
          style={{ marginBottom: '1px' }}
        />
        <TextField
          label="Search Grounds or Turfs"
          variant="outlined"
          size="small"
          style={{ marginBottom: '1px' }}
        />
        <FormControl variant="outlined" size="small" style={{ minWidth: 120 }}>
          <InputLabel>Sort by Rating</InputLabel>
          <Select
            value={rating}
            onChange={handleRatingChange}
            label="Sort by Rating"
          >
            <MenuItem value="">None</MenuItem>
            <MenuItem value="3+">3+</MenuItem>
            <MenuItem value="3.5+">3.5+</MenuItem>
            <MenuItem value="4+">4+</MenuItem>
            <MenuItem value="4.5+">4.5+</MenuItem>
            <MenuItem value="5">5</MenuItem>
          </Select>
        </FormControl>
      </div>
    </div>
  );
};

export default Banner;
