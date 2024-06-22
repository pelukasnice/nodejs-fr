const { v4: uuidv4 } = require('uuid');
const fs = require('fs');
const path = require('path');

//uuidv4(): Esta es una función que genera un UUID (Identificador Único Universal) versión 4. Un UUID versión 4 es un número aleatorio generado de manera que es muy poco probable que dos UUID sean iguales. Los UUID son comúnmente utilizados para identificar de manera única recursos en sistemas distribuidos.


const subirArchivo = (files, extensionesValidas = ['png', 'jpg', 'jpeg', 'gif'], carpeta = '') => {

    return new Promise((resolve, reject) => {

        const { archivo } = files;
        const nombreCortado = archivo.name.split('.');
        const extension = nombreCortado[nombreCortado.length - 1];

        //validar la extension        
        if (!extensionesValidas.includes(extension)) {
            return reject(`la extension ${extension} no es permitida,${extensionesValidas}`);
            
        }

        // Ruta donde se almacenará el archivo subido
        const uploadDir = path.resolve(__dirname, '../uploads');

        // Verificar si el directorio de subida existe, si no, crearlo recursivamente
        if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir, { recursive: true });
        }
        // nombre con uuid
        const nombreTemp = uuidv4() + '.' + extension;

        // Ruta completa donde se guardará el archivo subido
        const uploadPath = path.join(uploadDir,carpeta, nombreTemp);

        // Mover el archivo subido al directorio de destino
        archivo.mv(uploadPath, (err) => {
            if (err) {
                reject(err);
                
            }

            resolve(nombreTemp);
        });

    })




}



module.exports = {
    subirArchivo
}

















