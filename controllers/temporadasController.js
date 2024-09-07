'use strict';
const db = require("../models");
const temporadas = require("../models/temporadas");
const Temporadas = db.temporadas;

// Métodos CRUD
module.exports = {

    find(req, res) {
        return Temporadas.findAll({
            where: {
                estado: 1
            }
        })
            .then(temporadas => {
                return res.status(200).send(temporadas);
            })
            .catch(error => {
                return res.status(500).send({
                    message: 'Ocurrió un error al recuperar los datos.'
                });
            });
    },

    findById(req, res) {
        const id = req.params.id;
        return Temporadas.findByPk(id)
            .then(temporadas => {
                if (!temporadas) {
                    return res.status(404).send({
                        message: 'Temproada no encontrada.'
                    });
                }
                return res.status(200).send(temporadas);
            })
            .catch(error => {
                return res.status(500).send({
                    message: 'Ocurrió un error al intentar recuperar el registro.'
                });
            });
    },


    createTemporada(req, res) {
        let datos = req.body;
        const datos_ingreso = { 
            temporada: datos.temporada,
            estado: 1 
        }
            Temporadas.create(datos_ingreso)
        .then(temporadas => {
            res.status(201).send(temporadas);
        })
        .catch(error => {
            console.log(error);
            return res.status(500).json({ error: 'Error al insertar la temporada' });
        });
    },

    updateTemporada(req, res) {
        const datos = req.body;
        const id = req.params.id;

        const camposActualizados = {};
    
        if (datos.temporada !== undefined) camposActualizados.temporada = datos.temporada;
        if (datos.estado !== undefined) camposActualizados.estado = datos.estado; 

        return Temporadas.update(
            camposActualizados,
            {
                where: { idTemporada: id } 
            }
        )
        .then(([rowsUpdated]) => {
            if (rowsUpdated === 0) {
                return res.status(404).send({ message: 'Temporada no encontrada' });
            }
            return res.status(200).send('La temporada ha sido actualizada');
        })
        .catch(error => {
            console.log(error);
            return res.status(500).json({ error: 'Error al actualizar temporada' });
        });
    },    

    async deleteTemporada(req, res) {
        const id = req.params.id; 
    
        try {
            const temporada = await Temporadas.findByPk(id);
    
            if (!temporada) {
                return res.status(404).json({ error: 'Temporada no encontrada' });
            }
    
            await temporada.destroy();
            return res.json({ message: 'Temporada eliminada correctamente' });
        } catch (error) {
            console.error('Error al eliminar temporada:', error);
            return res.status(500).json({ error: 'Error al eliminar temporada' });
        }
    }
};
