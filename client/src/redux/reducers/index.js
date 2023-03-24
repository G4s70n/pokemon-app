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
  
    return state.filtredPokemons = filtered;
  }

//filterAndSort(pokemons,[{type:'', originales: '', nuevos: ''}], ['', '', ''] )
const filterActivator = () => {
  let news = state.filtersAndSorts[1].value === 'news' ? 7 : null; //100
  let originals = state.filtersAndSorts[1].value === 'originals' ? 7 : null; //100

  filterAndSort([{
    type: state.filtersAndSorts[0].value, 
    originales: originals,
    nuevos: news
  }],
  [state.filtersAndSorts[1].value, state.filtersAndSorts[2].value ,state.filtersAndSorts[3].value]
  )
};

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
      console.log('ejecutando types');
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
      return {
        ...state,
      };
    default:
      return {
        ...state,
      };
  }
};

export default rootReducer;





/* 

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
} from "../actions/index.js";



const initialState = {
  pokemons: [],
  filtredPokemons: [],
  pokemonDetail: {},
  types: [],
  pokemonEvolutions: [],
  filters: [
    { nombre: "filter_types", activo: false, lastValue: null },
    { nombre: "filter_new_pokemons", activo: false },
    { nombre: "sort_by_name_asc", activo: false },
    { nombre: "sort_by_name_des", activo: false },
    { nombre: "sort_by_attack_asc", activo: false },
    { nombre: "sort_by_attack_des", activo: false },
  ],
};



const rootReducer = (state = initialState, action) => {

  //---------------------- FILTRADO Y ORDENAMIENTO ----------------------

  const filtrar = (filtro, valor) => {

    let infoFiltrada = state.pokemons;
    // Funciones que aplican los filtros y ordenamientos
    const filterTypes = (type) => {
      infoFiltrada = infoFiltrada.filter((pokemon) =>
      pokemon.types.includes(type)
      );
    };
    
    const newsFilter = (valor) => {
    const filtered = infoFiltrada.filter((pokemon) =>
    valor === "originals" ? pokemon.id <= 7 : pokemon.id > 7 //<= 100 : 100
    );
    infoFiltrada = filtered.length > 0 ? filtered : [];
    console.log(infoFiltrada);
    };
    
    const sortByNameAsc = () => {
      let ordenado = [infoFiltrada].sort((a, b) =>
        a.name > b.name ? 1 : a.name < b.name ? -1 : 0
      );
      infoFiltrada = ordenado;
    };

    const sortByNameDes = () => {
      let ordenado = [...infoFiltrada].sort((a, b) =>
        a.name < b.name ? 1 : a.name > b.name ? -1 : 0
      );
      infoFiltrada = ordenado;
    };

    const sortByAttackDes = () => {
      let ordenadoo = [...infoFiltrada].sort((a, b) => a.attack - b.attack);
      infoFiltrada = ordenadoo;
    };

    const sortByAttackAsc = () => {
      let ordenado = [...infoFiltrada].sort((a, b) => b.attack - a.attack);
      infoFiltrada = ordenado;
    };

    //Activamos los filtros que van a ejecutar y si estos filtros llevan algún valor se almacena en filters
    const filtrosOnOf = (filterName, value) => {
      state.filters = state.filters.map((e) => {
        if (e.nombre === filterName) {
          if (value === "todos") {
            return {
              ...e,
              activo: false,
              lastValue: null,
            };
          }
          return {
            ...e,
            activo: true,
            lastValue:
              value !== null && e.nombre === filterName ? value : e.lastValue,
          };
        }
        return e;
      });
    };


    //Verificamos la propiedad "activo" de los filtros y asegura que solo un filtro de ordenamiento está activo a la vez
    function toggleFilter(nombreFiltro, filters, valor) {
      if (valor === "todos") return;
      const filtroActual = filters.find(
        (filtro) => filtro.nombre === nombreFiltro
      );

      if (nombreFiltro.includes("asc")) {
        const filtroContrario = filters.find(
          (filtro) => filtro.nombre === nombreFiltro.replace("asc", "des")
        );
        if (filtroContrario) {
          filtroContrario.activo = false;
        }
        filtroActual.activo = true;
      } else if (nombreFiltro.includes("des")) {
        const filtroContrario = filters.find(
          (filtro) => filtro.nombre === nombreFiltro.replace("des", "asc")
        );
        if (filtroContrario) {
          filtroContrario.activo = false;
        }
        filtroActual.activo = true;
      }
    }

    //Limpiamos los filtros 
    const setPokemons = () => {
      state.filters = state.filters.map(e => {return {...e, activo: false}})
      console.log('limpiar filtros');
    };


    //Recorremos el estado de los filtros y aplicamos los activos
    const aplicadorFiltros = () => {
      state.filters.forEach((e) => {
        if (e.activo === true && e.nombre === "filter_types")
          filterTypes(e.lastValue);
        if (e.activo === true && e.nombre === "filter_new_pokemons")
          newsFilter(valor);
        if (e.activo === true && e.nombre === "sort_by_name_asc")
          sortByNameAsc();
        if (e.activo === true && e.nombre === "sort_by_name_des")
          sortByNameDes();
        if (e.activo === true && e.nombre === "sort_by_attack_asc")
          sortByAttackAsc();
        if (e.activo === true && e.nombre === "sort_by_attack_des")
          sortByAttackDes();
      });
    };


    if(valor === 'limpiar filtros') setPokemons()

    filtrosOnOf(filtro, valor);

    toggleFilter(filtro, state.filters, valor);

    // Aplicamos todos los filtros activos en secuencia
    aplicadorFiltros();

    return (state.filtredPokemons = infoFiltrada);
  };

  //---------------------- FILTRADO Y ORDENAMIENTO ----------------------



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
      filtrar("filter_types", action.payload);
      return {
        ...state,
      };
    case FILTER_NEWS_POKEMONS:
      filtrar("filter_new_pokemons", action.payload);
      return {
        ...state,
      };
    case SORT_BY_NAME_ASC:
      console.log(action.payload);
      filtrar("sort_by_name_asc", action.payload);
      return {
        ...state,
      };
    case SORT_BY_NAME_DES:
      filtrar("sort_by_name_des", action.payload);
      return {
        ...state,
      };
    case SORT_BY_ATTACK_ASC:
      filtrar("sort_by_attack_asc", action.payload);
      return {
        ...state,
      };
    case SORT_BY_ATTACK_DES:
      filtrar("sort_by_attack_des", action.payload);
      return {
        ...state,
      };      
    case SET_POKEMONS:
      filtrar("set_pokemons", action.payload);
      return {
        ...state,
      };
    default:
      return {
        ...state,
      };
  }
};

export default rootReducer;


*/