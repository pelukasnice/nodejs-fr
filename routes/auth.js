const { Router } = require('express');

const { check } = require('express-validator');
const { route } = require('./usuarios');
const { login, googlesignIn } = require('../controllers/authController');
const { validarCampos } = require('../middlewares/validar-campos');


const router = Router();


router.post('/login',[
    check('correo','El correo es obligatorio').isEmail(),
    check('password','La contraseña es obligatoria').not().isEmpty(),
    validarCampos
], login );


router.post('/google',[
    check('id_token','id token obligatorio').not().isEmpty(),    
    validarCampos
], googlesignIn );




module.exports = router;







