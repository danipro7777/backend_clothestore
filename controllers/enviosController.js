'use strict';
const db = require("../models");
const ENVIOS = db.envios;
const VENTAS = db.ventas;

// Métodos CRUD
module.exports = {

    // Obtener todos los registros de envíos con sus ventas asociadas
    async findAll(req, res) {
        try {
            const envios = await ENVIOS.findAll({
                include: [
                    { model: VENTAS, attributes: ['idVenta', 'fechaVenta'] }
                ]
            });
            res.status(200).json(envios);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    // Obtener un registro de envío por su idEnvio
    async findById(req, res) {
        const { id } = req.params;
        try {
            const envio = await ENVIOS.findByPk(id, {
                include: [
                    { model: VENTAS, attributes: ['idVenta', 'fechaVenta'] }
                ]
            });
            if (!envio) {
                return res.status(404).json({ message: 'Envío no encontrado' });
            }
            res.status(200).json(envio);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    // Crear un nuevo registro en envíos
    async create(req, res) {
        const { fechaEnvio, estado, fechaRecepcion, idVenta } = req.body;
        try {
            const newEnvio = await ENVIOS.create({
                fechaEnvio,
                estado : 1,
                fechaRecepcion,
                idVenta
            });
            res.status(201).json(newEnvio);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    // Actualizar un registro de envío por su idEnvio
    async update(req, res) {
        const { id } = req.params;
        const { fechaEnvio, estado, fechaRecepcion, idVenta } = req.body;
        try {
            const envio = await ENVIOS.findByPk(id);
            if (!envio) {
                return res.status(404).json({ message: 'Envío no encontrado' });
            }

            // Actualizar solo los campos que fueron enviados
            if (fechaEnvio !== undefined) {
                envio.fechaEnvio = fechaEnvio;
            }
            if (estado !== undefined) {
                envio.estado = estado;
            }
            if (fechaRecepcion !== undefined) {
                envio.fechaRecepcion = fechaRecepcion;
            }
            if (idVenta !== undefined) {
                envio.idVenta = idVenta;
            }

            await envio.save(); // Guardar los cambios
            res.status(200).json(envio);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    // Eliminar un registro de envío por su idEnvio
    async delete(req, res) {
        const { id } = req.params;
        try {
            const envio = await ENVIOS.findByPk(id);
            if (!envio) {
                return res.status(404).json({ message: 'Envío no encontrado' });
            }
            await envio.destroy();
            res.status(200).json({ message: 'Envío eliminado correctamente' });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
};