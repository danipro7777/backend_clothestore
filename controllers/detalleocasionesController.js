'use strict';
const { where } = require("sequelize");
const db = require("../models");
const DETALLEOCASIONES = db.detalleOcasiones;
const PRODUCTOS = db.productos;
const OCASIONES = db.ocasiones;

// Métodos CRUD
module.exports = {

    // Obtener todos los registros de detalleOcasiones con sus productos y ocasiones asociados
    async findAll(req, res) {
        try {
            const detalles = await DETALLEOCASIONES.findAll({
                include: [
                    { model: OCASIONES, attributes: ['idOcasion', 'ocasion'] },
                    { model: PRODUCTOS, attributes: ['idProducto', 'nombre'] }
                ],
                where: {estado: 1}
            });
            res.status(200).json(detalles);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    // Obtener un registro de detalleOcasiones por su idDetalleOcasion
    async findById(req, res) {
        const { id } = req.params;
        try {
            const detalle = await DETALLEOCASIONES.findByPk(id, {
                include: [
                    { model: OCASIONES, attributes: ['idOcasion', 'ocasion'] },
                    { model: PRODUCTOS, attributes: ['idProducto', 'nombre'] }
                ]
            });
            if (!detalle) {
                return res.status(404).json({ message: 'Detalle de ocasión no encontrado' });
            }
            res.status(200).json(detalle);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    // Crear un nuevo registro en detalleOcasiones
    async create(req, res) {
        const { idOcasion, idProducto} = req.body;
        try {
            const newDetalle = await DETALLEOCASIONES.create({
                idOcasion,
                idProducto,
                estado: 1
            });
            res.status(201).json(newDetalle);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    // Actualizar un registro de detalleOcasiones por su idDetalleOcasion
    async update(req, res) {
        const { id } = req.params;
        const { idOcasion, idProducto, estado } = req.body;
        try {
            const detalle = await DETALLEOCASIONES.findByPk(id);
            if (!detalle) {
                return res.status(404).json({ message: 'Detalle de ocasión no encontrado' });
            }

            // Actualizar solo los campos que fueron enviados
            if (idOcasion !== undefined) {
                detalle.idOcasion = idOcasion;
            }
            if (idProducto !== undefined) {
                detalle.idProducto = idProducto;
            }
            if (estado !== undefined) {
                detalle.estado = estado;
            }

            await detalle.save(); // Guardar los cambios
            res.status(200).json(detalle);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    // Eliminar un registro de detalleOcasiones por su idDetalleOcasion
    async delete(req, res) {
        const { id } = req.params;
        try {
            const detalle = await DETALLEOCASIONES.findByPk(id);
            if (!detalle) {
                return res.status(404).json({ message: 'Detalle de ocasión no encontrado' });
            }
            await detalle.destroy();
            res.status(200).json({ message: 'Detalle de ocasión eliminado correctamente' });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
    //  Obtener todas los detalles ocasiones activos
    async findActive(req, res) {
        try {
            const ocasion = await OCASIONES.findAll({
                where : {
                    estado : 1
                },
            });
            res.status(200).json(ocasion);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
    // Obtener todas los detalle ocasiones inactivos
    async findInactive(req, res) {
        try {
            const detalle = await DETALLEOCASIONES.findAll({
                where : {
                    estado : 0
                },
            });
            res.status(200).json(detalle);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
};
