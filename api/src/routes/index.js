const { Router } = require('express');


const pokemonsRouter = require('./pokemonsRouter.js');
const typesRouter = require('./typesRouter.js');


const router = Router();


router.use('/pokemons', pokemonsRouter);
//router.use('/types', typesRouter);




router.use('*', function(req, res) {
    res.status(404).send('Página no encontrada');
  });



module.exports = router;