'use strict';
const Sequelize = require('sequelize');
const db = require('../models');
const Cupon = db.Cupon;

module.exports = {
    // Obtener todos los cupones
    findAll: async (req, res) => {
        try {
            const data = await Cupon.findAll();
            res.json(data);
        } catch (error) {
            res.status(500).send({
                message: error.message || "Some error occurred while retrieving cupones."
            });
        }
    },

    // Obtener un cupón por ID
    findById: async (req, res) => {
        const id = req.params.id;
        try {
            const data = await Cupon.findByPk(id);
            if (data) {
                res.json(data);
            } else {
                res.status(404).send({
                    message: `Cupon not found with id=${id}`
                });
            }
        } catch (error) {
            res.status(500).send({
                message: "Error retrieving cupon with id=" + id
            });
        }
    },

    // Crear un nuevo cupón
    create: async (req, res) => {
        try {
            const { codigo, descuento, descripcion, estado = 1 } = req.body;
            if (!codigo || !descuento || !descripcion) {
                return res.status(400).send({
                    message: "Los campos 'codigo', 'descuento', y 'descripcion' son requeridos."
                });
            }
            const data = await Cupon.create({ codigo, descuento, descripcion, estado });
            res.status(201).json(data);
        } catch (error) {
            res.status(500).send({
                message: error.message || "Some error occurred while creating the cupon."
            });
        }
    },

    // Actualizar un cupón por ID
    update: async (req, res) => {
        const id = req.params.id;
        try {
            const [updated] = await Cupon.update(req.body, {
                where: { idCupon: id },
                individualHooks: true
            });

            if (updated) {
                const updatedCupon = await Cupon.findByPk(id);
                res.json(updatedCupon);
            } else {
                res.status(404).send({
                    message: `Cannot update cupon with id=${id}. Maybe cupon was not found or req.body is empty!`
                });
            }
        } catch (error) {
            res.status(500).send({
                message: "Error updating cupon with id=" + id
            });
        }
    },

    // Eliminar un cupón por ID
    delete: async (req, res) => {
        const id = req.params.id;
        try {
            const deleted = await Cupon.destroy({
                where: { idCupon: id }
            });

            if (deleted) {
                res.status(204).send();
            } else {
                res.status(404).send({
                    message: `Cannot delete cupon with id=${id}. Maybe cupon was not found!`
                });
            }
        } catch (error) {
            res.status(500).send({
                message: "Could not delete cupon with id=" + id
            });
        }
    },
};
