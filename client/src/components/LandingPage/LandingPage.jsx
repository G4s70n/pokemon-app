import React from "react";
import { Link } from "react-router-dom";
import './LandingPage.css';




const LandingPage = () => {
  return (
    <div className="landing-cont">

      <div className="landing-cont-logos">


          <div className="landing-cont-logo-poke">
            <img className="landing-logo-pokemon" src=".\src\assets\LandingPage\pokemon-23.svg" alt="logo pokémon" />
            <img className="landing-pokebola" src="./src/assets/LandingPage/ball-pokemon-gif.gif" alt="pokebola gif" />
            <h1 className="landing-h1">¡Atrápalos ya!</h1>
            <Link className="landing-boton" to="/home">
            <button className="btn"> Comenzar
            </button>
            </Link>
          </div>
          <img className="landing-img-pikachu" src="./src/assets/LandingPage/pikachu.webp" alt="pikachu" />
        <div>
        </div>
      </div>
    </div>
  );
};


export default LandingPage;