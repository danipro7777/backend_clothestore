'use strict';
const db = require("../models");
const detalleventas = require("../models/detalleventas");
const DetalleVentas = db.detalleventas;

// Métodos CRUD
module.exports = {

    // Obtener todos los clientes con estado activo
    find(req, res) {
        return DetalleVentas.findAll({
            where: {
                estado: 1
            }
        })
            .then(detalleventas => {
                return res.status(200).json(detalleventas);
            })
            .catch(error => {
                console.error('Error al recuperar el detalle de la venta:', error);
                return res.status(500).json({
                    message: 'Ocurrió un error al recuperar los datos.'
                });
            });
    },

    findById(req, res) {
        const id = req.params.id;
        return DetalleVentas.findByPk(id)
            .then(detalleventas => {
                if (!detalleventas) {
                    return res.status(404).json({
                        message: 'Detalle de la venta no encontrado.'
                    });
                }
                return res.status(200).json(detalleventas);
            })
            .catch(error => {
                console.error(`Error al recuperar el detalle de la venta con ID ${id}:`, error);
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

        return DetalleVentas.create(datos_ingreso)
            .then(detalleventas => {
                return res.status(201).json(detalleventas);
            })
            .catch(error => {
                console.error('Error al insertar el detalle de la venta:', error);
                return res.status(500).json({ error: 'Error al insertar el detalle de la venta' });
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

        return DetalleVentas.update(
            camposActualizados,
            {
                where: { idCliente: id } 
            }
        )
        .then(([rowsUpdated]) => {
            if (rowsUpdated === 0) {
                return res.status(404).json({ message: 'Detalle de la venta no encontrado' });
            }
            return res.status(200).json({ message: 'El detalle de la venta ha sido actualizado' });
        })
        .catch(error => {
            console.error(`Error al actualizar el detalle de la venta con ID ${id}:`, error);
            return res.status(500).json({ error: 'Error al actualizar el detalle de la venta' });
        });
    },    

    async deleteCliente(req, res) {
        const id = req.params.id; 
    
        try {
            const detalleventas = await DetalleVentas.findByPk(id);
    
            if (!detalleventas) {
                return res.status(404).json({ error: 'Detalle de la venta no encontrado' });
            }
    
            await detalleventas.destroy();
            return res.status(200).json({ message: 'Detalle de la venta eliminado correctamente' });
        } catch (error) {
            console.error('Error al eliminar detale de la venta:', error);
            return res.status(500).json({ error: 'Error al eliminar detalle de la venta' });
        }
    }
};