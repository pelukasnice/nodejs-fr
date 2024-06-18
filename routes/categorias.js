const { Router } = require('express');
const { check } = require('express-validator');

const { validarJWT, validarCampos, esAdminRole } = require('../middlewares');

const {
    crearCategoria,
    obtenerCategorias,
    obtenerCategoria,
    actualizarCategoria,
    borrarCategoria } = require('../controllers/categoriasController');

const { existeCategoriaPorId } = require('../helpers/db-validators');

const router = Router();


//obtener todas las categorias - public
router.get('/', obtenerCategorias);

// obtener una categoria por id - publico
router.get('/:id', [
    check('id', 'no es un id de mongo valido').isMongoId(),
    check('id').custom(existeCategoriaPorId),
    validarCampos,
], obtenerCategoria);

// crear categoria - private - cualquier persona con token valido
router.post('/', [
    validarJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    validarCampos
], crearCategoria);

// actualizar - privado
router.put('/:id', [
    validarJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('id').custom(existeCategoriaPorId),
    validarCampos
], actualizarCategoria);


// borrar una categoria -admin
router.delete('/:id',[
    validarJWT,
    esAdminRole,
    check('id', 'no es un id de mongo valido').isMongoId(),
    check('id').custom(existeCategoriaPorId),
    validarCampos
], borrarCategoria);


module.exports = router;
