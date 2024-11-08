const { Router } = require('express');
const upload = require('../middlewares/upload');
const express = require('express');
const path = require('path');
const router = Router();
// const { authenticateToken } = require('../middlewares/authenticateToken');

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
const clientesController = require('../controllers/clientesController');
const detalleTemporadasController = require('../controllers/detalletemporadasController');
const inventariosController = require('../controllers/inventariosController');
const ventasController = require('../controllers/ventasController');
const detalleventasController = require('../controllers/detalleventasController');
const devolucionesController = require('../controllers/devolucionesController');
const detalleOcasionesController = require('../controllers/detalleocasionesController');
const enviosController = require('../controllers/enviosController');
const detalleTallasController = require('../controllers/detalletallasController');
const empleadosController = require('../controllers/empleadosController');
const rolesController =  require('../controllers/rolesController');

module.exports = (app) => {
    // Ruta para el login
    router.post('/login', usuariosController.login); // No se le aplica token porque es la ruta de login

    // Ruta para crear un nuevo usuario
    router.post('/createuser', usuariosController.create); // No se le aplica token porque es la ruta de creación de usuario

    // ! <-------------------- USO DE TOKENS APARTIR DE AQUI --------------------
    // ! POR EL MOMENTO SE VA A DESACTIVAR LA AUTENTICACION DE TOKENS PARA PODER PROBAR LAS RUTAS
    // router.use(authenticateToken); // Middleware para verificar el token

   // router.post('/logout/:id', usuariosController.logout); // Ruta para cerrar sesión
    
    // <-------------------- RUTAS --------------------
    // Rutas CRUD para usuarios
    router.get('/usuarios/activos', usuariosController.find); // Obtiene todos los usuarios activos
    router.get('/usuarios/all', usuariosController.find_all_users); // Obtiene todos los usuarios inactivos
    router.get('/usuarios/activos', usuariosController.find); // Obtiene todos los usuarios activos
    router.get('/usuarios/all', usuariosController.find_all_users); // Obtiene todos los usuarios inactivos
    router.get('/usuarios/:id', usuariosController.findById); // Obtiene un usuario por ID
    router.put('/usuarios/:id', usuariosController.update); // Actualiza un usuario por ID
    router.put('/usuarios/updatePassword/:id', usuariosController.update_password); // Actualiza la contraseña de un usuario por ID
    router.put('/usuarios/updatePassword/:id', usuariosController.update_password); // Actualiza la contraseña de un usuario por ID
    router.delete('/usuarios/:id', usuariosController.delete); // Elimina un usuario por ID

    // Rutas CRUD para pagos
    router.get('/pagos', pagosController.findAll);
    router.get('/pagos/:id', pagosController.findById);
    router.post('/pagos/create', pagosController.create);
    router.put('/pagos/update/:id', pagosController.update);
    router.delete('/pagos/delete/:id', pagosController.delete);

    //RUTAS CRUD TEMPORADAS
    router.get('/temporada', temporadasController.find);
    router.get('/temporada/inactivas', temporadasController.findInactive);
    router.get('/temporada/:id', temporadasController.findById); 
    router.get('/temporada/inactivas', temporadasController.findInactive);
    router.get('/temporada/:id', temporadasController.findById); 
    router.post('/temporada/create', temporadasController.createTemporada);
    router.put('/temporada/update/:id', temporadasController.updateTemporada);
    router.delete('/temporada/delete/:id', temporadasController.deleteTemporada);

    //RUTAS CRUD CLIENTES
    router.get('/clientes/activos', clientesController.findActive);
   router.get('/clientes/inactivos', clientesController.findInactive);
    router.get('/clientes', clientesController.find);
    router.get('/clientes/:id', clientesController.findById);
    router.post('/clientes/create', clientesController.createCliente);
    router.put('/clientes/update/:id', clientesController.updateCliente);
    router.delete('/clientes/delete/:id', clientesController.deleteCliente);
    router.put('/clientes/activar/:id', clientesController.activarCliente);
    router.put('/clientes/desactivar/:id', clientesController.desactivarCliente);

  
    //RUTAS CRUD LOG DE PREGUNTAS 
    router.get('/logpreguntas', logpreguntasController.find);
    router.get('/logpreguntas/:id', logpreguntasController.findById);
    router.post('/logpreguntas/create', logpreguntasController.createLogPreguntas);
    router.put('/logpreguntas/update/:id', logpreguntasController.updateLogPreguntas);
    router.delete('/logpreguntas/delete/:id', logpreguntasController.deleteLogPreguntas);

    //RUTAS CRUD PRODUCTOS
    router.use('/uploads', express.static(path.join(__dirname, '../uploads')));

    router.get('/productos/activos', productosController.findActive);
    router.get('/productos/inactivos', productosController.findInactive);
    router.get('/productos', productosController.findAll);
    router.get('/productos/:idProducto', productosController.findById);
    router.post('/productos/inventario', upload.single('foto'), productosController.createProductWithInventory);
    router.post('/productos/create', upload.single('foto'), productosController.create);
    router.put('/productos/update/:idProducto', upload.single('foto'), productosController.update);
    router.put('/productos/:idProducto/inventario', upload.single('foto'), productosController.updateProductAndInventory);
    router.delete('/productos/delete/:idProducto', productosController.delete);

    //RUTAS CRUD OCASIONES
    router.get('/ocasiones', ocasionesController.findAll);
    router.get('/ocasiones/activos', ocasionesController.findActive);
    router.get('/ocasiones/inactivos', ocasionesController.findInactive);
    router.get('/ocasiones/activos', ocasionesController.findActive);
    router.get('/ocasiones/inactivos', ocasionesController.findInactive);
    router.get('/ocasiones/:idOcasion', ocasionesController.findById);
    router.post('/ocasiones/create', ocasionesController.create);
    router.put('/ocasiones/update/:idOcasion', ocasionesController.update);
    router.delete('ocasiones/delete/:idOcasion', ocasionesController.delete);

    //RUTAS CRUD TALLA
    router.get('/talla', tallasController.findAll);
    router.get('/talla/activos', tallasController.findActive);
    router.get('/talla/inactivos', tallasController.findInactive);
    router.get('/talla/activos', tallasController.findActive);
    router.get('/talla/inactivos', tallasController.findInactive);
    router.get('/talla/:id', tallasController.findById);
    router.post('/talla/create', tallasController.create);
    router.put('/talla/update/:id', tallasController.update);
    router.delete('/talla/delete/:id', tallasController.delete);

    //RUTAS CRUD cupones
    router.get('/cupones', cuponesController.findAll);
    router.get('/cupones/:codigo', cuponesController.findByCodigo);
    router.get('/cupones/:id', cuponesController.findById);
    router.post('/cupones/create', cuponesController.create);
    router.put('/cupones/update/:id', cuponesController.update);
    router.delete('/cupones/delete/:id', cuponesController.delete);

    //RUTAS CRUD descuento
    router.get('/descuentos/activos', descuentoController.findActive);
    router.get('/descuentos/inactivos', descuentoController.findInactive);
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

    //RUTAS CRUD DETALLEVENTAS
    router.get('/detalleventas', detalleventasController.find);
    router.get('/detalleventas/:id', detalleventasController.findById);
    router.post('/detalleventas/create', detalleventasController.createDetalleVenta);
    router.put('/detalleventas/update/:id', detalleventasController.updateDetalleVenta);
    router.delete('/detalleventas/delete/:id', detalleventasController.deleteDetalleVenta);

    //RUTAS CRUD DEVOLUCIONES
    router.get('/devolucion', devolucionesController.find);
    router.get('/devolucion/:id', devolucionesController.findById);
    router.post('/devolucion/create', devolucionesController.createDevolucion);
    router.post('/devolucionCascada/create', devolucionesController.createDevolucionCascada);
    router.put('/devolucion/update/:id', devolucionesController.updateDevolucion);
    router.delete('/devolucion/delete/:id', devolucionesController.deleteDevolucion);

    //RUTAS CRUD INVENTARIOS
    router.get('/inventarios/activos', inventariosController.findAll);
    router.get('/inventarios/activos', inventariosController.findAll);
    router.get('/inventarios', inventariosController.findAll);
    router.get('/inventarios/productos', inventariosController.findAllProducts);
    router.get('/inventarios/productos', inventariosController.findAllProducts);
    router.get('/inventarios/:id', inventariosController.findById);
    router.post('/inventarios/create', inventariosController.create);
    router.put('/inventarios/update/:id', inventariosController.update);
    router.delete('/inventarios/delete/:id', inventariosController.delete);

    //RUTAS CRUD VENTAS
    router.get('/ventas', ventasController.findAll);
    router.get('/ventas/:id', ventasController.findById);
    router.post('/ventas/create', ventasController.create);
    router.post('/ventas/createVenta', ventasController.createVenta);
    router.put('/ventas/update/:id', ventasController.update);
    router.delete('/ventas/delete/:id', ventasController.delete);

     //RUTAS CRUD DETALLE OCASIONES
    router.get('/detalleoc', detalleOcasionesController.findAll);
    router.get('/detalleoc/activos', detalleOcasionesController.findActive);
    router.get('/detalleoc/inactivos', detalleOcasionesController.findInactive);
    router.get('/detalleoc/activos', detalleOcasionesController.findActive);
    router.get('/detalleoc/inactivos', detalleOcasionesController.findInactive);
    router.get('/detalleoc/:id', detalleOcasionesController.findById);
    router.post('/detalleoc/create', detalleOcasionesController.create);
    router.put('/detalleoc/update/:id', detalleOcasionesController.update);
    router.delete('/detalleoc/delete/:id', detalleOcasionesController.delete);

    //RUTAS CRUD ENVIOS
    router.get('/envios', enviosController.findAllActive);
    router.get('/envios/:idEnvio/productos', enviosController.findProductosByEnvio);
    router.get('/envios/:id', enviosController.findById);
    router.post('/envios/create', enviosController.create);
    router.put('/envios/update/:id', enviosController.update);
    router.delete('/envios/delete/:id', enviosController.delete);

    //RUTAS CRUD DETALLE TALLAS
    router.get('/detalleTallas', detalleTallasController.findAll);
    router.get('/detalleTallas/activos', detalleTallasController.findActive);
    router.get('/detalleTallas/inactivos', detalleTallasController.findInactive);
    router.get('/detalleTallas/:id', detalleTallasController.findById);
    router.post('/detalleTallas/create', detalleTallasController.create);
    router.put('/detalleTallas/update/:id', detalleTallasController.update);
    router.delete('/detalleTallas/delete/:id', detalleTallasController.delete);

    //RUTAS CRUD EMPLEADOS
    router.get('/empleados', empleadosController.findAll);
    router.get('/empleados/activos', empleadosController.findActive);
    router.get('/empleados/inactivos', empleadosController.findInactive);
    router.get('/empleados/:id', empleadosController.findById);
    router.post('/empleados/create', empleadosController.create);
    router.put('/empleados/update/:id', empleadosController.update);
    router.delete('/empleados/delete/:id', empleadosController.delete);

    //RUTAS CRUD ROLES
    router.get('/roles', rolesController.findAll);
    router.get('/roles/:id', rolesController.findById);
    router.post('/roles/create', rolesController.create);
    router.put('/roles/update/:id', rolesController.update);
    router.delete('/roles/delete/:id', rolesController.delete);

    app.use('/', router);

};
