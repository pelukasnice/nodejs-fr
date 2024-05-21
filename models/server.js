const express = require("express");
const cors = require('cors');

class Server {

    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.usuariosPath = '/api/usuarios';
        //Middleware


        //rutas de mi app
        this.routes();
    }

    middlewares() {
        //cors
        this.app.use( cors() )

        // Lectura y pasrseo del body
        this.app.use( express.json() );

        //directorio publico
        this.app.use(express.static('public'));
    }
    /*Los endpoints de API suelen aceptar solicitudes HTTP (por ejemplo, GET, POST, PUT, DELETE) y devuelven respuestas en un formato específico, como JSON o XML.
    endpoint es cualquier dispositivo o nodo que pueda enviar o recibir datos a través de una red*/

    routes() {
        this.app.use(this.usuariosPath, require('../routes/usuarios'));
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log('servidor corriendo en puerto', this.port);
        });
    }


}

module.exports = Server;