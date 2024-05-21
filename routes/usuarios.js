const {Router} = require('express');
/* Al desestructurar el paquete express, se obtiene la función Router, esta se utiliza para crear un nuevo enrutador (o "router") que actúa como una mini-aplicación capaz de gestionar sus propias rutas y middleware de forma modular y organizada.*/ 

const { usuariosGet, 
        usuariosPut, 
        usuariosPost, 
        usuariosDelete, 
        usuariosPatch} = require('../controllers/usuarios');


const router = Router();


router.get('/', usuariosGet);


router.put('/:id', usuariosPut);

/*¿Qué son los parámetros de ruta?
Los parámetros de ruta son segmentos de una URL que son variables y se representan con dos puntos : seguidos del nombre del parámetro.*/

router.post('/', usuariosPost);


router.delete('/',usuariosDelete);

router.patch('/api', usuariosPatch);


module.exports = router;






