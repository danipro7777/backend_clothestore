const { Router } = require('express');
const router = Router();

const tallaController = require('../controllers/tallasController');
const descuentoController = require('../controllers/descuentosController');
const cuponesController = require('../controllers/cuponesController');


module.exports = (app) => {

  //Tallas
  router.get('/tallas', tallaController.findAll);
  router.get('/tallas/:id', tallaController.findById);
  router.post('/tallas', tallaController.create);
  router.put('/tallas/:id', tallaController.update);
  router.delete('/tallas/:id', tallaController.delete);


  //Descuentos
  router.get('/descuentos', descuentoController.findAll);
  router.get('/descuentos/:id', descuentoController.findById);
  router.post('/descuentos', descuentoController.create);
  router.put('/descuentos/:id', descuentoController.update);
  router.delete('/descuentos/:id', descuentoController.delete);

  //Cupones
  router.get('/cupones', cuponesController.findAll);
  router.get('/cupones/:id', cuponesController.findById);
  router.post('/cupones', cuponesController.create);
  router.put('/cupones/:id', cuponesController.update);
  router.delete('/cupones/:id', cuponesController.delete);

  app.use('/', router);

};
