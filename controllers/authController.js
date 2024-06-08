const { response } = require('express');
const Usuario = require('../models/usuario');
const bcryptjs = require('bcryptjs');
const { generarJWT } = require('../helpers/generarJWT');
const { googleVerify } = require('../helpers/google-verify');
const role = require('../models/role');

const login = async (req, res = response) => {

    const { correo, password } = req.body

    try {

        //Verificar email existe
        const usuario = await Usuario.findOne({ correo });
        if (!usuario) {
            return res.status(400).json({
                msg: 'Usuario/ Password no son correctos - correo'
            })
        }
        //Verificar usuario activo
        if (!usuario.estado) {
            return res.status(400).json({
                msg: 'Usuario/ Password no son correctos - estado:false'
            })
        }
        // Verificar la contraseña
        const validaPassword = bcryptjs.compareSync(password, usuario.password);
        if (!validaPassword) {
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


const googlesignIn = async (req, res = response) => {
    const { id_token } = req.body;


    try {


        const { nombre, img, correo } = await googleVerify(id_token);

        let usuario = await Usuario.findOne({ correo });

        if (!usuario) {
            //tengop que crearlo
            const data = {
                nombre,
                correo,
                password: ':D',
                img,
                google: true,
                rol: 'USER_ROLE'
            };

            usuario = new Usuario(data)
            await usuario.save();
        }

        // si el usuario en DB
        if (!usuario.estado) {
            return res.status(401).json({
                msg: 'Hable con el admin, usuario bloqueado'
            })
        }

        //generar JWT
        const token = await generarJWT(usuario.id);

        res.json({
            usuario,
            token
        });

    } catch (error) {
        res.status(400).json({
            ok: false,
            msg: 'El token no se pudo verificar'
        })

    }



}




module.exports = {
    googlesignIn,
    login

}
