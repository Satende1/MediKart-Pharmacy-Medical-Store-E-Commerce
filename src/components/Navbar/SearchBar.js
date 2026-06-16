import React from "react";
import { FaSearch } from "react-icons/fa";
import "./SearchBar.css";
function SearchBar() {
  return (
    <div className="search-container">
      <input
        type="text"
        placeholder="Search Medicines..."
        className="search-input"
      />
      <FaSearch className="search-icon" />
    </div>
  );
}

export default SearchBar;