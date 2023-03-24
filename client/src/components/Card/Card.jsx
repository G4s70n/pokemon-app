import React from "react";
import './Card.css';


const Card = ({id, name, types, height, weight, image}) => {
    return (
        <div class="card">
            <span class="id-pokemon">{`#${id}`}</span>
            
            {
               id > 12  
               ?  <img class="imagen-principal" src={image} alt="gif pokemon" />           
               :  <img class="imagen-principal" src={`src/assets/Card/pokemonsGIFs/${id}.webp`} alt="gif pokemon" /> 
            }

           {/*  <img class="imagen-principal" src={`src/assets/Card/pokemonsGIFs/${id}.webp`} alt="gif pokemon" /> */}
            <h2 class="name" >{name}</h2>
            <span>types</span>

            {types.length > 0 && types.map(e => {
              return <img class="icons-types" src={`src/assets/Card/iconsTypesSvg/${e}.svg`} alt="icon types" />
            })}

            <img class="logo-peso" src="src\assets\Card\iconHighWeight\Heigh.svg" alt="icon" />
            <img class="logo-altura" src="src\assets\Card\iconHighWeight\weight.svg" alt="icon" />
            <span>High</span>
            <span>{height}</span>
            <span>Weight</span>
            <span>{weight}</span>
        </div>
    )
};



export default Card