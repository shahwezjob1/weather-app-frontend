 import React from 'react';

const SearchBar = ({ city, setCity, handleSearch }) => (
  <div className="search-container">
    <input
      type="text"
      placeholder="Enter city name"
      value={city}
      onChange={(e) => setCity(e.target.value)}
      onKeyDown={(e) => {
        if (e.key === 'Enter') {
          handleSearch();
        }
      }}
    />
    <button onClick={handleSearch}>Search</button>
  </div>
);

export default SearchBar;
