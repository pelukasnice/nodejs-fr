/* Al desestructurar el paquete express, se obtiene la función Router, esta se utiliza para crear un nuevo enrutador (o "router") que actúa como una mini-aplicación capaz de gestionar sus propias rutas y middleware de forma modular y organizada.*/
const { Router } = require('express');

const { check } = require('express-validator');

const {
        validarCampos,
        validarJWT,
        esAdminRole,
        tieneRole} = require('../middlewares');

const { esRoleValido, emailExiste, existeUsuarioPorId } = require('../helpers/db-validators');

const { 
        usuariosGet,
        usuariosPut,
        usuariosPost,
        usuariosDelete,
        usuariosPatch } = require('../controllers/usuarios');






const router = Router();


router.get('/', usuariosGet);


router.put('/:id', [
        check('id', 'id invalido').isMongoId(),
        check('id').custom(existeUsuarioPorId),
        check('rol').custom(esRoleValido),
        validarCampos
], usuariosPut);

/*¿Qué son los parámetros de ruta?
Los parámetros de ruta son segmentos de una URL que son variables y se representan con dos puntos : seguidos del nombre del parámetro.*/

router.post('/', [
        check('nombre', 'el nombre es obligatorio').not().isEmpty(),
        check('password', 'password mayor a 6 letras').isLength({ min: 6 }),
        check('correo', 'Correo invalido').isEmail(),
        check('correo').custom(emailExiste),
        //check('role','rol invalido').isIn(['ADMIN_ROLE','USER_ROLE']),
        check('rol').custom(esRoleValido),
        validarCampos
], usuariosPost);


router.delete('/:id', [
        validarJWT,
        //esAdminRole,
        tieneRole('ADMIN_ROLE', 'VENTAS_ROLE'),
        check('id', 'id invalido').isMongoId(),
        check('id').custom(existeUsuarioPorId),
        validarCampos
], usuariosDelete);

router.patch('/api', usuariosPatch);


module.exports = router;






