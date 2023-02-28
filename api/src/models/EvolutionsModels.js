const { DataTypes } = require("sequelize");


module.exports = (sequelize) => {

    sequelize.define('Evolutions', {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true
        },
        evolutionId: {
          type: DataTypes.INTEGER,
          allowNull: false
          
        },
        name: {
          type: DataTypes.STRING,
          allowNull: false
        },
        image: {
          type: DataTypes.STRING,
          allowNull: false
        },
      })
}



