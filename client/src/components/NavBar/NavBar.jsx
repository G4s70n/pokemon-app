import React from "react";
import { Link } from "react-router-dom";
import "./NavBar.css";
import Profile from "../Profile/Profile";


const NavBar = () => {
  return (
    <div className="nav-container">
    <nav className="nav-content">
      <img className="nav-logo" src="/src/assets/LandingPage/pokemon-23.svg" alt="logo" />
        <ul className="links">
          <li><Link to="/home">Home</Link></li>
          <li className="li-pokeball"><Link to="/create">
            <div className="crear">
              <img className="svg" src="../../../src//assets/LandingPage/Pokeball.svg"alt="svg" />
            </div>
            </Link></li> 
          <li><Link to="/about">About</Link></li>
        </ul>
        <div className="nav-profile">
          <Profile/>
        </div>
    </nav>
  </div>
  );
};


export default NavBar;
