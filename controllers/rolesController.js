'use strict';
const db = require("../models");
const ROLES = db.roles;

module.exports = {

    // Obtener todos los roles
    async findAll(req, res) {
        try {
            const roles = await ROLES.findAll();
            res.status(200).json(roles);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    // Obtener un rol por su idRol
    async findById(req, res) {
        const { id } = req.params;
        try {
            const rol = await ROLES.findByPk(id);
            if (!rol) {
                return res.status(404).json({ message: 'Rol no encontrado' });
            }
            res.status(200).json(rol);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    // Crear un nuevo rol
    async create(req, res) {
        const { rol, estado } = req.body;
        try {
            const newRol = await ROLES.create({
                rol,
                estado: 1
            });
            res.status(201).json(newRol);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    // Actualizar un rol por su idRol
    async update(req, res) {
        const { id } = req.params;
        const { rol, estado } = req.body;
        try {
            const existingRol = await ROLES.findByPk(id);
            if (!existingRol) {
                return res.status(404).json({ message: 'Rol no encontrado' });
            }

            // Actualizar solo los campos que fueron enviados
            if (rol !== undefined) existingRol.rol = rol;
            if (estado !== undefined) existingRol.estado = estado;

            await existingRol.save();
            res.status(200).json(existingRol);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    // Eliminar un rol por su idRol
    async delete(req, res) {
        const { id } = req.params;
        try {
            const rol = await ROLES.findByPk(id);
            if (!rol) {
                return res.status(404).json({ message: 'Rol no encontrado' });
            }
            await rol.destroy();
            res.status(200).json({ message: 'Rol eliminado correctamente' });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
};
