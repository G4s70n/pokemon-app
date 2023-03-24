const { body, param, query, validationResult } = require('express-validator');
const validator = require('validator');


const validatePokemonData = [  body("name").isString().notEmpty().matches(/^[a-zA-Z]+$/),
body("image").optional().custom((value, { req }) => {
  if (value === null || validator.isURL(value)) {
    return true;
  } else {
    throw new Error("Invalid value");
  }
}),
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
  query('name').isString().isLength({ max: 80 }).matches(/^[a-zA-Z]+$/).optional({ checkFalsy: true }),
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