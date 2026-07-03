import React from "react";
import "./FilterPanel.module.css";

const FilterPanel = ({ filters, setFilters }) => {
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFilters({
      ...filters,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const clearFilters = () => {
    setFilters({
      category: "",
      brand: "",
      rating: "",
      availability: false,
      minPrice: "",
      maxPrice: "",
    });
  };

  return (
    <div className="filter-panel">
      <h2>Filters</h2>

      {/* Category */}
      <div className="filter-group">
        <label>Category</label>
        <select
          name="category"
          value={filters.category}
          onChange={handleChange}
        >
          <option value="">All</option>
          <option value="Medicine">Medicine</option>
          <option value="Vitamin">Vitamin</option>
          <option value="Equipment">Equipment</option>
          <option value="Personal Care">Personal Care</option>
        </select>
      </div>

      {/* Brand */}
      <div className="filter-group">
        <label>Brand</label>
        <select
          name="brand"
          value={filters.brand}
          onChange={handleChange}
        >
          <option value="">All</option>
          <option value="Dolo">Dolo</option>
          <option value="Revital">Revital</option>
          <option value="Crocin">Crocin</option>
          <option value="Himalaya">Himalaya</option>
        </select>
      </div>

      {/* Price */}
      <div className="filter-group">
        <label>Min Price</label>
        <input
          type="number"
          name="minPrice"
          value={filters.minPrice}
          onChange={handleChange}
          placeholder="₹0"
        />
      </div>

      <div className="filter-group">
        <label>Max Price</label>
        <input
          type="number"
          name="maxPrice"
          value={filters.maxPrice}
          onChange={handleChange}
          placeholder="₹5000"
        />
      </div>

      {/* Rating */}
      <div className="filter-group">
        <label>Rating</label>
        <select
          name="rating"
          value={filters.rating}
          onChange={handleChange}
        >
          <option value="">All</option>
          <option value="4">4★ & Above</option>
          <option value="3">3★ & Above</option>
          <option value="2">2★ & Above</option>
        </select>
      </div>

      {/* Availability */}
      <div className="checkbox-group">
        <input
          type="checkbox"
          name="availability"
          checked={filters.availability}
          onChange={handleChange}
        />
        <label>In Stock Only</label>
      </div>

      <button className="clear-btn" onClick={clearFilters}>
        Clear Filters
      </button>
    </div>
  );
};

export default FilterPanel;