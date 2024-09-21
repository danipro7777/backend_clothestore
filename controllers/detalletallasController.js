'use strict';
const db = require("../models");
const DETALLE_TALLAS = db.detalletallas;
const TALLAS = db.tallas;
const PRODUCTOS = db.productos;

// Métodos CRUD
module.exports = {

    // Obtener todos los registros de detalletallas con sus tallas y productos asociados
    async findAll(req, res) {
        try {
            const detalles = await DETALLE_TALLAS.findAll({
                include: [
                    { model: TALLAS, attributes: ['idTalla', 'nombre'] },
                    { model: PRODUCTOS, attributes: ['idProducto', 'nombre'] }
                ]
            });
            res.status(200).json(detalles);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    // Obtener un registro de detalleTalla por su idDetalleTalla
    async findById(req, res) {
        const { id } = req.params;
        try {
            const detalle = await DETALLE_TALLAS.findByPk(id, {
                include: [
                    { model: TALLAS, attributes: ['idTalla', 'nombre'] },
                    { model: PRODUCTOS, attributes: ['idProducto', 'nombre'] }
                ]
            });
            if (!detalle) {
                return res.status(404).json({ message: 'Detalle no encontrado' });
            }
            res.status(200).json(detalle);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    // Crear un nuevo registro en detalletallas
    async create(req, res) {
        const { estado, idTalla, idProducto } = req.body;
        try {
            const newDetalle = await DETALLE_TALLAS.create({
                estado,
                idTalla,
                idProducto
            });
            res.status(201).json(newDetalle);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    // Actualizar un registro de detalletallas por su idDetalleTalla
    async update(req, res) {
        const { id } = req.params;
        const { estado, idTalla, idProducto } = req.body;
        try {
            const detalle = await DETALLE_TALLAS.findByPk(id);
            if (!detalle) {
                return res.status(404).json({ message: 'Detalle no encontrado' });
            }

            // Actualizar solo los campos que fueron enviados
            if (estado !== undefined) {
                detalle.estado = estado;
            }
            if (idTalla !== undefined) {
                detalle.idTalla = idTalla;
            }
            if (idProducto !== undefined) {
                detalle.idProducto = idProducto;
            }

            await detalle.save(); // Guardar los cambios
            res.status(200).json(detalle);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    // Eliminar un registro de detalletallas por su idDetalleTalla
    async delete(req, res) {
        const { id } = req.params;
        try {
            const detalle = await DETALLE_TALLAS.findByPk(id);
            if (!detalle) {
                return res.status(404).json({ message: 'Detalle no encontrado' });
            }
            await detalle.destroy();
            res.status(200).json({ message: 'Detalle eliminado correctamente' });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
};