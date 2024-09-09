const { Router } = require('express');
const router = Router();
const { authenticateToken } = require('../middlewares/authenticateToken');

// Importa los controladores
const usuariosController = require('../controllers/usuariosController');
const pagosController = require('../controllers/pagosController');
const temporadasController = require('../controllers/temporadasController');
const logpreguntasController = require('../controllers/logpreguntasController');
const productosController = require('../controllers/productosController');
const ocasionesController = require('../controllers/ocasionesController');
const tallasController = require('../controllers/tallasController');
const cuponesController = require('../controllers/cuponesController');
const descuentoController = require('../controllers/descuentosController');
const detalleTemporadasController = require('../controllers/detalletemporadasController');

module.exports = (app) => {
    // Ruta para el login
    router.post('/login', usuariosController.login); // No se le aplica token porque es la ruta de login

    // Ruta para crear un nuevo usuario
    router.post('/usuarios', usuariosController.create); // No se le aplica token porque es la ruta de creación de usuario

    // <-------------------- USO DE TOKENS APARTIR DE AQUI --------------------
    router.use(authenticateToken); // Middleware para verificar el token

    // <-------------------- RUTAS --------------------
    // Rutas CRUD para usuarios
    router.get('/usuarios', usuariosController.find); // Obtiene todos los usuarios activos
    router.get('/usuarios/:id', usuariosController.findById); // Obtiene un usuario por ID
    router.put('/usuarios/:id', usuariosController.update); // Actualiza un usuario por ID
    router.delete('/usuarios/:id', usuariosController.delete); // Elimina un usuario por ID

    // Rutas CRUD para pagos
    router.get('/pagos', pagosController.findAll);
    router.get('/pagos/:id', pagosController.findById);
    router.post('/pagos', pagosController.create);
    router.put('/pagos/:id', pagosController.update);
    router.delete('/pagos/:id', pagosController.delete);

    router.post('/logout', authenticateToken, usuariosController.logout); // Ruta para cerrar sesión

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

    //RUTAS CRUD PRODUCTOS
    router.get('/productos', productosController.findAll);
    router.get('/productos/:idProducto', productosController.findById);
    router.post('/productos/create', productosController.create);
    router.put('/productos/update/:idProducto', productosController.update);
    router.delete('/productos/delete/:idProducto', productosController.delete);

    //RUTAS CRUD OCASIONES
    router.get('/ocasiones', ocasionesController.findAll);
    router.get('/ocasiones/:idOcasion', ocasionesController.findById);
    router.post('/ocasiones/create', ocasionesController.create);
    router.put('/ocasiones/update/:idOcasion', ocasionesController.update);
    router.delete('ocasiones/delete/:idOcasion', ocasionesController.delete);

      //RUTAS CRUD TALLA
      router.get('/talla', tallasController.findAll);
      router.get('/talla/:id', tallasController.findById);
      router.post('/talla/create', tallasController.create);
      router.put('/talla/update/:id', tallasController.update);
      router.delete('/talla/delete/:id', tallasController.delete);

      //RUTAS CRUD cupones
    router.get('/cupones', cuponesController.findAll);
    router.get('/cupones/:id', cuponesController.findById);
    router.post('/cupones/create', cuponesController.create);
    router.put('/cupones/update/:id', cuponesController.update);
    router.delete('/cupones/delete/:id', cuponesController.delete);

        //RUTAS CRUD descuento
        router.get('/descuentos', descuentoController.findAll);
        router.get('/descuentos/:id', descuentoController.findById);
        router.post('/descuentos/create', descuentoController.create);
        router.put('/descuentos/update/:id', descuentoController.update);
        router.delete('/descuentos/delete/:id', descuentoController.delete);

    //RUTAS CRUD DETALLETEMPORADAS
    router.get('/detalletemp', detalleTemporadasController.findAll);
    router.get('/detalletemp/:id', detalleTemporadasController.findById);
    router.post('/detalletemp/create', detalleTemporadasController.create);
    router.put('/detalletemp/update/:id', detalleTemporadasController.update);
    router.delete('/detalletemp/delete/:id', detalleTemporadasController.delete);

    app.use('/', router);

};
