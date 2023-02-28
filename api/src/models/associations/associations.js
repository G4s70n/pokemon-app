// relación entre los modelos Pokemon y Evolution
/*   Pokemon.hasMany(Evolution, { as: 'Evolutions' });
  Evolution.belongsTo(Pokemon, { as: 'Pokemon' }); */


  
  function associateModels (models) {
    models.Pokemons.hasMany(models.Evolutions, { foreignKey: 'pokemonId', timestamps: false }); 
    models.Evolutions.belongsTo(models.Pokemons, { foreignKey: 'pokemonId', timestamps: false });
}

  
module.exports = { associateModels };  

