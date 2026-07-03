import React from "react";
import "./SortDropdown.css";

const sortOptions = [
  { value: "", label: "Sort By" },
  { value: "priceLowHigh", label: "Price: Low to High" },
  { value: "priceHighLow", label: "Price: High to Low" },
  { value: "nameAZ", label: "Name: A - Z" },
  { value: "nameZA", label: "Name: Z - A" },
  { value: "rating", label: "Highest Rated" },
  { value: "newest", label: "Newest First" },
];

const SortDropdown = ({ sortBy, setSortBy }) => {
  return (
    <div className="sort-dropdown">
      <select
        className="sort-select"
        value={sortBy}
        onChange={(e) => setSortBy(e.target.value)}
      >
        {sortOptions.map((option) => (
          <option key={option.value || "default"} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SortDropdown;