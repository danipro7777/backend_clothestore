const { Router } = require('express');
const router = Router();
const { authenticateToken } = require('../middlewares/authenticateToken');

// Importa los controladores
const usuariosController = require('../controllers/usuariosController');
const pagosController = require('../controllers/pagosController');

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

    app.use('/', router);
};