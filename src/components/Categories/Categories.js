import React from "react";
import { Link } from "react-router-dom";
import "./Categories.css";

import medicines from "../../assets/categories/medicines.png";
import healthcare from "../../assets/categories/healthcare.png";
import vitamins from "../../assets/categories/vitamins.png";
import personalcare from "../../assets/categories/personalcare.png";
import babycare from "../../assets/categories/babycare.png";
import medicaldevices from "../../assets/categories/medicaldevices.png";

const categories = [
  {
    id: 1,
    name: "Medicines",
    image: medicines,
    path: "/category/medicines",
  },
  {
    id: 2,
    name: "Healthcare",
    image: healthcare,
    path: "/category/healthcare",
  },
  {
    id: 3,
    name: "Vitamins",
    image: vitamins,
    path: "/category/vitamins",
  },
  {
    id: 4,
    name: "Personal Care",
    image: personalcare,
    path: "/category/personal-care",
  },
  {
    id: 5,
    name: "Baby Care",
    image: babycare,
    path: "/category/baby-care",
  },
  {
    id: 6,
    name: "Medical Devices",
    image: medicaldevices,
    path: "/category/medical-devices",
  },
];

function Categories() {
  return (
    <section className="categories-section">
      <div className="container">
        <h2 className="categories-title">Shop by Category</h2>

        <div className="categories-grid">
          {categories.map((category) => (
            <Link
              key={category.id}
              to={category.path}
              className="category-card"
            >
              <img
                src={category.image}
                alt={category.name}
                className="category-image"
              />

              <h3 className="category-name">{category.name}</h3>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Categories;