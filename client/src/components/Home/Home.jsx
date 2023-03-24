import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import "./Home.css";
import Card from "../Card/Card";
import { 
  getAllPokemons,
  getPokemonTypes,
  filterPokemonsByType,
  filterNewsPokemons,
  sortByNameAsc,
  sortByNameDes,
  sortByAttackAsc,
  sortByAttackDes,
  setPokemons,
  } from "../../redux/actions/index.js";



const Home = () => {

  //Accedemos al Estado Global
  const types = useSelector((state) => state.types);
  const filterPokemons = useSelector((state) => state.filtredPokemons);
  const dispatch = useDispatch();

  //Estado local
  const [selectedValue, setSelectedValue] = useState({lista1: "", lista2: "", lista3: "", lista4: ""});

  //Ciclos de vida del componente
  useEffect(() => {
    dispatch(getAllPokemons());
    dispatch(getPokemonTypes());
  }, []);

  //Manejador de eventos
  function handleFilterByType(event) {
    dispatch(filterPokemonsByType(event.target.value));
    const { name, value } = event.target;
    setSelectedValue((prevValues) => ({ ...prevValues, [name]: value }));
  };

  function handleFilterNewsPokemons(event) {
    dispatch(filterNewsPokemons(event.target.value));
    const { name, value } = event.target;
    setSelectedValue((prevValues) => ({ ...prevValues, [name]: value }));
  };

  function handleSortByName (event) {
    if(event.target.value === 'name-asc' || event.target.value === 'todos') dispatch(sortByNameAsc(event.target.value));
    if(event.target.value === 'name-desc' || event.target.value === 'todos') dispatch(sortByNameDes(event.target.value));
    const { name, value } = event.target;
    setSelectedValue((prevValues) => ({ ...prevValues, [name]: value }));
  };


  function handleSortByAttack (event) {
    if(event.target.value === 'attack-asc' || event.target.value === 'todos') dispatch(sortByAttackAsc(event.target.value));
    if(event.target.value === 'attack-desc' || event.target.value === 'todos') dispatch(sortByAttackDes(event.target.value));
    const { name, value } = event.target;
    setSelectedValue((prevValues) => ({ ...prevValues, [name]: value }));
  };


  function handleClearFilters () {
    dispatch(setPokemons('limpiar filtros'));
    setSelectedValue({lista1: "", lista2: "", lista3: "", lista4: ""});
  }

  return (
    <div className="home-container">

    

      <div className="container-options">

      <div>
      <label>Filtrar por tipo:</label>
      <select name="lista1" value={selectedValue.lista1} onChange={handleFilterByType}>
        <option value="" disabled selected>Tipo</option> // opción por defecto
        <option value="todos">todos</option>
          {types.map((e) => (
         <option key={e.typeId} value={e.name}>
           {e.name}
        </option>))}
      </select>
      </div>


      <div>
        <label>Filtrar por nuevos:</label>
        <select name="lista2" value={selectedValue.lista2}  onChange={handleFilterNewsPokemons}>
        <option value="" disabled selected>Creados</option> 
          <option key='0' value="todos">todos</option>
          <option key='1' value="originals">originales</option>
          <option key='2' value="news">nuevos</option>
        </select>
        </div>


        <div>
        <label>Ordenar por nombre:</label>
        <select name="lista3" value={selectedValue.lista3}  onChange={handleSortByName}>
        <option value="" disabled selected>Nombre</option> 
          <option key='0' value="todos">todos</option>
          <option key='1' value="name-asc">ascendente</option>
          <option key='2' value="name-desc">descentende</option>
        </select>
        </div>


        <div>
        <label>Ordenar por ataque:</label>
        <select name="lista4" value={selectedValue.lista4}  onChange={handleSortByAttack}>
        <option value="" disabled selected>Ataque</option> 
          <option key='0' value="todos">todos</option>
          <option key='1' value="attack-asc">ascendente</option>
          <option key='2' value="attack-desc">descentende</option>
        </select>
        </div>

        <button type="button" onClick={handleClearFilters}>Limpiar filtros</button>

      </div>

      
      {filterPokemons.length > 0 ? (
        filterPokemons.map((pokemon) => (
          <Card
            key={pokemon.id}
            id={pokemon.id}
            name={pokemon.name}
            types={pokemon.types}
            image={pokemon.image}
            height={pokemon.height}
            weight={pokemon.weight}
          />
        ))
      ) : (
        <p>Loading...</p>
      )}

    </div>
  );
};



export default Home;
