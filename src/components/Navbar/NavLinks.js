import React from "react";
import { NavLink } from "react-router-dom";

function NavLinks() {
  return (
    <ul className="nav-links">
      <li>
        <NavLink to="/" end className={({ isActive }) => (isActive ? "active" : "")}>Home</NavLink>
      </li>
      <li>
        <NavLink to="/shop" className={({ isActive }) => (isActive ? "active" : "")}>Shop</NavLink>
      </li>
      <li>
        <NavLink to="/categories" className={({ isActive }) => (isActive ? "active" : "")}>Categories</NavLink>
      </li>
      <li>
        <NavLink to="/about" className={({ isActive }) => (isActive ? "active" : "")}>About</NavLink>
      </li>
      <li>
        <NavLink to="/contact" className={({ isActive }) => (isActive ? "active" : "")}>Contact</NavLink>
      </li>
    </ul>
  );
}

export default NavLinks;