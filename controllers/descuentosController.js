'use strict';
const Sequelize = require('sequelize');
const db = require('../models');
const Descuento = db.Descuento;

module.exports = {
    // Obtener todas las descuentos
    findAll: async (req, res) => {
        try {
            const data = await Descuento.findAll();
            res.json(data);
        } catch (error) {
            res.status(500).send({
                message: error.message || "Some error occurred while retrieving descuentos."
            });
        }
    },

    // Obtener descuento por ID
    findById: async (req, res) => {
        const id = req.params.id;
        try {
            const data = await Descuento.findByPk(id);
            if (data) {
                res.json(data);
            } else {
                res.status(404).send({
                    message: "Descuento not found with id=" + id
                });
            }
        } catch (error) {
            res.status(500).send({
                message: "Error retrieving descuento with id=" + id
            });
        }
    },

    // Crear nuevo descuento
    create: async (req, res) => {
        try {
            const { descuento, descripcion, estado = 1 } = req.body;
            if (!descuento || !descripcion) {
                return res.status(400).send({
                    message: "Los campos 'descuento' y 'descripcion' son requeridos."
                });
            }
            const data = await Descuento.create({ descuento, descripcion, estado });
            res.status(201).json(data);
        } catch (error) {
            res.status(500).send({
                message: error.message || "Some error occurred while creating the descuento."
            });
        }
    },

    // Actualizar descuento por ID
    update: async (req, res) => {
        const id = req.params.id;
        try {
            const [updated] = await Descuento.update(req.body, {
                where: { idDescuento: id },
                individualHooks: true
            });

            if (updated) {
                const updatedDescuento = await Descuento.findByPk(id);
                res.json(updatedDescuento);
            } else {
                res.status(404).send({
                    message: `Cannot update descuento with id=${id}. Maybe descuento was not found or req.body is empty!`
                });
            }
        } catch (error) {
            res.status(500).send({
                message: "Error updating descuento with id=" + id
            });
        }
    },

    // Eliminar descuento por ID
    delete: async (req, res) => {
        const id = req.params.id;
        try {
            const deleted = await Descuento.destroy({
                where: { idDescuento: id }
            });

            if (deleted) {
                res.status(204).send();
            } else {
                res.status(404).send({
                    message: `Cannot delete descuento with id=${id}. Maybe descuento was not found!`
                });
            }
        } catch (error) {
            res.status(500).send({
                message: "Could not delete descuento with id=" + id
            });
        }
    },
};
