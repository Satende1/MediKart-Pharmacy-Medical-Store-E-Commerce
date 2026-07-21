import React, { useState } from "react";
import { FiSearch } from "react-icons/fi";
import "./Navbar.css";

import Logo from "./Logo";
import NavLinks from "./NavLinks";
import SearchBar from "./SearchBar";
import UserActions from "./UserActions";
import MobileMenu from "./MobileMenu";

function Navbar() {
  const [showSearch, setShowSearch] = useState(false);

  return (
    <>
      <nav className="navbar">
        <Logo />

        {/* Desktop */}
        <div className="navbar-desktop">
          <NavLinks />
          <SearchBar />
          <UserActions />
        </div>

        {/* Mobile */}
        <div className="navbar-mobile">
          <button
            className="search-btn-mobile"
            onClick={() => setShowSearch(true)}
            aria-label="Search"
          >
            <FiSearch />
          </button>

          <MobileMenu />
        </div>
      </nav>

      {/* Mobile Search Popup */}
      {showSearch && (
        <>
          <div
            className="search-overlay"
            onClick={() => setShowSearch(false)}
          ></div>

          <div className="search-popup">
            <button
              className="close-search"
              onClick={() => setShowSearch(false)}
            >
              ✕
            </button>

            <SearchBar />
          </div>
        </>
      )}
    </>
  );
}

export default Navbar;