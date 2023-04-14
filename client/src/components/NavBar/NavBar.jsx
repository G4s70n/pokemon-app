import React from "react";
import { Link } from "react-router-dom";
import "./NavBar.css";
import Profile from "../Profile/Profile";




const NavBar = () => {
  return (
    <div class="nav-container">
      <Profile/>
      <nav class="nav">
        <ul>
          <li>
            <Link to="/home">Home</Link>
          </li>
          <li>
            <Link to="/create">Create</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default NavBar;
