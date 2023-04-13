const express = require("express");
const morgan = require("morgan");
const cors = require('cors');
const routes = require('./routes/index');



const server = express();
server.name = 'API';

//cors permite que el servidor reciba solicitudes de un dominio diferente al que se encuetra a lojado
server.use(cors());

server.use(express.json({ limit: '50mb' }));
server.use(express.urlencoded({ extended: true, limit: '50mb' }));
server.use(morgan('dev'));



server.use((req, res, next) => {
    //establece la URL desde la cual se permiten solicitudes:
    res.header('Access-Control-Allow-Origin', 'http://localhost:3000'); // actualice para que coincida con el dominio desde el que realizará la solicitud
    res.header('Access-Control-Allow-Origin', '*'); 
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
  });

  


server.use('/', routes);



server.use((err, req, res, next) => { // eslint-disable-line no-unused-vars
    const status = err.status || 500;
    const message = err.message || err;
    console.error(err);
    res.status(status).send(message);
    
  });



module.exports = server;

