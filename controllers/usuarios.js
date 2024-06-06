const { response } = require('express'); /* se importa response para que el vsc cuando se escribe res. abra las sugerencias*/

const bcryptjs = require('bcryptjs'); /* npm i bcryptjs se encarga de encriptar contraseñas*/

const Usuario = require('../models/usuario');/* se pone U mayusc. por que es un starndar, ya que se crean instancias*/

//----------------GET------------------

const usuariosGet = async (req, res = response) => {

    const { limite = 5, desde = 0 } = req.query;
    const query = { estado: true };


    const [total, usuarios] = await Promise.all([ /*promise.all ejecuta las promesas de forma simultanea*/
        Usuario.countDocuments(query),
        Usuario.find(query)
            .skip(Number(desde))
            .limit(Number(limite))/*transformamos con number el string a numero para que lo pueda leer*/
    ]);

    res.json({
        total,
        usuarios
    })
}


//----------------PUT------------------

const usuariosPut = async (req, res = response) => {
    /*Cuando defines una ruta con parámetros, esos parámetros se pueden acceder a través del objeto req.params.*/
    const { id } = req.params;
    const { _id, password, google, correo, ...resto } = req.body;

    if (password) {
        //encriptar contraseña
        const salt = bcryptjs.genSaltSync();
        resto.password = bcryptjs.hashSync(password, salt)
    }
    const usuario = await Usuario.findByIdAndUpdate(id, resto)

    res.json(usuario);


}

//----------------POST------------------


const usuariosPost = async (req, res = response) => {

    const { nombre, correo, password, rol } = req.body;
    const usuario = new Usuario({ nombre, correo, password, rol });

    // encriptar contraseña
    const salt = bcryptjs.genSaltSync();/*se utiliza para generar sal (salt) de manera sincrónica para el hash de contraseñas. La sal es un valor aleatorio que se añade a la contraseña antes de ser hasheada, por defecto esta en 10*/
    usuario.password = bcryptjs.hashSync(password, salt)

    await usuario.save();


    res.json({
        msg: 'post API - controller',
        usuario
    });
}

const usuariosDelete = async (req, res = response) => {
    try {
        const { id } = req.params;
        const uid = req.uid;

        // Actualizar el estado del usuario a false en lugar de eliminarlo físicamente
        const usuario = await Usuario.findByIdAndUpdate(id, { estado: false });
        const usuarioAutenticado = req.usuario;

        if (!usuario) {
            return res.status(404).json({
                msg: 'Usuario no encontrado'
            });
        }

        res.json(usuario);       
        

    } catch (error) {
        console.error(error);

        if (!res.headersSent) {
            res.status(500).json({
                msg: 'Error en el servidor'
            });
        }
    }
};


const usuariosPatch = (req, res = response) => {
    res.json({
        msg: 'patch API - controller'
    })
}




module.exports = {
    usuariosGet,
    usuariosPut,
    usuariosPost,
    usuariosDelete,
    usuariosPatch

}








