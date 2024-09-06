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

module.exports = {
    // Método LOGIN
    login(req, res) {
        const { usuario, contrasenia } = req.body;
    
        return Usuarios.findOne({
            where: {
                usuario: usuario,
                contrasenia: rot13(contrasenia),
                estado: 1 // Verificamos que el usuario esté activo
            }
        })
        .then(usuario => {
            if (!usuario) {
                return res.status(404).send({
                    message: 'Credenciales inválidas o cuenta inactiva.'
                });
            }
    
            // Generar el token JWT
            const token = generateToken(usuario);
    
            // Desencriptar contraseña antes de enviar la respuesta
            usuario.contrasenia = rot13(usuario.contrasenia);
    
            return res.status(200).send({
                message: 'Inicio de sesión exitoso.',
                usuario: usuario,
                token: token // Devolver el token al cliente
            });
        })
        .catch(error => {
            console.error('Error en el login:', error);  // Imprimir el error en la consola
            return res.status(500).send({
                message: 'Ocurrió un error al intentar iniciar sesión.'
            });
        });
    },
    

    // Métodos CRUD
    find(req, res) {
        return Usuarios.findAll({
            where: {
                estado: 1 // Filtrar por estado 1
            }
        })
            .then(usuarios => {
                // Desencriptar contraseñas
                usuarios = usuarios.map(usuario => {
                    usuario.contrasenia = rot13(usuario.contrasenia);
                    return usuario;
                });
                return res.status(200).send(usuarios);
            })
            .catch(error => {
                return res.status(500).send({
                    message: 'Ocurrió un error al recuperar los datos.'
                });
            });
    },

    findById(req, res) {
        const id = req.params.id; 
        return Usuarios.findByPk(id)
            .then(usuario => {
                if (!usuario) {
                    return res.status(404).send({
                        message: 'Usuario no encontrado.'
                    });
                }
                // Desencriptar contraseña
                usuario.contrasenia = rot13(usuario.contrasenia);
                return res.status(200).send(usuario);
            })
            .catch(error => {
                return res.status(500).send({
                    message: 'Ocurrió un error al intentar recuperar el registro.'
                });
            });
    },

    create(req, res) {
        let datos = req.body;
        const datos_ingreso = { 
            usuario: datos.usuario,
            contrasenia: rot13(datos.contrasenia), // Encriptar con ROT13
            estado: 1 // Asignar valor predeterminado de 1
        };

        Usuarios.create(datos_ingreso)
        .then(usuario => {
            res.status(201).send(usuario);
        })
        .catch(error => {
            console.log(error);
            return res.status(500).json({ error: 'Error al insertar usuario' });
        });
    },

    update(req, res) {
        const datos = req.body;
        const id = req.params.id;

        const camposActualizados = {};
    
        if (datos.usuario !== undefined) camposActualizados.usuario = datos.usuario;
        if (datos.contrasenia !== undefined) camposActualizados.contrasenia = rot13(datos.contrasenia); // Encriptar con ROT13 si se actualiza
        if (datos.estado !== undefined) camposActualizados.estado = datos.estado; // Permite actualizar el estado

        return Usuarios.update(
            camposActualizados,
            {
                where: { idUsuario: id }
            }
        )
        .then(([rowsUpdated]) => {
            if (rowsUpdated === 0) {
                return res.status(404).send({ message: 'Usuario no encontrado' });
            }
            return res.status(200).send('El usuario ha sido actualizado');
        })
        .catch(error => {
            console.log(error);
            return res.status(500).json({ error: 'Error al actualizar usuario' });
        });
    },

    async delete(req, res) {
        const id = req.params.id;

        try {
            const usuario = await Usuarios.findByPk(id);

            if (!usuario) {
                return res.status(404).json({ error: 'Usuario no encontrado' });
            }

            await usuario.destroy();
            return res.json({ message: 'Usuario eliminado correctamente' });
        } catch (error) {
            console.error('Error al eliminar usuario:', error);
            return res.status(500).json({ error: 'Error al eliminar usuario' });
        }
    }
};