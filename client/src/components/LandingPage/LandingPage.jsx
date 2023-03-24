import React from "react";
import { Link } from "react-router-dom";
import './LandingPage.css';




const LandingPage = () => {
  return (
    <div>
      <div className="container-logos">
      <img className="logo" src=".\src\assets\LandingPage\pokemon-23.svg" alt="logo pokémon" />
      <img className="pokebola" src="./src/assets/LandingPage/ball-pokemon-gif.gif" alt="pokebola gif" />
      <h1>¡Atrápalos ya!</h1>
      <Link to="/home">
      <button class="cssbuttons-io-button"> Comenzar
      <div class="icon">
       <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="none" d="M0 0h24v24H0z"></path><path fill="currentColor" d="M16.172 11l-5.364-5.364 1.414-1.414L20 12l-7.778 7.778-1.414-1.414L16.172 13H4v-2z"></path></svg>
      </div>
      </button>
      </Link>
      </div>
    <div>
      <img src="./src/assets/LandingPage/pikachu.gif" alt="" />
    </div>
    </div>
  );
};


export default LandingPage;