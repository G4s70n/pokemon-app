const { Router } = require('express');


const pokemonsRouter = require('./pokemonsRouter.js');

const router = Router();

router.use('/pokemons', pokemonsRouter);


router.use('*', function(req, res) {
    res.status(404).send('Page not found');
  });





module.exports = router;