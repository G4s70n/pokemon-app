import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams, useHistory } from "react-router-dom";
import "./Home.css";
import Card from "../Card/Card";
import NavBar from '../NavBar/NavBar.jsx';
import Footer from '../Footer/Footer.jsx';



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
  searchPokemon,
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
     dispatch(getPokemonTypes())
    }, []);
  

    //Manejadores de eventos
    function handleFilterByType(event) {
      dispatch(filterPokemonsByType(event.target.value));
      const { name, value } = event.target;
      setSelectedValue((prevValues) => ({ ...prevValues, [name]: value }));
      setCurrentPage(1)
    };
  
    function handleFilterNewsPokemons(event) {
      dispatch(filterNewsPokemons(event.target.value));
      const { name, value } = event.target;
      setSelectedValue((prevValues) => ({ ...prevValues, [name]: value }));
      setCurrentPage(1)
    };
  
    function handleSortByName (event) {
      if(event.target.value === 'name-asc' || event.target.value === 'todos') dispatch(sortByNameAsc(event.target.value));
      if(event.target.value === 'name-desc' || event.target.value === 'todos') dispatch(sortByNameDes(event.target.value));
      const { name, value } = event.target;
      setSelectedValue((prevValues) => ({ ...prevValues, [name]: value }));
      setCurrentPage(1)
    };
  
  
    function handleSortByAttack (event) {
      if(event.target.value === 'attack-asc' || event.target.value === 'todos') dispatch(sortByAttackAsc(event.target.value));
      if(event.target.value === 'attack-desc' || event.target.value === 'todos') dispatch(sortByAttackDes(event.target.value));
      const { name, value } = event.target;
      setSelectedValue((prevValues) => ({ ...prevValues, [name]: value }));
      setCurrentPage(1)
    };
  
  
    function handleClearFilters () {
      dispatch(setPokemons('limpiar filtros'));
      setSelectedValue({lista1: "", lista2: "", lista3: "", lista4: ""});
      setCurrentPage(1)
    };
  
    function handleSearch(event) {
      let pokemonName = event.target.value;
      if(pokemonName.length === 0) dispatch(setPokemons('limpiar filtros'));
      handleClearFilters()
      dispatch(searchPokemon(pokemonName))
      setCurrentPage(1)
    };
  

    //----------------------------  Paginado  ↓  --------------------------------

    const { page } = useParams();
    const pageNumber = page ? parseInt(page) : 1;

    const [currentPage, setCurrentPage] = useState(pageNumber);
    const itemsPerPage = 6;
    const totalPages = Math.ceil(filterPokemons.length / itemsPerPage);
  
    const visiblePokemons = filterPokemons.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
  

    const history = useHistory();
    const handlePage = (e) => {

      const buttonValue = e.target.name;
      if(!isNaN(parseInt(buttonValue))){
        setCurrentPage(parseInt(buttonValue));
        history.push(`home-page=${parseInt(buttonValue)}`);
      }
      if(e.target.name ==='PREV'){
        setCurrentPage(currentPage - 1);
        history.push(`home-page=${parseInt(currentPage - 1)}`);
      } 
      if(e.target.name ==='NEXT'){
        setCurrentPage(currentPage + 1);
        history.push(`home-page=${parseInt(currentPage + 1)}`);
      } 
    };

   
    const pages =
    totalPages <= 2
      ? Array.from({ length: totalPages }, (_, i) => i + 1)
      : Array.from({ length: 5 }, (_, i) => currentPage + i - 2).filter(
          (page) => page > 0 && page <= totalPages
        );
  
  
    const hideButtonA = currentPage <= 2;
    const hideButtonB = currentPage >= totalPages - 1;

 
  
    //----------------------------  Paginado  ↑  --------------------------------


    if( filterPokemons.length === 0 ){
      return(
        <div>
        <img src="../../public/loading.gif" alt="gif loading" />
        <h2>Loading...</h2>
        </div>
      )
    }
  
    return (
      <div className="home-container">
        <div><NavBar/></div>
  
              
        {/* --------------------   Buscador    -------------------- */}

      
          <form class="form">
            <label for="buscador">
                <input class="input" onChange={handleSearch} type="search" id="buscador" name="buscador" placeholder="ingresa un nombre" />
                <div class="fancy-bg"></div>
                <div class="search">
                    <svg viewBox="0 0 24 24" aria-hidden="true" class="r-14j79pv r-4qtqp9 r-yyyyoo r-1xvli5t r-dnmrzs r-4wgw6l r-f727ji r-bnwqim r-1plcrui r-lrvibr">
                        <g>
                            <path d="M21.53 20.47l-3.66-3.66C19.195 15.24 20 13.214 20 11c0-4.97-4.03-9-9-9s-9 4.03-9 9 4.03 9 9 9c2.215 0 4.24-.804 5.808-2.13l3.66 3.66c.147.146.34.22.53.22s.385-.073.53-.22c.295-.293.295-.767.002-1.06zM3.5 11c0-4.135 3.365-7.5 7.5-7.5s7.5 3.365 7.5 7.5-3.365 7.5-7.5 7.5-7.5-3.365-7.5-7.5z"></path>
                        </g>
                    </svg>
                </div>
            </label>
          </form>

        {/* --------------------   Filtrado   -------------------- */}
            <div className="container-filters">
      
            <div>
            <label className="home-filters-label">Filtrar por:</label>
            <select name="lista1" value={selectedValue.lista1} onChange={handleFilterByType}>
              <option className="home-select-default" value="" disabled selected>Tipo</option> // opción por defecto
              <option value="todos">todos</option>
                {types.map((e) => (
               <option key={e.typeId} value={e.name}>
                 {e.name}
              </option>))}
            </select>
            </div>
      
      
            <div>
              <select name="lista2" value={selectedValue.lista2}  onChange={handleFilterNewsPokemons}>
              <option className="home-select-default" value="" disabled selected>Creados</option> 
                <option key='0' value="todos">todos</option>
                <option key='1' value="originals">originales</option>
                <option key='2' value="news">nuevos</option>
              </select>
              </div>
      
      
              <div>
              <label className="home-filters-label">Ordenar por:</label>
              <select name="lista3" value={selectedValue.lista3}  onChange={handleSortByName}>
              <option className="home-select-default" value="" disabled selected>Nombre</option> 
                <option key='0' value="todos">todos</option>
                <option key='1' value="name-asc">ascendente</option>
                <option key='2' value="name-desc">descentende</option>
              </select>
              </div>
      
      
              <div>
              <select name="lista4" value={selectedValue.lista4}  onChange={handleSortByAttack}>
              <option  className="home-select-default" value="" disabled selected>Ataque</option> 
                <option key='0' value="todos">todos</option>
                <option key='1' value="attack-asc">ascendente</option>
                <option key='2' value="attack-desc">descentende</option>
              </select>
              </div>
      
              <button className="home-btn-filters" type="button" onClick={handleClearFilters}>Limpiar filtros</button>
      
            </div>
  
  {
    filterPokemons[0] === 'not found' ? (

      <div className="home-container-sin-resultados" >
        <img src="src\assets\Home\sin-resultados.png" alt="imagen sin resultados" />
        <h2>No se encontró ningún pokemon </h2>
      </div>

    ) : (
      <div>

        <div  className="home-card-container">
        {visiblePokemons.map((pokemon) => (
           <Link to={`/pokemon/${pokemon.id}`} key={pokemon.id}>
          <Card
            id={pokemon.id}
            name={pokemon.name}
            types={pokemon.types}
            image={pokemon.image}
            height={pokemon.height}
            weight={pokemon.weight}
            color={pokemon.color}
          />
        </Link>
        ))}
        </div>

        {/* -------------------------   Botones paginado  ↓  ------------------------- */}
          <div className="home-btn-paginado"> 

              <button disabled={currentPage === 1} onClick={handlePage} name='1'>1</button>
              <button className="home-btn-prev" disabled={currentPage === 1} onClick={handlePage} name='PREV'>PREV</button>
              {!hideButtonA && <button className="home-btn-points">...</button>}
              {pages.map((page) => (
                <button
                  key={page}
                  className={currentPage === page ? 'current-page' : ''}
                  onClick={handlePage} name={page}
                >
                  {page}
                </button>
              ))}
              {totalPages === 2 && <button key="2" disabled={currentPage === 2} onClick={handlePage} name='2'>2</button>}
              {!hideButtonB && <button className="home-btn-points">...</button>}
              <button className="home-btn-next" disabled={currentPage === totalPages} onClick={handlePage} name='NEXT'>NEXT</button>
              <button disabled={currentPage === totalPages} onClick={handlePage} name={totalPages}>{totalPages}</button>

          </div>

        {/* -------------------------   Botones paginado  ↑  ------------------------- */}

        <Footer />
       </div>       
      
    )
  }
      </div>
    );
  };



export default Home;



