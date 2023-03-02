const { Router } = require("express");
const router = Router();
const {  validatePokemonData, getByNameValidator, idValidator } = require('../validations/pokemonsValidator.js')
const {
  getAllPokemons,
  getPokemonById,
  getPokemonByName,
  getEvolutionsByPokemonId,
  getPokemonTypes,
  postPokemon,
} = require("../controllers/pokemonsControllers.js");






router.get('/',getByNameValidator,async (req, res, next) => {

    try {
        const name = req.query.name;

        if (!name) {
            const allPokemons = await getAllPokemons();
            res.status(200).send(allPokemons);
        } else {
            const pokemon = await getPokemonByName(name);
            if (pokemon === null) {
                res.status(404).send({ message:`The pokemon ${name} does not exist in the db`});
            } else {
                res.status(200).send(pokemon);
            }
        }

    } catch (error) {
        res.status(400).send({ message: error.message })
    }
});
  




router.get("/types", async (req, res, next) => {
    try {
      const types = await getPokemonTypes();
      res.status(200).send(types);
    } catch (error) {
      res.status(400).send({ message: error.message });
    }
  });
  



router.get("/:id", idValidator, async (req, res, next) => {
  try {
    const id = req.params.id;
    const pokemon = await getPokemonById(id);
    if (pokemon === null)
      res.status(404).send({ message: `Pokemon with id ${id} not found` });

    res.status(200).send(pokemon);
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});



router.get("/evolutions/:id", idValidator, async (req, res, next) => {
  try {
    const id = req.params.id;
    const evolutions = await getEvolutionsByPokemonId(id);
    console.log(evolutions);

    if(!evolutions[0]){
        res.status(404).send({ message: `Evolutions with id ${id} not found`})
    }else {
        res.status(200).send(evolutions);
    }

  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});



router.post("/", validatePokemonData, async (req, res, next) => {
    try {
        const pokemonData = req.body;
        const createPokemon = await postPokemon(pokemonData)
        res.status(201).send(createPokemon)
    } catch (error) {
      res.status(400).send({ message: error.message });
    }
  });





module.exports = router;
