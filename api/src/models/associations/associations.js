

function associateModels (models) {
    models.Pokemons.hasMany(models.Evolutions, { foreignKey: 'pokemonId', timestamps: false }); 
    models.Evolutions.belongsTo(models.Pokemons, { foreignKey: 'pokemonId', timestamps: false });
}

  
module.exports = { associateModels };  

