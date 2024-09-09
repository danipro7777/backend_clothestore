'use strict';
const db = require("../models");
const INVENTARIOS = db.inventarios;
const PRODUCTOS = db.productos;

// Métodos CRUD
module.exports = {

    // Obtener todos los registros de inventarios con sus productos asociados
    async findAll(req, res) {
        try {
            const inventarios = await INVENTARIOS.findAll({
                include: [
                    { model: PRODUCTOS, attributes: ['idProducto', 'nombre', 'genero', 'color', 'descripcion'] }
                ]
            });
            res.status(200).json(inventarios);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    // Obtener un registro de inventarios por su idInventario
    async findById(req, res) {
        const { id } = req.params;
        try {
            const inventario = await INVENTARIOS.findByPk(id, {
                include: [
                    { model: PRODUCTOS, attributes: ['idProducto', 'nombre', 'genero', 'color', 'descripcion'] }
                ]
            });
            if (!inventario) {
                return res.status(404).json({ message: 'Inventario no encontrado' });
            }
            res.status(200).json(inventario);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    // Crear un nuevo registro en inventarios
    async create(req, res) {
        const { fechaIngreso, cantidad, idProducto } = req.body;
        try {
            const newInventario = await INVENTARIOS.create({
                fechaIngreso,
                cantidad,
                estado: 1,
                idProducto
            });
            res.status(201).json(newInventario);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    // Actualizar un registro de inventarios por su idInventario
    async update(req, res) {
        const { id } = req.params;
        const { fechaIngreso, cantidad, estado, idProducto } = req.body;
        try {
            const inventario = await INVENTARIOS.findByPk(id);
            if (!inventario) {
                return res.status(404).json({ message: 'Inventario no encontrado' });
            }

            // Actualizar solo los campos que fueron enviados
            if (fechaIngreso !== undefined) inventario.fechaIngreso = fechaIngreso;
            if (cantidad !== undefined) inventario.cantidad = cantidad;
            if (estado !== undefined) inventario.estado = estado;
            if (idProducto !== undefined) inventario.idProducto = idProducto;

            await inventario.save();
            res.status(200).json(inventario);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    // Eliminar un registro de inventarios por su idInventario
    async delete(req, res) {
        const { id } = req.params;
        try {
            const inventario = await INVENTARIOS.findByPk(id);
            if (!inventario) {
                return res.status(404).json({ message: 'Inventario no encontrado' });
            }
            await inventario.destroy();
            res.status(200).json({ message: 'Inventario eliminado correctamente' });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
};
