const { body, param, query, validationResult } = require('express-validator');



const validatePokemonData = [
  body("name").isString().notEmpty().matches(/^[a-zA-Z]+$/),
  body("image").isURL(),
  body("species").isString().notEmpty(),
  body("hp").isInt(),
  body("attack").isInt(),
  body("defense").isInt(),
  body("speed").isInt(),
  body("specialAttack").isInt(),
  body("specialDefense").isInt(),
  body("weight").isInt(),
  body("height").isInt(),
  (req, res, next) => {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
      return next();
    }
    res.status(400).json({ errors: errors.array() });
  },
];



const getByNameValidator = [
    param('name').isString().isLength({ max: 80 }),
    (req, res, next) => {
      const errors = validationResult(req);
      if (errors.isEmpty()) {
        return next();
      }
      res.status(400).json({ errors: errors.array() });
    },
  ];


  const idValidator = [
    param('id').isInt({ min: 1 }),
    (req, res, next) => {
      const errors = validationResult(req);
      if (errors.isEmpty()) {
        return next();
      }
      res.status(400).json({ errors: errors.array() });
    },
  ];



  module.exports = {
    validatePokemonData,
    getByNameValidator,
    idValidator
  };