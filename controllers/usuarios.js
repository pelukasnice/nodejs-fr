const { response } = require('express'); /* se importa response para que el vsc cuando se escribe res. abra las sugerencias*/


const usuariosGet = (req, res = response) => {

    const {query} = req.query

    res.json ({
        
        msg: 'get API - controller',
        query
    });
}

const usuariosPut =(req, res = response) => {
    
    const {id} = req.params
    /*Cuando defines una ruta con parámetros, esos parámetros se pueden acceder a través del objeto req.params.*/

    res.json ({        
        msg: 'put API - controller',
        id
    });
}

const usuariosPost = (req, res = response) => {

    const {nombre, edad} = req.body;

    res.json ({        
        msg: 'post API - controller',
        nombre, 
        edad
    });
}

const usuariosDelete =  (req, res = response) => {
    res.json ({
        ok: true,
        msg: 'delete API - controller'
    });
}

const usuariosPatch =  (req, res = response) => {
    res.json({
        msg: 'patch API - controller'
    })
}




module.exports ={
    usuariosGet,
    usuariosPut,
    usuariosPost,
    usuariosDelete,
    usuariosPatch

}








