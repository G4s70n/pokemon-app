import {
  GET_ALL_POKEMONS,
  GET_POKEMON_BY_NAME,
  GET_POKEMON_BY_ID,
  GET_POKEMON_TYPES,
  GET_POKEMON_EVOLUTIONS_BY_ID,
  FILTER_TYPES,
  FILTER_NEWS_POKEMONS,
  SORT_BY_NAME_ASC,
  SORT_BY_NAME_DES,
  SORT_BY_ATTACK_ASC,
  SORT_BY_ATTACK_DES,
  SET_POKEMONS,
  CLEAN_GLOBAL_STATE,
  SEARCH_POKEMON,
} from "../actions/index.js";



const initialState = {
  pokemons: [],
  filtredPokemons: [],
  pokemonDetail: {},
  types: [],
  pokemonEvolutions: [],
  filtersAndSorts: [
    { name: "types", value: null },
    { name: "originals-news", value: null },
    { name: "name-asc-desc", value: null },
    { name: "attack-asc-des", value: null },
  ],
};




const rootReducer = (state = initialState, action) => {

// . . . . . . . . . . FILTRADO Y ORDENAMIENTO . . . . . . . . . . //
  function filterAndSort(filters, sorts) {

    let filtered = state.pokemons;
    
    if (filters && filters.length > 0) {
      for (let filter of filters) {
        if (filter.type) {
          filtered = filtered.filter(pokemon => pokemon.types.includes(filter.type));
        }
        if (filter.originales) {
          filtered = filtered.filter(pokemon => pokemon.id <= filter.originales);
        }
        if (filter.nuevos) {
          filtered = filtered.filter(pokemon => pokemon.id > filter.nuevos);
        }
      }
    }
  
    if (sorts && sorts.length > 0) {
      for (let sort of sorts) {
        if (sort === 'name-asc') {
          filtered = filtered.sort((a, b) => a.name.localeCompare(b.name));
        }
        if (sort === 'name-desc') {
          filtered = filtered.sort((a, b) => b.name.localeCompare(a.name));
        }
        if (sort === 'attack-asc') {
          filtered = filtered.sort((a, b) => a.attack - b.attack);
        }
        if (sort === 'attack-desc') {
          filtered = filtered.sort((a, b) => b.attack - a.attack);
        }
      }
    }
  
    state.filtredPokemons = filtered.length === 0 ? ['not found'] : filtered;

  }

// Así recibe los parámetros:   filterAndSort([{type:'', originals-news: ''}], ['', '',''] )
const filterActivator = () => {
  let news = state.filtersAndSorts[1].value === 'news' ? 100 : null; //100
  let originals = state.filtersAndSorts[1].value === 'originals' ? 100 : null; //100

  filterAndSort([{
    type: state.filtersAndSorts[0].value, 
    originales: originals,
    nuevos: news
  }],
  [state.filtersAndSorts[1].value, state.filtersAndSorts[2].value ,state.filtersAndSorts[3].value]
  )};

// . . . . . . . . . . . . . . . .  . . . . . . . . . . . . . . . . //


  switch (action.type) {
    case GET_ALL_POKEMONS:
      return {
        ...state,
        pokemons: action.payload,
        filtredPokemons: action.payload,
      };
    case GET_POKEMON_BY_NAME:
      return {
        ...state,
        pokemonDetail: action.payload,
      };
    case GET_POKEMON_BY_ID:
      return {
        ...state,
        pokemonDetail: action.payload,
      };
    case GET_POKEMON_TYPES:
      return {
        ...state,
        types: action.payload,
      };
    case GET_POKEMON_EVOLUTIONS_BY_ID:
      return {
        ...state,
        pokemonEvolutions: action.payload,
      };
    case FILTER_TYPES:
      action.payload === 'todos'
      ? state.filtersAndSorts[0].value = null
      : state.filtersAndSorts[0].value = action.payload;
      filterActivator()
      return {
        ...state,
      };
    case FILTER_NEWS_POKEMONS:
      action.payload === 'todos'
      ? state.filtersAndSorts[1].value = null
      : state.filtersAndSorts[1].value = action.payload;
      filterActivator()
      return {
        ...state,
      };
    case SORT_BY_NAME_ASC:
      action.payload === 'todos'
      ? state.filtersAndSorts[2].value = null
      : state.filtersAndSorts[2].value =  'name-asc';
      filterActivator()
      return {
        ...state,
      };
    case SORT_BY_NAME_DES:
      action.payload === 'todos'
      ? state.filtersAndSorts[2].value = null
      : state.filtersAndSorts[2].value = 'name-desc'
      filterActivator()
      return {
        ...state,
      };
    case SORT_BY_ATTACK_ASC:
      action.payload === 'todos'
      ? state.filtersAndSorts[3].value = null
      : state.filtersAndSorts[3].value = 'attack-asc'
      filterActivator()
      return {
        ...state,
      };
    case SORT_BY_ATTACK_DES:
      action.payload === 'todos'
      ? state.filtersAndSorts[3].value = null
      : state.filtersAndSorts[3].value = 'attack-desc';
      filterActivator()
      return {
        ...state,
      };      
    case SET_POKEMONS:
      state.filtersAndSorts.forEach(e => e.value = null);
      filterActivator();
      state.pokemons = state.pokemons.sort((a, b) => a.id - b.id);
      state.filtredPokemons = state.pokemons;
      return {
        ...state,
      };
    case CLEAN_GLOBAL_STATE:
      state.pokemonDetail = {};
      state.pokemonEvolutions = [];
    case SEARCH_POKEMON:
      state.filtredPokemons = state.pokemons.filter(obj => obj.name.startsWith(action.payload));
      if(action.payload !== undefined && state.filtredPokemons.length === 0) state.filtredPokemons = ['not found'];
      return{
        ...state
      }
    default:
      return {
        ...state,
      };
  }
};

export default rootReducer;





