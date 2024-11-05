'use strict';
const db = require("../models");
const VENTAS = db.ventas;
const CLIENTES = db.clientes;
const PAGOS = db.pagos;
const DESCUENTOS = db.Descuento;
const CUPONES = db.Cupon;
const DETALLEVENTAS = db.detalleventas;
const INVENTARIO = db.inventarios;
const PRODUCTO = db.productos;

// Métodos CRUD
module.exports = {

    // Obtener todos los registros de ventas con sus clientes, pagos, descuentos y cupones asociados
    async findAll(req, res) {
        try {
            const ventas = await VENTAS.findAll({
                include: [
                    { model: CLIENTES, attributes: ['idCliente', 'nombre'] },
                    { model: PAGOS, attributes: ['idPago', 'metodo', 'estado'] },
                    { model: DESCUENTOS, attributes: ['idDescuento', 'porcentaje', 'descripcion'] },
                    { model: CUPONES, attributes: ['idCupon', 'codigo', 'descuento'] }
                ]
            });
            res.status(200).json(ventas);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    // Obtener un registro de ventas por su idVenta
    async findById(req, res) {
        const { id } = req.params; 
        try {
            const venta = await VENTAS.findByPk(id, {
                include: [
                    { model: CLIENTES, attributes: ['idCliente', 'nombre', 'apellido', 'email'] },
                    { model: PAGOS, attributes: ['idPago', 'metodo', 'estado'] },
                    { model: DESCUENTOS, attributes: ['idDescuento', 'porcentaje', 'descripcion'] },
                    { model: CUPONES, attributes: ['idCupon', 'codigo', 'descuento'] }
                ]
            });
            if (!venta) {
                return res.status(404).json({ message: 'Venta no encontrada' });
            }
            res.status(200).json(venta);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    // Crear un nuevo registro en ventas con detalles de productos
    async create(req, res) {
        const { fechaVenta, total, idCliente, idPago, idDescuento, idCupon, productos } = req.body;
        try {
            // Crear la venta principal
            const newVenta = await VENTAS.create({
                fechaVenta,
                total,
                idCliente,
                idPago,
                idDescuento,
                idCupon
            });

            // Agregar los productos al detalle de la venta
            const productosDetalles = productos.map(producto => ({
                idVenta: newVenta.id,
                idProducto: producto.id,
                cantidad: producto.quantity,
                precio: producto.price
            }));

            // Guardar los detalles en la base de datos (esto asume que tienes un modelo de DetalleVenta)
            await DetalleVenta.bulkCreate(productosDetalles);

            res.status(201).json({ venta: newVenta, detalles: productosDetalles });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

     // Método para crear una venta con sus detalles
     async createVenta(req, res) {
        const { fechaVenta, idCliente, idPago, idDescuento, idCupon, productos } = req.body;
    
        try {
          let total = 0;
    
          const detalles = await Promise.all(
            productos.map(async (producto) => {
              const inventario = await INVENTARIO.findByPk(producto.idInventario, {
                include: [
                  {
                    model: PRODUCTO,
                    attributes: ["precio"], 
                  },
                ],
              });
    
              if (!inventario) {
                throw new Error(`Inventario no encontrado para el producto ${producto.idInventario}`);
              }
    
              if (inventario.cantidad < producto.cantidad) {
                throw new Error(`No hay suficiente inventario para el producto${producto.idInventario}`);
              }
    
              const precio = inventario.producto.precio; 
              const subtotal = precio * producto.cantidad;
    
              total += subtotal;
    
              inventario.cantidad -= producto.cantidad;
              await inventario.save();
    
              return {
                idVenta: null, 
                idInventario: producto.idInventario,
                cantidad: producto.cantidad,
                subtotal,
                estado: 1,
              };
            })
          );
    
          const nuevaVenta = await VENTAS.create({
            fechaVenta,
            total, 
            idCliente,
            idPago,
            idDescuento,
            idCupon,
          });
    
          detalles.forEach((detalle) => {
            detalle.idVenta = nuevaVenta.idVenta;
          });
          await DETALLEVENTAS.bulkCreate(detalles);
    
          res.status(201).json({
            message: "Venta creada exitosamente",
            venta: nuevaVenta,
            detalles,
          });
        } catch (error) {
          console.error("Error al crear la venta y sus detalles:", error);
          res.status(500).json({ error: error.message });
        }
      },

    // Actualizar un registro de ventas por su idVenta
    async update(req, res) {
        const { id } = req.params;
        const { fechaVenta, idCliente, idPago, idDescuento, idCupon } = req.body;
        try {
            const venta = await VENTAS.findByPk(id);
            if (!venta) {
                return res.status(404).json({ message: 'Venta no encontrada' });
            }

            // Actualizar solo los campos que fueron enviados
            if (fechaVenta !== undefined) {
                venta.fechaVenta = fechaVenta;
            }
            if (idCliente !== undefined) {
                venta.idCliente = idCliente;
            }
            if (idPago !== undefined) {
                venta.idPago = idPago;
            }
            if (idDescuento !== undefined) {
                venta.idDescuento = idDescuento;
            }
            if (idCupon !== undefined) {
                venta.idCupon = idCupon;
            }

            await venta.save(); // Guardar los cambios
            res.status(200).json(venta);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    // Eliminar un registro de ventas por su idVenta
    async delete(req, res) {
        const { id } = req.params;
        try {
            const venta = await VENTAS.findByPk(id);
            if (!venta) {
                return res.status(404).json({ message: 'Venta no encontrada' });
            }
            await venta.destroy();
            res.status(200).json({ message: 'Venta eliminada correctamente' });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
};
