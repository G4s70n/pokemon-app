import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getPokemonById, getPokemonEvolutionsById, cleanState } from "../../redux/actions";
import { useParams } from 'react-router-dom';  
import "./CardDetail.css";



//SI SE CONSULTA UN ID INEXISTENTE, DEVOLVER UN MENSAJE E IMAGEN 


const CardDetail = (props) => {

  const [lado, setLado] = useState('A');
  const dispatch = useDispatch();
  const pokemonDetail = useSelector((state) => state.pokemonDetail);
  const evolutionsDetail = useSelector((state) => state.pokemonEvolutions);
  const params = useParams(); 


  useEffect(() => {
    dispatch(getPokemonById(params.id));
    dispatch(getPokemonEvolutionsById(params.id));
  }, [dispatch]);


  const handleLadoAoB = (event) => {
    setLado(event.target.value);
  };

  // Limpio pokemonDetail y pokemonEvolutions del E. Global, para que no queden pegadas las imágenes y la info de la consulta anterior por un segundo hasta que se renderice la nueva info.
  useEffect(() => {
    return () => {
      dispatch(cleanState());
    }
  }, [dispatch]);



   if (pokemonDetail.error) {
    return (
    <div>
      <img src="\src\assets\PokemonDetail\not-found.png" alt="imagen pikachu" />
      <h2>Pokemon no encontrado</h2>
      <Link to="/home">
        <button class="button-regresar" type="button">⟵ Regresar</button>
      </Link>
    </div>
    )
  }
 
  return (

    <div className="card">

      {Object.keys(pokemonDetail).length > 0 && evolutionsDetail.length > 0 ?  (
        <>
          <div>
            <img src={pokemonDetail.image} alt="imagen pokemon" />
          </div>

          <div>
            {pokemonDetail.types && pokemonDetail.types.length > 0 ? (
              pokemonDetail.types.map((type) => (
                <span key={type}>{type}</span>
              ))
            ) : (
              <span></span>
            )}
            <span>{pokemonDetail.id}</span>
            <h1>{pokemonDetail.name}</h1>
          </div>

          {lado === "A" ? (
            <div className="lado-A">
              <div>
                <span>{pokemonDetail.color}</span>
                <span>
                  {(pokemonDetail.height / 10).toFixed(1).toString() + " m"}
                </span>
                <span>
                  {(pokemonDetail.weight / 10).toFixed(1).toString() + " kg"}
                </span>
              </div>

              <div>
                <span>Evolution</span>
                {evolutionsDetail.map((evolution) => (
                  <div key={evolution.evolutionId}>
                    <img
                      className="imagenes-evolucion"
                      src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${evolution.evolutionId}.png`}
                      alt="imagen evolución"
                    />
                    <span>{evolution.name}</span>
                    <span>{evolution.evolutionId}</span>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="lado-B">
              <span>caracteristicas</span>
              <div class="flex-wrapper">

<div class="single-chart">
  <svg viewBox="0 0 36 36" class="circular-chart orange">
    <path
      class="circle-bg"
      d="M18 2.0845
    a 15.9155 15.9155 0 0 1 0 31.831
    a 15.9155 15.9155 0 0 1 0 -31.831"
    />
    <path
      class="circle" 
      stroke-dasharray={`${pokemonDetail.hp}, 100`}
      d="M18 2.0845
    a 15.9155 15.9155 0 0 1 0 31.831
    a 15.9155 15.9155 0 0 1 0 -31.831"
    />
    <text x="18" y="21" class="percentage">
    {`${pokemonDetail.hp}%`}
    </text>
    <text x="18" y="20" class="label">
      HP
    </text>
  </svg>



  <svg viewBox="0 0 36 36" class="circular-chart orange">
    <path
      class="circle-bg"
      d="M18 2.0845
    a 15.9155 15.9155 0 0 1 0 31.831
    a 15.9155 15.9155 0 0 1 0 -31.831"
    />
    <path
      class="circle"
      stroke-dasharray={`${pokemonDetail.attack}, 100`}
      d="M18 2.0845
    a 15.9155 15.9155 0 0 1 0 31.831
    a 15.9155 15.9155 0 0 1 0 -31.831"
    />
    <text x="18" y="21" class="percentage">
    {`${pokemonDetail.attack}%`}
    </text>
    <text x="18" y="20" class="label">
      Attack
    </text>
  </svg>




  <svg viewBox="0 0 36 36" class="circular-chart orange">
    <path
      class="circle-bg"
      d="M18 2.0845
    a 15.9155 15.9155 0 0 1 0 31.831
    a 15.9155 15.9155 0 0 1 0 -31.831"
    />
    <path
      class="circle"
      stroke-dasharray={`${pokemonDetail.defense}, 100`}
      d="M18 2.0845
    a 15.9155 15.9155 0 0 1 0 31.831
    a 15.9155 15.9155 0 0 1 0 -31.831"
    />
    <text x="18" y="21" class="percentage">
    {`${pokemonDetail.defense}%`}
    </text>
    <text x="18" y="20" class="label">
      Defense
    </text>
  </svg>



  <svg viewBox="0 0 36 36" class="circular-chart orange">
    <path
      class="circle-bg"
      d="M18 2.0845
    a 15.9155 15.9155 0 0 1 0 31.831
    a 15.9155 15.9155 0 0 1 0 -31.831"
    />
    <path
      class="circle"
      stroke-dasharray={`${pokemonDetail.specialAttack}, 100`}
      d="M18 2.0845
    a 15.9155 15.9155 0 0 1 0 31.831
    a 15.9155 15.9155 0 0 1 0 -31.831"
    />
    <text x="18" y="21" class="percentage">
    {`${pokemonDetail.specialAttack}%`}
    </text>
    <text x="18" y="20" class="label">
      Sp. Attack
    </text>
  </svg>



  <svg viewBox="0 0 36 36" class="circular-chart orange">
    <path
      class="circle-bg"
      d="M18 2.0845
    a 15.9155 15.9155 0 0 1 0 31.831
    a 15.9155 15.9155 0 0 1 0 -31.831"
    />
    <path
      class="circle"
      stroke-dasharray={`${pokemonDetail.specialDefense}, 100`}
      d="M18 2.0845
    a 15.9155 15.9155 0 0 1 0 31.831
    a 15.9155 15.9155 0 0 1 0 -31.831"
    />
    <text x="18" y="21" class="percentage">
    {`${pokemonDetail.specialDefense}%`}
    </text>
    <text x="18" y="20" class="label">
      Sp. Defense
    </text>
  </svg>




  <svg viewBox="0 0 36 36" class="circular-chart orange">
    <path
      class="circle-bg"
      d="M18 2.0845
    a 15.9155 15.9155 0 0 1 0 31.831
    a 15.9155 15.9155 0 0 1 0 -31.831"
    />
    <path
      class="circle"
      stroke-dasharray={`${pokemonDetail.speed}, 100`}
      d="M18 2.0845
    a 15.9155 15.9155 0 0 1 0 31.831
    a 15.9155 15.9155 0 0 1 0 -31.831"
    />
    <text x="18" y="21" class="percentage">
    {`${pokemonDetail.speed}%`}
    </text>
    <text x="18" y="20" class="label">
      Speed
    </text>
  </svg>


</div>
</div>
            </div>
          )}

          <div>
            <button onClick={handleLadoAoB} value="A" type="button">
              Info
            </button>
            <button onClick={handleLadoAoB} value="B" type="button">
              Estadísticas
            </button>
          </div>
        </>
      ) : (
      <div>
      <img src="../../public/loading.gif" alt="gif loading" />
      <h2>Loading...</h2>
      </div>
      )}
    </div>
  );
};



export default CardDetail;






