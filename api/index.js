const server = require("./src/app");
const { conn } = require("./src/db");



conn.sync( { force: true } ).then(() =>{
    server.listen("3001", () => {
      console.log("Server: servidor corriendo en puerto 3001");
    });
  });
  


  conn
  .authenticate()
  .then(() => {
    console.log("Data Base: conectado a la base de datos con éxito!");
  })
  .catch((err) => {
    console.error("Data Base: error al conectarse a la base de datos!:", err.message);
  });











