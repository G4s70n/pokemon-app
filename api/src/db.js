require('dotenv').config();
const { Sequelize } = require('sequelize');
const fs = require('fs');
const path = require('path');





// Obtenemos las credenciales de la base de datos desde el archivo .env
const { DB_USER, DB_PASSWORD, DB_HOST, DB_NAME, DEPLOY_DB} = process.env;

//URL localhost:
//const sequelize = new Sequelize(`postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/${DB_NAME}`,
const sequelize = new Sequelize(DEPLOY_DB, {
    logging: false, // set to console.log to see the raw SQL queries
    native: false, // lets Sequelize know we can use pg-native for ~30% more speed
});


const basename = path.basename(__filename);
const modelDefiners = [];



// Leemos los archivos de la carpeta 'models' y agregamos sus definiciones al arreglo modelDefiners
fs.readdirSync(path.join(__dirname, 'models'))
.filter((file) => file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.js')
.forEach((file) => {
modelDefiners.push(require(path.join(__dirname, 'models', file)));
});


  
modelDefiners.forEach((modelDefiner) => {
    modelDefiner(sequelize);
    });


    

// Obtenemos los modelos y los asociamos
const models = sequelize.models;
const { associateModels } = require('./models/associations/associations.js');
associateModels(models);  


 


module.exports = {
...sequelize.models,  //para poder importar los modelos así: const { Product, User } = require('./db.js');
conn: sequelize,      //importamos la conexión
};