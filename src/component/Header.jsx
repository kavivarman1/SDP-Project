import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { TextField, InputAdornment, MenuItem, Select, FormControl, InputLabel, IconButton } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import FavoriteIcon from '@mui/icons-material/Favorite';
import './Header.css';

const Header = ({ cards = [] }) => {
  const [rating, setRating] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredCards, setFilteredCards] = useState(cards);

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
    <div className="header">
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
        />
        <TextField
          label="Search Grounds or Coaching"
          variant="outlined"
          size="small"
          style={{ marginLeft: '16px' }}
        />
        <FormControl variant="outlined" size="small" style={{ marginLeft: '16px', minWidth: 120 }}>
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
      <div className="favorites-container">
        <IconButton color="inherit">
          <FavoriteIcon />
        </IconButton>
      </div>
      <div className="cards-container">
        {filteredCards.map(card => (
          <div key={card.id} className="card">
            <h3>{card.name}</h3>
            <p>{card.address}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

Header.propTypes = {
  cards: PropTypes.array
};

export default Header;
