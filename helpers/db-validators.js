
const Role = require('../models/role');
const {Usuario, Categoria} = require('../models')



const esRoleValido = async (rol = '') => {
    const existeRol = await Role.findOne({ rol });
    if (!existeRol) {
        throw new Error(`El rol ${rol} no esta registrado en la DB`)
    }
}


const emailExiste = async (correo = '') => {
    //verificar si correo existe
    const existeEmail = await Usuario.findOne({ correo });
    if (existeEmail) {
        throw new Error(`el correo: ${correo}, ya esta registrado`)
    }
}


const existeUsuarioPorId = async (id) => {
    //verificar si correo existe
    const existeUsuario = await Usuario.findById(id);
    if (!existeUsuario) {
        throw new Error(`el id no existe ${id}`);
    }
}

const existeCategoriaPorId = async (id) => {
    //verificar si id existe
    const existeCategoria = await Categoria.findById(id);
    if (!existeCategoria) {
        throw new Error(`el id no existe ${id}`);
    }
}


module.exports = {
    esRoleValido,
    emailExiste,
    existeUsuarioPorId,
    existeCategoriaPorId
    
}














