'use strict';
const db = require("../models");
const DETALLETEMPORADAS = db.detalletemporadas;
const PRODUCTOS = db.productos;
const TEMPORADAS = db.temporadas;

// Métodos CRUD
module.exports = {

    // Obtener todos los registros de detalletemporadas con sus productos y temporadas asociados
    async findAll(req, res) {
        try {
            const detalles = await DETALLETEMPORADAS.findAll({
                include: [
                    { model: PRODUCTOS, attributes: ['idProducto', 'nombre', 'genero', 'color', 'descripcion'] },
                    { model: TEMPORADAS, attributes: ['idTemporada', 'temporada'] }
                ]
            });
            res.status(200).json(detalles);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    // Obtener un registro de detalletemporadas por su idDetalleTemporada
    async findById(req, res) {
        const { id } = req.params;
        try {
            const detalle = await DETALLETEMPORADAS.findByPk(id, {
                include: [
                    { model: PRODUCTOS, attributes: ['idProducto', 'nombre', 'genero', 'color', 'descripcion'] },
                    { model: TEMPORADAS, attributes: ['idTemporada', 'temporada'] }
                ]
            });
            if (!detalle) {
                return res.status(404).json({ message: 'Detalle de temporada no encontrado' });
            }
            res.status(200).json(detalle);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    // Crear un nuevo registro en detalletemporadas
    async create(req, res) {
        const { idTemporada, idProducto } = req.body;
        try {
            const newDetalle = await DETALLETEMPORADAS.create({
                idTemporada,
                idProducto
            });
            res.status(201).json(newDetalle);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    // Actualizar un registro de detalletemporadas por su idDetalleTemporada
    async update(req, res) {
        const { id } = req.params;
        const { idTemporada, idProducto } = req.body;
        try {
            const detalle = await DETALLETEMPORADAS.findByPk(id);
            if (!detalle) {
                return res.status(404).json({ message: 'Detalle de temporada no encontrado' });
            }
            detalle.idTemporada = idTemporada;
            detalle.idProducto = idProducto;
            await detalle.save();
            res.status(200).json(detalle);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    // Eliminar un registro de detalletemporadas por su idDetalleTemporada
    async delete(req, res) {
        const { id } = req.params;
        try {
            const detalle = await DETALLETEMPORADAS.findByPk(id);
            if (!detalle) {
                return res.status(404).json({ message: 'Detalle de temporada no encontrado' });
            }
            await detalle.destroy();
            res.status(200).json({ message: 'Detalle de temporada eliminado correctamente' });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
};
