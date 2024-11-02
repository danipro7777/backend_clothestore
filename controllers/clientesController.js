'use strict';
const db = require("../models");
const clientes = require("../models/clientes");
const Clientes = db.clientes;

// Métodos CRUD
module.exports = {

    // Obtener todos los clientes con estado activo
    find(req, res) {
        return Clientes.findAll({
            where: {
                estado: 1
            }
        })
            .then(clientes => {
                return res.status(200).json(clientes);
            })
            .catch(error => {
                console.error('Error al recuperar los clientes:', error);
                return res.status(500).json({
                    message: 'Ocurrió un error al recuperar los datos.'
                });
            });
    },

     // * obtener activos
     async findActive(req, res) {
        try {
            const clientes = await Clientes.findAll({
                where : {
                    estado : 1
                },
            });
            res.status(200).json(clientes);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

         // * obtener inactivos
         async findInactive(req, res) {
            try {
                const clientes = await Clientes.findAll({
                    where : {
                        estado : 0
                    },
                });
                res.status(200).json(clientes);
            } catch (error) {
                res.status(500).json({ error: error.message });
            }
        },

    findById(req, res) {
        const id = req.params.id;
        return Clientes.findByPk(id)
            .then(cliente => {
                if (!cliente) {
                    return res.status(404).json({
                        message: 'Cliente no encontrado.'
                    });
                }
                return res.status(200).json(cliente);
            })
            .catch(error => {
                console.error(`Error al recuperar el cliente con ID ${id}:`, error);
                return res.status(500).json({
                    message: 'Ocurrió un error al intentar recuperar el registro.'
                });
            });
    },

    createCliente(req, res) {
        const datos = req.body;

        if (!datos.nombre || !datos.edad || !datos.correo || !datos.telefono || !datos.direccion || !datos.idUsuario) {
            return res.status(400).json({ message: 'Faltan campos requeridos.' });
        }

        const datos_ingreso = { 
            nombre: datos.nombre,
            edad: datos.edad,
            correo: datos.correo,
            telefono: datos.telefono,
            direccion: datos.direccion,
            idUsuario: datos.idUsuario,
            estado: datos.estado !== undefined ? datos.estado : 1 
        };

        return Clientes.create(datos_ingreso)
            .then(cliente => {
                return res.status(201).json(cliente);
            })
            .catch(error => {
                console.error('Error al insertar el cliente:', error);
                return res.status(500).json({ error: 'Error al insertar el cliente' });
            });
    },

    updateCliente(req, res) {
        const datos = req.body;
        const id = req.params.id;

        const camposActualizados = {};
    
        if (datos.nombre !== undefined) camposActualizados.nombre = datos.nombre;
        if (datos.edad !== undefined) camposActualizados.edad = datos.edad;
        if (datos.correo !== undefined) camposActualizados.correo = datos.correo;
        if (datos.telefono !== undefined) camposActualizados.telefono = datos.telefono;
        if (datos.direccion !== undefined) camposActualizados.direccion = datos.direccion;
        if (datos.idUsuario !== undefined) camposActualizados.idUsuario = datos.idUsuario;
        if (datos.estado !== undefined) camposActualizados.estado = datos.estado; 

        return Clientes.update(
            camposActualizados,
            {
                where: { idCliente: id } 
            }
        )
        .then(([rowsUpdated]) => {
            if (rowsUpdated === 0) {
                return res.status(404).json({ message: 'Cliente no encontrado' });
            }
            return res.status(200).json({ message: 'El cliente ha sido actualizado' });
        })
        .catch(error => {
            console.error(`Error al actualizar el cliente con ID ${id}:`, error);
            return res.status(500).json({ error: 'Error al actualizar cliente' });
        });
    },    

    async deleteCliente(req, res) {
        const id = req.params.id; 
    
        try {
            const cliente = await Clientes.findByPk(id);
    
            if (!cliente) {
                return res.status(404).json({ error: 'Cliente no encontrado' });
            }
    
            await cliente.destroy();
            return res.status(200).json({ message: 'Cliente eliminado correctamente' });
        } catch (error) {
            console.error('Error al eliminar cliente:', error);
            return res.status(500).json({ error: 'Error al eliminar cliente' });
        }
    },

    // Método para activar un cliente
async activarCliente(req, res) {
    const id = req.params.id;

    try {
        const cliente = await Clientes.findByPk(id);
        if (!cliente) {
            return res.status(404).json({ error: 'Cliente no encontrado' });
        }

        cliente.estado = 1; // Establecer estado como activo
        await cliente.save(); // Guardar cambios

        return res.status(200).json({ message: 'Cliente activado correctamente' });
    } catch (error) {
        console.error('Error al activar el cliente:', error);
        return res.status(500).json({ error: 'Error al activar el cliente' });
    }
},

// Método para desactivar un cliente
async desactivarCliente(req, res) {
    const id = req.params.id;

    try {
        const cliente = await Clientes.findByPk(id);
        if (!cliente) {
            return res.status(404).json({ error: 'Cliente no encontrado' });
        }

        cliente.estado = 0; // Establecer estado como inactivo
        await cliente.save(); // Guardar cambios

        return res.status(200).json({ message: 'Cliente desactivado correctamente' });
    } catch (error) {
        console.error('Error al desactivar el cliente:', error);
        return res.status(500).json({ error: 'Error al desactivar el cliente' });
    }
}

};