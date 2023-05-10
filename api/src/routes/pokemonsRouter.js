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

const {imgsPokemonsConIa} = require("../controllers/ImagesCreatorController.js");




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
      if (pokemon === null) {
        res.status(404).send({ message: `Pokemon with id ${id} not found` });
      } else {
        res.status(200).send(pokemon);
      }
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  });
  



router.get("/evolutions/:id", idValidator, async (req, res, next) => {
  try {
    const id = req.params.id;
    const evolutions = await getEvolutionsByPokemonId(id);


    if(!evolutions){
        res.status(404).send({ message: `Evolutions with id ${id} not found`})
    }else {
        res.status(200).send(evolutions);
    }

  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});



router.post("/create", validatePokemonData, async (req, res, next) => {
    try {
        const pokemonData = req.body;
        const createPokemon = await postPokemon(pokemonData)
        res.status(201).send(createPokemon)
    } catch (error) {
      res.status(400).send({ message: error.message });
    }
  });



  router.post('/images', async (req, res) => {
    try {
      const pokemonPrompt = req.body.prompt;
      const resultado = await imgsPokemonsConIa(pokemonPrompt);
      res.send(resultado);
    } catch (error) {
      res.status(500).send({ message: 'Error al generar las imágenes' });
      console.log(error)
    }
  });


  



module.exports = router;

