'use strict';
const Sequelize = require('sequelize');
const db = require("../models");
const Usuarios = db.usuarios;
const jwt = require('jsonwebtoken');

function rot13(texto) {
    return texto.replace(/[a-zA-Z]/g, function(c) {
        return String.fromCharCode(
            (c <= 'Z' ? 90 : 122) >= (c = c.charCodeAt(0) + 13) ? c : c - 26
        );
    });
}

// Función para generar un token JWT
function generateToken(user) {
    const payload = {
        idUsuario: user.idUsuario,
        usuario: user.usuario
    };

    // Generar un token firmado con una duración de 1 hora
    const token = jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: '1h' });

    return token;
}

// Crear un nuevo token y almacenar en la base de datos
async function createToken(userId) {
    const token = generateToken({ idUsuario: userId });
    const expiresAt = new Date(Date.now() + 3600000); // Expira en 1 hora

    await Usuarios.update({
        token,
        tokenExpiresAt: expiresAt
    }, {
        where: { idUsuario: userId }
    });

    return token;
}

// Eliminar el token del usuario
async function deleteToken(userId) {
    await Usuarios.update({
        token: null,
        tokenExpiresAt: null
    }, {
        where: { idUsuario: userId }
    });
}

module.exports = {
    // Método LOGIN
    async login(req, res) {
        const { usuario, contrasenia } = req.body;

        try {
            const user = await Usuarios.findOne({
                where: {
                    usuario: usuario,
                    contrasenia: rot13(contrasenia),
                    estado: 1 // Verificamos que el usuario esté activo
                }
            });

            if (!user) {
                return res.status(404).send({
                    message: 'Credenciales inválidas o cuenta inactiva.'
                });
            }

            // Generar el token JWT y almacenarlo en la base de datos
            const token = await createToken(user.idUsuario);

            // Desencriptar contraseña antes de enviar la respuesta
            user.contrasenia = rot13(user.contrasenia);

            return res.status(200).send({
                message: 'Inicio de sesión exitoso.',
                usuario: user,
                token: token // Devolver el token al cliente
            });
        } catch (error) {
            console.error('Error en el login:', error);  // Imprimir el error en la consola
            return res.status(500).send({
                message: 'Ocurrió un error al intentar iniciar sesión.'
            });
        }
    },

    // Método LOGOUT
    async logout(req, res) {
        const userId = req.user.idUsuario; // Obtener el ID del usuario desde el token

        try {
            // Eliminar el token del usuario en la base de datos
            await deleteToken(userId);

            return res.status(200).send({
                message: 'Sesión cerrada exitosamente.'
            });
        } catch (error) {
            console.error('Error al cerrar sesión:', error);
            return res.status(500).send({
                message: 'Ocurrió un error al intentar cerrar sesión.'
            });
        }
    },

    // Métodos CRUD
    async find(req, res) {
        try {
            const users = await Usuarios.findAll({
                where: {
                    estado: 1 // Filtrar por estado 1
                }
            });

            // Desencriptar contraseñas
            const decryptedUsers = users.map(user => {
                user.contrasenia = rot13(user.contrasenia);
                return user;
            });

            return res.status(200).send(decryptedUsers);
        } catch (error) {
            return res.status(500).send({
                message: 'Ocurrió un error al recuperar los datos.'
            });
        }
    },

    async findById(req, res) {
        const id = req.params.id;

        try {
            const user = await Usuarios.findByPk(id);
            if (!user) {
                return res.status(404).send({
                    message: 'Usuario no encontrado.'
                });
            }

            // Desencriptar contraseña
            user.contrasenia = rot13(user.contrasenia);
            return res.status(200).send(user);
        } catch (error) {
            return res.status(500).send({
                message: 'Ocurrió un error al intentar recuperar el registro.'
            });
        }
    },

    async create(req, res) {
        const datos = req.body;
        const datos_ingreso = { 
            usuario: datos.usuario,
            contrasenia: rot13(datos.contrasenia), // Encriptar con ROT13
            estado: 1 // Asignar valor predeterminado de 1
        };

        try {
            const newUser = await Usuarios.create(datos_ingreso);
            return res.status(201).send(newUser);
        } catch (error) {
            console.log(error);
            return res.status(500).json({ error: 'Error al insertar usuario' });
        }
    },

    async update(req, res) {
        const datos = req.body;
        const id = req.params.id;

        const camposActualizados = {};

        if (datos.usuario !== undefined) camposActualizados.usuario = datos.usuario;
        if (datos.contrasenia !== undefined) camposActualizados.contrasenia = rot13(datos.contrasenia); // Encriptar con ROT13 si se actualiza
        if (datos.estado !== undefined) camposActualizados.estado = datos.estado; // Permite actualizar el estado

        try {
            const [rowsUpdated] = await Usuarios.update(camposActualizados, {
                where: { idUsuario: id }
            });

            if (rowsUpdated === 0) {
                return res.status(404).send({ message: 'Usuario no encontrado' });
            }

            return res.status(200).send('El usuario ha sido actualizado');
        } catch (error) {
            console.log(error);
            return res.status(500).json({ error: 'Error al actualizar usuario' });
        }
    },

    async delete(req, res) {
        const id = req.params.id;

        try {
            const user = await Usuarios.findByPk(id);
            if (!user) {
                return res.status(404).json({ error: 'Usuario no encontrado' });
            }

            // Eliminar el token del usuario antes de eliminar el usuario
            await deleteToken(user.idUsuario);

            await user.destroy();
            return res.json({ message: 'Usuario eliminado correctamente' });
        } catch (error) {
            console.error('Error al eliminar usuario:', error);
            return res.status(500).json({ error: 'Error al eliminar usuario' });
        }
    }
};