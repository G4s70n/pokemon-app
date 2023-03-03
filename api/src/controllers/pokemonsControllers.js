const { Pokemons, Evolutions} = require('../db.js');
const axios = require('axios');



const url = "https://pokeapi.co/api/v2/pokemon";
const max = 6;

// Obtenemos los pokemons y sus características desde la API y los guardamos en la DB
const getPokemonsByApi = async () => {
  try {
    const pokemonApi = await axios.get(`${url}?offset=0&limit=${max}`);
    const pokemons = pokemonApi.data.results;

    const pokemonDataPromises = pokemons.map(async (pokemon) => {
      const url = pokemon.url;
      const res = await axios.get(url);
      return res.data;
    });

    const pokemonsData = await axios.all(pokemonDataPromises);

    const allPokemonsInfoPromises = pokemonsData.map(async (pokemon) => {
      const speciesUrl = pokemon.species.url;
      const speciesResponse = await axios.get(speciesUrl);
      const color = speciesResponse.data.color.name;
      const evolutionChainUrl = speciesResponse.data.evolution_chain.url;
      const evolutionChainResponse = await axios.get(evolutionChainUrl);
      const evolutionChainData = evolutionChainResponse.data.chain;

      const evolutionsIds = [];
      let currentEvolution = evolutionChainData;
      while (currentEvolution) {
        const id = currentEvolution.species.url.split('/').slice(-2, -1)[0];
        evolutionsIds.push(+id);
        currentEvolution = currentEvolution.evolves_to[0];
      }


 
        const pokemonCreate =  await Pokemons.create({
         id: pokemon.id,
         name: pokemon.name,
         image: pokemon.sprites.other.home.front_default,
         species: pokemon.species.name,
         types: pokemon.types.map((type) => type.type.name),
         hp: pokemon.stats[0].base_stat,
         attack: pokemon.stats[1].base_stat,
         defense: pokemon.stats[2].base_stat,
         speed: pokemon.stats[5].base_stat,
         specialAttack: pokemon.stats[3].base_stat,
         specialDefense: pokemon.stats[4].base_stat,
         weight: pokemon.weight,
         height: pokemon.height,
         evolutions: evolutionsIds,
         color: color,
        })
        await pokemonCreate.addEvolutions(evolutionsIds)
       
    
    });
  } catch (error) {
    throw new Error(`Error getting pokemons from API: ${error.message}`);
  }
};




// Obtenemos las evoluciones de los pokemons desde la API y los guardamos en la DB
const createEvolutionsFromApi = async () => {
  try {
    const pokemonApi = await axios.get(`${url}?offset=0&limit=${max}`);
    const pokemons = pokemonApi.data.results;

    const pokemonDataPromises = pokemons.map(async (pokemon) => {
      const url = pokemon.url;
      const res = await axios.get(url);
      return res.data;
    });

    const pokemonsData = await axios.all(pokemonDataPromises);

    const allEvolutionsInfo = [];
    let idEvolution = []; 

    await Promise.all(pokemonsData.map(async (pokemonData) => {
      const speciesUrl = pokemonData.species.url;
      const speciesResponse = await axios.get(speciesUrl);
      const evolutionChainUrl = speciesResponse.data.evolution_chain.url;
      const evolutionChainResponse = await axios.get(evolutionChainUrl);
      const evolutionChainData = evolutionChainResponse.data.chain;

      const evolutions = [];
      let currentEvolution = evolutionChainData;
      while (currentEvolution) {
        const id = currentEvolution.species.url.split('/').slice(-2, -1)[0];
        const name = currentEvolution.species.name;
        const image = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;
        evolutions.push({ id, name, image });
        currentEvolution = currentEvolution.evolves_to[0];
      }

      evolutions.forEach((evolution) => {
        if (!idEvolution.includes(evolution.id)) {
          idEvolution.push(evolution.id);
          allEvolutionsInfo.push({
            pokemonId: pokemonData.id,
            evolutionId: evolution.id,
            name: evolution.name,
            image: evolution.image,
          });
        }
      });
    }));

    await Evolutions.bulkCreate(allEvolutionsInfo);

  } catch (error) {
    throw new Error(`Error creating evolutions: ${error.message}`);
  }
};




// Con el ID de un pokemon obtenemos el ID, name e image miniatura de su evolucion desde la DB
const getEvolutionsByPokemonId = async (pokemonId) => {
  try {
    const evolutions = await Evolutions.findAll({
      where: { pokemonId },
      attributes: ['evolutionId', 'name', 'image']
    });

    //console.log(evolutions);
    return evolutions;
  } catch (error) {
    throw new Error(`Error getting evolutions: ${error.message}`);
  }
};




// Obtenemos todos los pokemons existentes en la DB
const getAllPokemons = async () => {
  try {
    const allPokemons = await Pokemons.findAll();
    //console.log(allPokemons);
    return allPokemons;
  } catch (error) {
    throw new Error(`Error getting pokemons: ${error.message}`);
  }
}




// Obtenemos un pokemon por su ID
const getPokemonById = async (pokemonId) =>{
  try {
    const pokemon = await Pokemons.findByPk(pokemonId);
     //console.log(pokemon);
    return pokemon;
  } catch (error) {
    throw new Error(`Error getting pokemons by id: ${error.message}`);
    
  }
}




// Obtenemos un pokemon por su nombre
const getPokemonByName = async (pokemonName) =>{
  pokemonName = pokemonName.toLowerCase();
  try {
    let pokemon = await Pokemons.findOne({
      where: {
        name: pokemonName,
      },
    });
    return pokemon;
  } catch (error) {
    throw new Error(`Error getting pokemons by name: ${error.message}`);
  }
}




// Obtenemos todos los tipos de pokemons desde la API
const getPokemonTypes = async () =>{
  
  try {
    const getTypes = await axios.get('https://pokeapi.co/api/v2/type');
    const types = getTypes.data.results.map(e => {
     return { 
      typeId: e.url.split("/")[6],
      name: e.name
    }
    })
    
  //console.log(types);
   return types
  } catch (error) {
    throw new Error(`Error getting types: ${error.message}`);
  }
}



// Creamos un pokemon, si los campos no obligatorios desde el cliente vienen vacios, le agregamos un 0 por defecto
const postPokemon = async (p) =>{
  try {
    const count = await Pokemons.count();
    const newPokemon = await Pokemons.create({
      
      id: count + 1,
      name: p.name,
      image: p.image,
      species: p.species,
      hp: p.hp || 0,
      attack: p.attack || 0,
      defense: p.defense || 0,
      speed: p.speed || 0,
      specialAttack: p.specialAttack || 0,
      specialDefense: p.specialDefense || 0,
      weight: p.weight || 0,
      height: p.height || 0,
    })

    //console.log('pokemon successfully created!');
    return 'Pokemon successfully created!'
  } catch (error) {
    throw new Error(`Error creating the pokemon in the DB: ${error.message}`);
  }

}





const execution = async () =>{
  await getPokemonsByApi()
  await createEvolutionsFromApi();
  //await postPokemon(pokemon)
  //await getAllPokemons()
  //getPokemonById()
  //getEvolutionsByPokemonId()
  //getPokemonByName('charmander')
  //getPokemonTypes()

}

execution()



module.exports = {
  getAllPokemons,
  getPokemonById,
  getPokemonByName,
  getEvolutionsByPokemonId,
  getPokemonTypes,
  postPokemon
};