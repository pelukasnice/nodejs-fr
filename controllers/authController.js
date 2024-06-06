const { response } = require('express');
const Usuario = require('../models/usuario');
const bcryptjs = require('bcryptjs');
const { generarJWT } = require('../helpers/generarJWT');

const login =  async(req, res = response) => {

    const { correo, password } = req.body

    try {

        //Verificar email existe
        const usuario = await Usuario.findOne({correo});
        if(!usuario){
            return res.status(400).json({
                msg:'Usuario/ Password no son correctos - correo'
            })
        }
        //Verificar usuario activo
        if(!usuario.estado){
            return res.status(400).json({
                msg:'Usuario/ Password no son correctos - estado:false'
            })
        }
        // Verificar la contraseña
        const validaPassword = bcryptjs.compareSync(password, usuario.password);
        if(!validaPassword){
            return res.status(400).json({
                msg: 'Usuario/ Password no son correctos - password'
            })
        }

        //Generar el JWT
        const token = await generarJWT(usuario.id);

        res.json({
           usuario,
           token
        })

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            msg: 'Hable con el admin'
        })
    }



}






module.exports = {

    login

}
