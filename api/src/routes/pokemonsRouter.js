const { Router } = require('express')
const router = Router();
const {  getPokemonsByApi, } = require('../controllers/pokemonsControllers.js') 
//const { bookValidator } = require('../validations/booksValidator.js')



router.get('/', async (req, res, next) => {
    try {
        let { title, description, publication_date, author_id } = req.body;

       // const bookCreated = await bookCreator(title, description, publication_date, author_id);

        res.send('Book created succesfully');
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
})









module.exports = router; 