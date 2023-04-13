import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllPokemons,
  getPokemonById,
  getPokemonEvolutionsById,
  cleanState,
} from "../../redux/actions";
import { useParams } from "react-router-dom";
import "./CardDetail.css";
import NavBar from "../NavBar/NavBar.jsx";
import Footer from '../Footer/Footer.jsx';


const CardDetail = (props) => {
  
  const params = useParams();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getPokemonById(params.id));
    dispatch(getPokemonEvolutionsById(params.id));
    dispatch(getAllPokemons());
  }, []);

  const [lado, setLado] = useState("A");
  const pokemonDetail = useSelector((state) => state.pokemonDetail);
  const evolutionsDetail = useSelector((state) => state.pokemonEvolutions);
  const pokemons = useSelector((state) => state.pokemons);

  //Acá poner el ID desde el que empiezan los pokemons creados
  //Para obtener el id, name e image y asignarlos a las evolutions de los nuevos de forma random
  let idNews = 100;
  const newsPokemons = pokemons.filter((pokemon) => pokemon.id > idNews);
  const max = newsPokemons.length - 1;

  console.log(newsPokemons)
  const handleLadoAoB = (event) => {
    setLado(event.target.value);
  };

  // Limpio pokemonDetail y pokemonEvolutions del E. Global, para que no queden pegadas las imágenes y la info de la consulta anterior por un segundo hasta que se renderice la nueva info.
  useEffect(() => {
    return () => {
      dispatch(cleanState());
    };
  }, [dispatch]);

  if (pokemonDetail.error) {
    return (
      <div>
        <div>
          <NavBar />
        </div>
        <img
          src="\src\assets\PokemonDetail\not-found.png"
          alt="imagen pikachu"
        />
        <h2>Pokemon no encontrado</h2>
        <Link to="/home">
          <button class="button-regresar" type="button">
            ⟵ Regresar
          </button>
        </Link>
      </div>
    );
  }

  return (
    <div>
      <div><NavBar /></div>
      <div className="card">
        {Object.keys(pokemonDetail).length > 0 &&
        evolutionsDetail.length > 0 &&
        newsPokemons.length > 0 ? (
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
                  <span>
                    {params.id > idNews ? "Evoluciones random" : "Evoluciones"}
                  </span>
                  {evolutionsDetail.map((evolution) => {
                    let newPokemonEvolution =
                      Math.floor(Math.random() * (max - 0 + 1)) + 0;
                    return (
                      <div key={evolution.evolutionId}>
                        <img
                          className="imagenes-evolucion"
                          src={
                            params.id > idNews
                              ? newsPokemons[newPokemonEvolution].image
                              : `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${evolution.evolutionId}.png`
                          }
                          alt="imagen evolución"
                        />
                        <span>
                          {params.id > idNews
                            ? newsPokemons[newPokemonEvolution].name
                            : evolution.name}
                        </span>
                        <span>
                          {params.id > idNews
                            ? newsPokemons[newPokemonEvolution].id
                            : evolution.evolutionId}
                        </span>
                      </div>
                    );
                  })}
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
        <Footer />
    </div>
  );
};

export default CardDetail;
