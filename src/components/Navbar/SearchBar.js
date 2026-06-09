import React from "react";

function SearchBar() {
  return (
    <div className="search-container">
      <input
        type="text"
        placeholder="Search Medicines..."
        className="search-input"
      />
    </div>
  );
}

export default SearchBar;