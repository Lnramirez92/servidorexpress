const express = require("express");
const app = express();
const PORT = 8080;

const Contenedor = require('./contenedor')
const contenedor = new Contenedor('./assets/productos.json')

app.get("/productos", (req, res) => {
    res.send(contenedor.getAll());
});

app.get("/productorandom", (req, res) => {
    const data = contenedor.getAll();
    const limite = data.length + 1;
    const random = Math.floor(Math.random() * (limite - 1)) + 1;

    res.send(contenedor.getById(random));
});

const server = app.listen(PORT, () => {
    console.log(`Servidor Http escuchando en el puerto ${server.address().port}.`);
});

server.on("Error ", error => console.log(`Error en el servidor: ${error}`));