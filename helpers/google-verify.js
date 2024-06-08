

const { OAuth2Client } = require('google-auth-library');
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

const googleVerify = async (idToken) => {
    try {
        //console.log('Verificando idToken:', idToken); // Depuración
        const ticket = await client.verifyIdToken({
            idToken,
            audience: process.env.GOOGLE_CLIENT_ID,
        });
        const payload = ticket.getPayload();
        //console.log('Payload recibido:', payload); // Depuración
        const { name: nombre, picture: img, email: correo } = payload;

        return { nombre, img, correo };
    } catch (error) {
        console.error('Error al verificar el token:', error); // Depuración
        throw new Error('Error al verificar el token');
    }
};

module.exports = { googleVerify };




module.exports = {
    googleVerify
}






