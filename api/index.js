const server = require("./src/app");
const { conn } = require("./src/db");
const port = process.env.PORT || "3001";


conn.sync({ force: false }).then(() => {
  server.listen(port, () => {
    console.log("Server: servidor corriendo en puerto 3001");
  });
});




conn
  .authenticate()
  .then(() => {
    console.log("Data Base: conectado a la base de datos con éxito!");
  })
  .catch((err) => {
    console.error(
      "Data Base: error al conectarse a la base de datos!:",
      err.message
    );
  });
