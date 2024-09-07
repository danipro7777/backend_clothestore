const { Router } = require('express');
const router = Router();
const { authenticateToken } = require('../middlewares/authenticateToken');

// Importa los controladores
const usuariosController = require('../controllers/usuariosController');
const pagosController = require('../controllers/pagosController');
const temporadasController = require('../controllers/temporadasController');
const logpreguntasController = require('../controllers/logpreguntasController');
const productosController = require('../controllers/productosController');

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

    app.use('/', router);
};