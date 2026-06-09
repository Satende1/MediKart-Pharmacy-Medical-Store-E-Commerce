import React from "react";
import "./Navbar.css";

import Logo from "./Logo";
import NavLinks from "./NavLinks";
import SearchBar from "./SearchBar";
import UserActions from "./UserActions";
import MobileMenu from "./MobileMenu";

function Navbar() {
  return (
    <nav className="navbar">

      <Logo />

      <NavLinks />

      <SearchBar />

      <UserActions />

      <MobileMenu />

    </nav>
  );
}

export default Navbar;