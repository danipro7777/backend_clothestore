'use strict';
const Sequelize = require('sequelize');
const db = require('../models');
const Talla = db.Talla;

module.exports = {
    findAll: async (req, res) => {
        try {
            const data = await Talla.findAll();
            res.json(data);
        } catch (error) {
            res.status(500).send({
                message: error.message || "Some error occurred while retrieving tallas."
            });
        }
    },

    findById: async (req, res) => {
        const id = req.params.id;
        try {
            const data = await Talla.findByPk(id);
            if (data) {
                res.json(data);
            } else {
                res.status(404).send({
                    message: "Talla not found with id=" + id
                });
            }
        } catch (error) {
            res.status(500).send({
                message: "Error retrieving talla with id=" + id
            });
        }
    },

    create: async (req, res) => {
        try {
            const { talla, estado = 1 } = req.body; // Usa el valor por defecto para estado
            if (!talla) {
                return res.status(400).send({
                    message: "El campo 'talla' es requerido."
                });
            }
            const data = await Talla.create({ talla, estado });
            res.status(201).json(data);
        } catch (error) {
            res.status(500).send({
                message: error.message || "Some error occurred while creating the talla."
            });
        }
    },

    update: async (req, res) => {
        const id = req.params.id;
        try {
            const [updated] = await Talla.update(req.body, {
                where: { idTalla: id },
                individualHooks: true
            });

            if (updated) {
                const updatedTalla = await Talla.findByPk(id);
                res.json(updatedTalla);
            } else {
                res.status(404).send({
                    message: `Cannot update talla with id=${id}. Maybe talla was not found or req.body is empty!`
                });
            }
        } catch (error) {
            res.status(500).send({
                message: "Error updating talla with id=" + id
            });
        }
    },

    delete: async (req, res) => {
        const id = req.params.id;
        try {
            const deleted = await Talla.destroy({
                where: { idTalla: id }
            });

            if (deleted) {
                res.status(204).send();
            } else {
                res.status(404).send({
                    message: `Cannot delete talla with id=${id}. Maybe talla was not found!`
                });
            }
        } catch (error) {
            res.status(500).send({
                message: "Could not delete talla with id=" + id
            });
        }
    },
};
