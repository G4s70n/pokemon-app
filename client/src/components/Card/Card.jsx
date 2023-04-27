import React from "react";
import './Card.css';
'./Card.css';



const Card = ({id, name, types, height, weight, image, color}) => {
    console.log(color);

    return (
        <div className={`card card-color-${color} card-${id > 100 ?'new' :null}`}>
            <span class="card-id">{`#${id}`}</span>
            <span  className={`card-span-n card-span-${id > 100 ?'new' :null}`}>new</span>
            <span className="card-color-span">{color}</span>
            
            {
                id > 100  
                ?  <img class="card-image" src={image} alt="pokemon" />           
               :  <img class="card-image" src={`src/assets/Card/pokemonsGIFs/${id}.webp`} alt="gif pokemon" /> 
            }

            <h2 class="card-name" >{name}</h2>

            <div className="card-container-types">
            {types.length > 0 && types.map((e, index) => (
                <>
                <img class={`card-svg-bck-${index % 2 === 0 ? '1' : '2'}`} src={`src/assets/Card/iconsTypesSvg/${e}.svg`} alt="icon types" />

                    <div class={`card-types-${index % 2 === 0 ? '1' : '2'} card-type-border-${e}`}>
                        <img class={`card-svg-info-${index % 2 === 0 ? '1' : '2'}`}  src={`src/assets/Card/iconsTypesSvg/${e}.svg`} alt="icon types" /> 
                        <span className="card-type-text">{e}</span> 
                    </div>
                </>
                ))}
            </div>



            <div className="card-cont-peso-altura">
                <div className="card-bloque-height">
                <img class="logo-altura" src="src\assets\Card\iconHighWeight\Heigh.png" alt="icon" />
                <span className="card-value-peso">{`${height / 10} mts`}</span>
                <span className="card-height-span">Height</span>
                </div>
                <div className="card-bloque-weight">
                <img class="logo-peso" src="src\assets\Card\iconHighWeight\weight.png" alt="icon" />
                <span className="card-value-altura">{`${weight / 10} kg`}</span>
                <span className="card-weight-span">Weight</span>
                </div>
            </div>
        </div>
    )
};



export default Card