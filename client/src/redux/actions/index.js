import axios from 'axios';

export const GET_ALL_POKEMONS = 'GET_ALL_POKEMONS';
export const GET_POKEMON_BY_NAME = 'GET_POKEMON_BY_NAME';
export const GET_POKEMON_BY_ID = 'GET_POKEMON_BY_ID'; 
export const GET_POKEMON_TYPES = 'GET_POKEMONS_TYPES';
export const GET_POKEMON_EVOLUTIONS_BY_ID = 'GET_POKEMON_EVOLUTIONS_BY_ID';

//export const CREATED_POKEMON = 'CREATED_POKEMON';

export const FILTER_TYPES = 'FILTER_TYPES';
export const FILTER_NEWS_POKEMONS = 'FILTER_NEWS_POKEMONS';

export const SORT_BY_NAME_ASC = 'SORT_BY_NAME_ASC';
export const SORT_BY_NAME_DES = 'SORT_BY_NAME_DES';
export const SORT_BY_ATTACK_ASC = 'SORT_BY_ATTACK_ASC';
export const SORT_BY_ATTACK_DES = 'SORT_BY_ATTACK_DES';

export const SET_POKEMONS = 'SET_POKEMONS';

export const CLEAN_GLOBAL_STATE ='CLEAN_GLOBAL_STATE';

export const SEARCH_POKEMON = 'SEARCH_POKEMON';


  export const getAllPokemons = () => {
    return async (dispatch) => {
      try {
        const response = await axios.get('http://localhost:3001/pokemons');
        const orderedList = response.data.sort((a, b) => a.id - b.id);
        //console.log(response.data);
        return dispatch({
          type: GET_ALL_POKEMONS,
          payload: orderedList,
        });
      } catch (error) {
        console.error("Error getting all pokemons: " + error.response.data.message);
      }
    };
  };
  


export const getPokemonByName = (name) => {

  return async (dispatch) => {
    try {
      const response = await axios.get(`http://localhost:3001/pokemons?name=${name}`);
      //console.log(response.data);
      return dispatch({
        type: GET_POKEMON_BY_NAME,
        payload: response.data,
      })
    } catch (error) {
      console.error("Error getting pokemon by name: " + error.response.data.message);
    }
  }
};




export const getPokemonById = (id) => {

  return async (dispatch) => {
    try {
      const response = await axios.get(` http://localhost:3001/pokemons/${id}`);
      //console.log(response.data);
      return dispatch({
        type: GET_POKEMON_BY_ID,
        payload: response.data,
      })
    } catch (error) {
      return dispatch({
        type: GET_POKEMON_BY_ID,
        payload: {error: 'El pokemon no existe en la DB'}
      }) 
      console.error("Error getting pokemon by ID: " + error.response.data.message);
    }
  }
};



export const getPokemonTypes = () => {
  return async (dispatch) => {
    try {
      const response = await axios.get('http://localhost:3001/pokemons/types');
      return dispatch({
        type: GET_POKEMON_TYPES,
        payload: response.data,
      })
    } catch (error) {
      console.error("Error getting pokemons types: " + error);
    }
  }
};
  




export const getPokemonEvolutionsById = (id) => {

  return async (dispatch) => {
    try {
      const response = await axios.get(`http://localhost:3001/pokemons/evolutions/${id}`);
      return dispatch({
        type: GET_POKEMON_EVOLUTIONS_BY_ID,
        payload: response.data,
      })
    } catch (error) {
      console.error("Error getting pokemons types: " + error);
    }
  }
};



export const filterPokemonsByType = (option) =>{
  return {type: FILTER_TYPES, payload: option}
};


export const filterNewsPokemons = (option) =>{
  return {type: FILTER_NEWS_POKEMONS, payload: option}
};

export const sortByNameAsc = (option) =>{
  return {type: SORT_BY_NAME_ASC, payload: option}
};

export const sortByNameDes = (option) =>{
  return {type: SORT_BY_NAME_DES, payload: option}
};

export const sortByAttackAsc = (option) =>{
  return {type: SORT_BY_ATTACK_ASC, payload: option}
};

export const sortByAttackDes = (option) =>{
  return {type: SORT_BY_ATTACK_DES, payload: option}
};

export const setPokemons = (value) => {
  return {type: SET_POKEMONS, payload: value}
};


export const cleanState = (value) => {
  return {type: CLEAN_GLOBAL_STATE}
};


export const searchPokemon = (pokemonName) => {
  return {type: SEARCH_POKEMON, payload: pokemonName}
};
