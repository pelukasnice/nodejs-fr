const express = require("express");
const cors = require('cors');
const fileUpload = require("express-fileupload");

const {dbConnection} = require('../Database/config');


/* HAY QUE DESCARGAR MONGOOSE (ORM) " npm i mongoose"*/

class Server {

    constructor() {
        this.app = express();
        this.port = process.env.PORT;

        this.paths = {
            auth:'/api/auth',
            buscar:'/api/buscar',
            categorias:'/api/categorias',
            usuarios: '/api/usuarios',
            productos:'/api/productos',
            uploads:'/api/uploads'
        }        

        //Conectar a la base de datos
        this.conectarDB();
        
        //Middleware
        this.middlewares();


        //rutas de mi app
        this.routes();
    }

    async conectarDB() {
        await dbConnection();
    }

    middlewares() {
        //cors
        this.app.use( cors() )

        // Lectura y pasrseo del body
        this.app.use( express.json() );

        //directorio publico
        this.app.use(express.static('public'));

        //Fileupload - carga de archivos
        this.app.use(fileUpload({
            useTempFiles:true,
            tempFileDir:'/tmp/',
            createParentPath: true
        }));
    }
    /*Los endpoints de API suelen aceptar solicitudes HTTP (por ejemplo, GET, POST, PUT, DELETE) y devuelven respuestas en un formato específico, como JSON o XML.
    endpoint es cualquier dispositivo o nodo que pueda enviar o recibir datos a través de una red*/

    routes() {
        this.app.use(this.paths.auth, require('../routes/auth'));
        this.app.use(this.paths.buscar, require('../routes/buscar'));
        this.app.use(this.paths.categorias, require('../routes/categorias'));
        this.app.use(this.paths.productos, require('../routes/productos'));
        this.app.use(this.paths.usuarios, require('../routes/usuarios'));
        this.app.use(this.paths.uploads, require('../routes/uploads'));
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log('servidor corriendo en puerto', this.port);
        });
    }


}

module.exports = Server;