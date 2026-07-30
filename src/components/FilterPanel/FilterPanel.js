import React from "react";
import "./FilterPanel.css";

function FilterPanel({ filters, setFilters }) {
  const handleChange = (e) => {
    const { name, value, checked, type } = e.target;

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

      <h2>Filter Products</h2>

      {/* Category */}
      <div className="filter-group">
        <label>Category</label>

        <select
          name="category"
          value={filters.category}
          onChange={handleChange}
        >
          <option value="">All Categories</option>
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
          <option value="">All Brands</option>
          <option value="Dolo">Dolo</option>
          <option value="Crocin">Crocin</option>
          <option value="Revital">Revital</option>
          <option value="Himalaya">Himalaya</option>
          <option value="Omron">Omron</option>
          <option value="Accu-Chek">Accu-Chek</option>
        </select>
      </div>

      {/* Price */}
      <div className="filter-group">
        <label>Minimum Price</label>

        <input
          type="number"
          name="minPrice"
          placeholder="₹0"
          value={filters.minPrice}
          onChange={handleChange}
        />
      </div>

      <div className="filter-group">
        <label>Maximum Price</label>

        <input
          type="number"
          name="maxPrice"
          placeholder="₹5000"
          value={filters.maxPrice}
          onChange={handleChange}
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
          <option value="">All Ratings</option>
          <option value="4">4★ & Above</option>
          <option value="3">3★ & Above</option>
          <option value="2">2★ & Above</option>
        </select>
      </div>

      {/* Availability */}
      <div className="stock">

        <input
          type="checkbox"
          name="availability"
          checked={filters.availability}
          onChange={handleChange}
        />

        <label>In Stock Only</label>

      </div>

      <button
        className="clear-btn"
        onClick={clearFilters}
      >
        Clear Filters
      </button>

    </div>
  );
}

export default FilterPanel;