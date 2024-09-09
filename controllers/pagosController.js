'use strict';
const db = require("../models");
const PAGOS = db.pagos;

// Métodos CRUD
module.exports = {
    // Find all
    findAll: async (req, res) => {
        try {
            const data = await PAGOS.findAll();
            res.json(data);
        } catch (error) {
            res.status(500).send({
                message: error.message || "Some error occurred while retrieving pagos."
            });
        }
    },

    // Find by ID
    findById: async (req, res) => {
        const id = req.params.id;
        try {
            const data = await PAGOS.findByPk(id);
            res.json(data);
        } catch (error) {
            res.status(500).send({
                message: "Error retrieving pagos with id=" + id
            });
        }
    },

    // Create
    create: async (req, res) => {
        try {
            const data = await PAGOS.create(req.body);
            res.json(data);
        } catch (error) {
            res.status(500).send({
                message: error.message || "Some error occurred while creating the pagos."
            });
        }
    },

    // Update by ID
    update: async (req, res) => {
        const id = req.params.id;
        try {
            const [updated] = await PAGOS.update(req.body, {
                where: { idPago: id },
                individualHooks: true // Esto aplica los hooks por cada registro
            });

            if (updated) {
                const updatedPago = await PAGOS.findByPk(id); // Obtener el registro actualizado
                res.json(updatedPago); // Retornar el registro actualizado
            } else {
                res.status(404).send({
                    message: `Cannot update pagos with id=${id}. Maybe pagos was not found or req.body is empty!`
                });
            }
        } catch (error) {
            res.status(500).send({
                message: "Error updating pagos with id=" + id
            });
        }
    },

    // Delete by ID
    delete: async (req, res) => {
        const id = req.params.id;
        try {
            const data = await PAGOS.destroy({
                where: { idPago: id }
            });
            res.json(data);
        } catch (error) {
            res.status(500).send({
                message: "Could not delete pagos with id=" + id
            });
        }
    },
};