'use strict';
const db = require("../models");
const devoluciones = require("../models/devoluciones");
const Devoluciones = db.devoluciones;

// Métodos CRUD
module.exports = {

    // Obtener todos los clientes con estado activo
    find(req, res) {
        return Devoluciones.findAll({
            where: {
                estado: 1
            }
        })
            .then(devoluciones => {
                return res.status(200).json(devoluciones);
            })
            .catch(error => {
                console.error('Error al recuperar las devoluciones:', error);
                return res.status(500).json({
                    message: 'Ocurrió un error al recuperar los datos.'
                });
            });
    },

    findById(req, res) {
        const id = req.params.id;
        return Devoluciones.findByPk(id)
            .then(devoluciones => {
                if (!devoluciones) {
                    return res.status(404).json({
                        message: 'Devolución no encontrada.'
                    });
                }
                return res.status(200).json(cliente);
            })
            .catch(error => {
                console.error(`Error al recuperar la devolución con ID ${id}:`, error);
                return res.status(500).json({
                    message: 'Ocurrió un error al intentar recuperar el registro.'
                });
            });
    },

    createDevolucion(req, res) {
        const datos = req.body;

        if (!datos.fechaDevolucion || !datos.descripcion || !datos.idVenta ) {
            return res.status(400).json({ message: 'Faltan campos requeridos.' });
        }

        const datos_ingreso = { 
            fechaDevolucion: datos.fechaDevolucion,
            descripcion: datos.descripcion,
            idVenta: datos.idVenta,
            estado: datos.estado !== undefined ? datos.estado : 1 
        };

        return Devoluciones.create(datos_ingreso)
            .then(devoluciones => {
                return res.status(201).json(devoluciones);
            })
            .catch(error => {
                console.error('Error al insertar la devolución:', error);
                return res.status(500).json({ error: 'Error al insertar la devolución' });
            });
    },

    updateDevolucion(req, res) {
        const datos = req.body;
        const id = req.params.id;

        const camposActualizados = {};
    
        if (datos.fechaDevolucion !== undefined) camposActualizados.fechaDevolucion = datos.fechaDevolucion;
        if (datos.descripcion !== undefined) camposActualizados.descripcion = datos.descripcion;
        if (datos.idVenta !== undefined) camposActualizados.idVenta = datos.idVenta;
        if (datos.estado !== undefined) camposActualizados.estado = datos.estado; 

        return Devoluciones.update(
            camposActualizados,
            {
                where: { idDevolucion: id } 
            }
        )
        .then(([rowsUpdated]) => {
            if (rowsUpdated === 0) {
                return res.status(404).json({ message: 'Devolución no encontrada' });
            }
            return res.status(200).json({ message: 'La devolución ha sido actualizada' });
        })
        .catch(error => {
            console.error(`Error al actualizar la devolución con ID ${id}:`, error);
            return res.status(500).json({ error: 'Error al actualizar devolución' });
        });
    },    

    async deleteDevolucion(req, res) {
        const id = req.params.id; 
    
        try {
            const devoluciones = await Devoluciones.findByPk(id);
    
            if (!devoluciones) {
                return res.status(404).json({ error: 'Devolución no encontrada' });
            }
    
            await devoluciones.destroy();
            return res.status(200).json({ message: 'Devoluión eliminada correctamente' });
        } catch (error) {
            console.error('Error al eliminar devolución:', error);
            return res.status(500).json({ error: 'Error al eliminar devolución' });
        }
    }
};