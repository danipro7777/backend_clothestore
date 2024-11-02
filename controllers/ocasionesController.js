'use strict';
const db = require("../models");
const OCASIONES = db.ocasiones;

// Métodos CRUD
module.exports = {
    findAll: async (req, res) => {
        try {
            const ocasiones = await OCASIONES.findAll({
                where: {estado: 1}
            });
            res.status(200).json(ocasiones);
        } catch (error) {
            res.status(500).json({ message: "Error al obtener las ocasiones", error });
        }
    },

    findById: async (req, res) => {
        const { idOcasion } = req.params;
        try {
            const ocasion = await OCASIONES.findByPk(idOcasion);
            if (ocasion) {
                res.status(200).json(ocasion);
            } else {
                res.status(404).json({ message: "Ocasión no encontrada" });
            }
        } catch (error) {
            res.status(500).json({ message: "Error al obtener la ocasión", error });
        }
    },

    create: async (req, res) => {
        const { ocasion } = req.body;
        try {
            const nuevaOcasion = await OCASIONES.create({
                ocasion,
                estado: 1 // Estado por defecto como 1
            });
            res.status(201).json({ message: "Ocasión creada correctamente", nuevaOcasion });
        } catch (error) {
            res.status(500).json({ message: "Error al crear la ocasión", error });
        }
    },

    update: async (req, res) => {
        const { idOcasion } = req.params;
        const { ocasion, estado } = req.body;
        try {
            const ocasionEncontrada = await OCASIONES.findByPk(idOcasion);
            if (ocasionEncontrada) {
                // Actualiza solo los campos que estén presentes en req.body
                await ocasionEncontrada.update({
                    ocasion: ocasion !== undefined ? ocasion : ocasionEncontrada.ocasion,
                    estado: estado !== undefined ? estado : ocasionEncontrada.estado,
                });
                res.status(200).json({ message: "Ocasión actualizada correctamente", ocasionEncontrada });
            } else {
                res.status(404).json({ message: "Ocasión no encontrada" });
            }
        } catch (error) {
            res.status(500).json({ message: "Error al actualizar la ocasión", error });
        }
    },

    delete: async (req, res) => {
        const { idOcasion } = req.params;
        try {
            const ocasion = await OCASIONES.findByPk(idOcasion);
            if (ocasion) {
                await ocasion.destroy();
                res.status(200).json({ message: "Ocasión eliminada correctamente" });
            } else {
                res.status(404).json({ message: "Ocasión no encontrada" });
            }
        } catch (error) {
            res.status(500).json({ message: "Error al eliminar la ocasión", error });
        }
    },
    //  Obtener todas las ocasiones activas
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
    // Obtener todas las ocasiones inactivas
    async findInactive(req, res) {
        try {
            const detalle = await OCASIONES.findAll({
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
