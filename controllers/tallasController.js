'use strict';
const db = require('../models');
const tallas = require("../models/tallas");
const Talla = db.tallas;

module.exports = {
    // * get de todos
    findAll: async (req, res) => {
        try {
            const data = await Talla.findAll({
                where : {
                    estado : 1
                },
            });
            res.json(data);
        } catch (error) {
            res.status(500).send({
                message: error.message || "Some error occurred while retrieving tallas."
            });
        }
    },
    // *  get de uno
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
    // * crear uno nuevo
    create(req, res) {
        let datos = req.body;
        console.log('Datos recibidos:', datos); // Verifica qué datos estás recibiendo
    
        if (!datos || !datos.talla) {
            return res.status(400).json({ error: 'El campo talla es requerido' });
        }
    
        const datos_ingreso = { 
            talla: datos.talla,
            estado: 1 
        };
    
        Talla.create(datos_ingreso)
            .then(tallas => {
                res.status(201).send(tallas);
            })
            .catch(error => {
                console.log(error);
                return res.status(500).json({ error: 'Error al insertar la talla' });
            });
    },
    // * actualizar uno
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
    // *  eliminar uno
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
    // * obtener activos
    async findActive(req, res) {
        try {
            const tallas = await Talla.findAll({
                where : {
                    estado : 1
                },
            });
            res.status(200).json(tallas);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
    // * obtener inactivos
    async findInactive(req, res) {
        try {
            const tallas = await Talla.findAll({
                where : {
                    estado : 0
                },
            });
            res.status(200).json(tallas);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
};
