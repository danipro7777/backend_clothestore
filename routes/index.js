const { Router } = require('express');
const router = Router();

// Aqui van los imports
const pagosController = require('../controllers/pagosController');

module.exports = (app) => {

    //AQUI VAN LAS RUTAS
    // Pagos
    router.get('/pagos', pagosController.findAll);
    router.get('/pagos/:id', pagosController.findById);
    router.post('/pagos', pagosController.create);
    router.put('/pagos/:id', pagosController.update);
    router.delete('/pagos/:id', pagosController.delete);

    app.use('/', router);

};