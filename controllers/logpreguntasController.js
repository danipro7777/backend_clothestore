'use strict';
const db = require("../models");
const logpreguntas = require("../models/logpreguntas");
const Logpreguntas = db.logpreguntas;

// Métodos CRUD
module.exports = {

    find(req, res) {
        return Logpreguntas.findAll({
            where: {
                estado: 1
            }
        })
        .then(logpreguntas => {
            return res.status(200).send(logpreguntas);
        })
        .catch(error => {
            console.error('Error al obtener las preguntas:', error); 
            return res.status(500).send({
                message: 'Ocurrió un error al recuperar los datos.'
            });
        });
    },
    

    findById(req, res) {
        const id = req.params.id;
        return Logpreguntas.findByPk(id)
            .then(logpreguntas => {
                if (!logpreguntas) {
                    return res.status(404).send({
                        message: 'Log de preguntas no encontrado.'
                    });
                }
                return res.status(200).send(logpreguntas);
            })
            .catch(error => {
                return res.status(500).send({
                    message: 'Ocurrió un error al intentar recuperar el registro.'
                });
            });
    },


    createLogPreguntas(req, res) {
        let datos = req.body;
        const datos_ingreso = { 
            pregunta: datos.pregunta,
            respuesta: datos.respuesta,
            frecuencia: datos.frecuencia,
            estado: 1 
        }
            Logpreguntas.create(datos_ingreso)
        .then(logpreguntas => {
            res.status(201).send(logpreguntas);
        })
        .catch(error => {
            console.log(error);
            return res.status(500).json({ error: 'Error al insertar el log de preguntas' });
        });
    },

    updateLogPreguntas(req, res) {
        const datos = req.body;
        const id = req.params.id;

        const camposActualizados = {};
    
        if (datos.pregunta !== undefined) camposActualizados.pregunta = datos.pregunta;
        if (datos.respuesta !== undefined) camposActualizados.respuesta = datos.respuesta;
        if (datos.frecuencia !== undefined) camposActualizados.frecuencia = datos.frecuencia;
        if (datos.estado !== undefined) camposActualizados.estado = datos.estado; 

        return Logpreguntas.update(
            camposActualizados,
            {
                where: { idPregunta: id } 
            }
        )
        .then(([rowsUpdated]) => {
            if (rowsUpdated === 0) {
                return res.status(404).send({ message: 'Log de preguntas no encontrado' });
            }
            return res.status(200).send('El log de preguntas ha sido actualizado');
        })
        .catch(error => {
            console.log(error);
            return res.status(500).json({ error: 'Error al actualizar el Log de Preguntas' });
        });
    },    

    async deleteLogPreguntas(req, res) {
        const id = req.params.id; 
    
        try {
            const logpreguntas = await Logpreguntas.findByPk(id);
    
            if (!logpreguntas) {
                return res.status(404).json({ error: 'Log de preguntas no encontrado' });
            }
    
            await logpreguntas.destroy();
            return res.json({ message: 'Log de preguntas eliminado correctamente' });
        } catch (error) {
            console.error('Error al eliminar log de preguntas:', error);
            return res.status(500).json({ error: 'Error al eliminar el log de pregunta' });
        }
    }
};
