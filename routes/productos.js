const { Router } = require('express');
const { check } = require('express-validator');

const { validarJWT, validarCampos, esAdminRole } = require('../middlewares');

const {
    crearCProducto,
    obtenerProductos,
    obtenerProducto,
    actualizarProducto,
    borrarProducto, 
    crearProducto} = require('../controllers/productosController')

const { existeCategoriaPorId, existeProductoPorId } = require('../helpers/db-validators');
const { crearCategoria } = require('../controllers/categoriasController');

const router = Router();


//obtener todas las categorias - public
router.get('/', obtenerProductos);

// obtener una categoria por id - publico
router.get('/:id', [
    check('id', 'no es un id de mongo valido').isMongoId(),
    check('id').custom(existeProductoPorId),
    validarCampos,
], obtenerProducto);

// crear categoria - private - cualquier persona con token valido
router.post('/', [
    validarJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('categoria', 'No es un id de mongo').isMongoId(),
    check('categoria').custom(existeCategoriaPorId),
    validarCampos
], crearProducto);

// actualizar - privado
router.put('/:id', [
    validarJWT,   
    //check('categoria', 'No es un id de mongo').isMongoId(),
    check('id').custom(existeProductoPorId),
    validarCampos
], actualizarProducto);


// borrar una categoria -admin
router.delete('/:id',[
    validarJWT,
    esAdminRole,
    check('id', 'no es un id de mongo valido').isMongoId(),
    check('id').custom(existeProductoPorId),
    validarCampos
], borrarProducto);


module.exports = router;




















