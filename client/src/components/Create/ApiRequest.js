import axios from "axios";


export const getImages = async (prompt) => {
    try {
        const response = await axios.post('http://localhost:3001/pokemons/images', { prompt });
        return response.data;
    } catch (error) {
        console.error(error);
    }
};

export const createPokemon = async (obj) => {
    try {
      const response = await axios.post('http://localhost:3001/pokemons/create', obj);
      console.log(response.data);
      return response.data;
    } catch (error) {
        return 'Error al crear el pokemon' + error;
        console.error(error);
    }
};










