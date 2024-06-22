
const dbvalidators = require('./db-validators');
const generarJWT = require('./generarJWT');
const googleVerify = require('./google-verify');
const subirArchivo = require('./subir-archivo');



module.exports ={
    ...dbvalidators,
    ...generarJWT,
    ...googleVerify,
    ...subirArchivo,
}





