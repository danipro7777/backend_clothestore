const { Router } = require('express');
const router = Router();

// Aqui van los imports
const temporadasController = require('../controllers/temporadasController');
const logpreguntasController = require('../controllers/logpreguntasController');
//RUTAS

module.exports = (app) => {

    //AQUI VAN LAS RUTAS

    //RUTAS CRUD TEMPORADAS
    router.get('/temporada', temporadasController.find);
    router.get('/temporada/:id', temporadasController.findById);
    router.post('/temporada/create', temporadasController.createTemporada);
    router.put('/temporada/update/:id', temporadasController.updateTemporada);
    router.delete('/temporada/delete/:id', temporadasController.deleteTemporada);

    
    //RUTAS CRUD LOG DE PREGUNTAS
    router.get('/logpreguntas', logpreguntasController.find);
    router.get('/logpreguntas/:id', logpreguntasController.findById);
    router.post('/logpreguntas/create', logpreguntasController.createLogPreguntas);
    router.put('/logpreguntas/update/:id', logpreguntasController.updateLogPreguntas);
    router.delete('/logpreguntas/delete/:id', logpreguntasController.deleteLogPreguntas);

    app.use('/', router);


};