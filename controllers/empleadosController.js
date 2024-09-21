'use strict';
const db = require("../models");
const EMPLEADOS = db.empleados;
const ROLES = db.roles;

module.exports = {

    // Obtener todos los empleados con su rol asociado
    async findAll(req, res) {
        try {
            const empleados = await EMPLEADOS.findAll({
                include: [{ model: ROLES, attributes: ['idRol', 'rol'] }]
            });
            res.status(200).json(empleados);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    // Obtener un empleado por su idEmpleado
    async findById(req, res) {
        const { id } = req.params;
        try {
            const empleado = await EMPLEADOS.findByPk(id, {
                include: [{ model: ROLES, attributes: ['idRol', 'rol'] }]
            });
            if (!empleado) {
                return res.status(404).json({ message: 'Empleado no encontrado' });
            }
            res.status(200).json(empleado);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    // Crear un nuevo empleado
    async create(req, res) {
        const { nombre, correo, telefono, idUsuario, idRol, estado } = req.body;
        try {
            const newEmpleado = await EMPLEADOS.create({
                nombre,
                correo,
                telefono,
                idUsuario,
                idRol,
                estado: 1
            });
            res.status(201).json(newEmpleado);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    // Actualizar un empleado por su idEmpleado
    async update(req, res) {
        const { id } = req.params;
        const { nombre, correo, telefono, idUsuario, idRol, estado } = req.body;
        try {
            const empleado = await EMPLEADOS.findByPk(id);
            if (!empleado) {
                return res.status(404).json({ message: 'Empleado no encontrado' });
            }

            // Actualizar solo los campos que fueron enviados
            if (nombre !== undefined) empleado.nombre = nombre;
            if (correo !== undefined) empleado.correo = correo;
            if (telefono !== undefined) empleado.telefono = telefono;
            if (idUsuario !== undefined) empleado.idUsuario = idUsuario;
            if (idRol !== undefined) empleado.idRol = idRol;
            if (estado !== undefined) empleado.estado = estado;

            await empleado.save();
            res.status(200).json(empleado);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    // Eliminar un empleado por su idEmpleado
    async delete(req, res) {
        const { id } = req.params;
        try {
            const empleado = await EMPLEADOS.findByPk(id);
            if (!empleado) {
                return res.status(404).json({ message: 'Empleado no encontrado' });
            }
            await empleado.destroy();
            res.status(200).json({ message: 'Empleado eliminado correctamente' });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
};
