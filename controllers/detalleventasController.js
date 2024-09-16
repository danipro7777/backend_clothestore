'use strict';
const db = require("../models");
const detalleventas = require("../models/detalleventas");
const DetalleVentas = db.detalleventas;
const Inventario = db.inventarios;
const Productos = db.productos;

// Métodos CRUD
module.exports = {

    // Obtener todos los clientes con estado activo
    find(req, res) {
        return DetalleVentas.findAll({
            where: {
                estado: 1
            }
        })
            .then(detalleventas => {
                return res.status(200).json(detalleventas);
            })
            .catch(error => {
                console.error('Error al recuperar el detalle de la venta:', error);
                return res.status(500).json({
                    message: 'Ocurrió un error al recuperar los datos.'
                });
            });
    },

    findById(req, res) {
        const id = req.params.id;
        return DetalleVentas.findByPk(id)
            .then(detalleventas => {
                if (!detalleventas) {
                    return res.status(404).json({
                        message: 'Detalle de la venta no encontrado.'
                    });
                }
                return res.status(200).json(detalleventas);
            })
            .catch(error => {
                console.error(`Error al recuperar el detalle de la venta con ID ${id}:`, error);
                return res.status(500).json({
                    message: 'Ocurrió un error al intentar recuperar el registro.'
                });
            });
    },
        // createDetalleVenta
        createDetalleVenta(req, res) {
            const datos = req.body;

            // Validación de campos requeridos
            if (!datos.cantidad || !datos.idVenta || !datos.idInventario) {
                return res.status(400).json({ message: 'Faltan campos requeridos.' });
            }

            // Conversión y validación de la cantidad
            const cantidad = parseInt(datos.cantidad, 10);
            if (isNaN(cantidad)) {
                return res.status(400).json({ message: 'La cantidad debe ser un número válido.' });
            }

            // Búsqueda del inventario y producto
            Inventario.findOne({ where: { idInventario: datos.idInventario } })
                .then(inventario => {
                    if (!inventario) {
                        return res.status(404).json({ message: 'Inventario no encontrado.' });
                    }

                    Productos.findOne({ where: { idProducto: inventario.idProducto } })
                        .then(producto => {
                            if (!producto) {
                                return res.status(404).json({ message: 'Producto no encontrado.' });
                            }

                            // DEBUG: Log para ver el precio del producto y la cantidad
                            console.log('Producto encontrado:', producto);
                            console.log('Precio del producto:', producto.precio);
                            console.log('Cantidad:', cantidad);

                            // Verificación del precio del producto
                            if (producto.precio === null || producto.precio === undefined) {
                                return res.status(400).json({ message: 'El producto no tiene un precio válido.' });
                            }

                            // Cálculo del subtotal (precio del producto * cantidad)
                            const subtotal = producto.precio * cantidad;

                            // DEBUG: Log para ver el subtotal calculado
                            console.log('Subtotal calculado:', subtotal);

                            const datos_ingreso = {
                                cantidad,
                                subtotal,
                                idVenta: datos.idVenta,
                                idInventario: datos.idInventario,
                                estado: datos.estado !== undefined ? datos.estado : 1
                            };

                            // Creación del detalle de la venta
                            DetalleVentas.create(datos_ingreso)
                                .then(detalleventas => {
                                    return res.status(201).json(detalleventas);
                                })
                                .catch(error => {
                                    console.error('Error al insertar el detalle de la venta:', error);
                                    return res.status(500).json({ error: 'Error al insertar el detalle de la venta' });
                                });
                        })
                        .catch(error => {
                            console.error('Error al buscar el producto:', error);
                            return res.status(500).json({ error: 'Error al buscar el producto.' });
                        });
                })
                .catch(error => {
                    console.error('Error al buscar el inventario:', error);
                    return res.status(500).json({ error: 'Error al buscar el inventario.' });
                });
        },


        // updateDetalleVenta
        updateDetalleVenta(req, res) {
            const datos = req.body;
            const id = req.params.id;

            // Buscar el idProducto desde Inventario usando el idInventario
            return Inventario.findOne({ where: { idInventario: datos.idInventario } })
                .then(inventario => {
                    if (!inventario) {
                        return res.status(404).json({ message: 'Inventario no encontrado.' });
                    }

                    // Buscar el precio desde Productos usando el idProducto
                    return Productos.findOne({ where: { idProducto: inventario.idProducto } })
                        .then(producto => {
                            if (!producto) {
                                return res.status(404).json({ message: 'Producto no encontrado.' });
                            }

                            const camposActualizados = {};

                            if (datos.cantidad !== undefined) camposActualizados.cantidad = datos.cantidad;
                            if (datos.idVenta !== undefined) camposActualizados.idVenta = datos.idVenta;
                            if (datos.idInventario !== undefined) camposActualizados.idInventario = datos.idInventario;
                            if (datos.estado !== undefined) camposActualizados.estado = datos.estado;

                            // Recalcular el subtotal si se actualiza cantidad o inventario
                            if (datos.cantidad !== undefined || datos.idInventario !== undefined) {
                                const cantidad = datos.cantidad || 1;  // Si no se especifica cantidad, usar 1 por defecto
                                const subtotal = producto.precio * cantidad;
                                camposActualizados.subtotal = subtotal;
                            }

                            // Actualizar el detalle de la venta
                            return DetalleVentas.update(camposActualizados, {
                                where: { idDetalleVentas: id }  // Asegúrate de que sea la columna correcta
                            })
                                .then(([rowsUpdated]) => {
                                    if (rowsUpdated === 0) {
                                        return res.status(404).json({ message: 'Detalle de la venta no encontrado.' });
                                    }
                                    return res.status(200).json({ message: 'El detalle de la venta ha sido actualizado.' });
                                })
                                .catch(error => {
                                    console.error(`Error al actualizar el detalle de la venta con ID ${id}:`, error);
                                    return res.status(500).json({ error: 'Error al actualizar el detalle de la venta.' });
                                });
                        });
                })
                .catch(error => {
                    console.error('Error al buscar en el inventario o producto:', error);
                    return res.status(500).json({ error: 'Error al buscar el inventario o producto.' });
                });
        },

    async deleteDetalleVenta(req, res) {
        const id = req.params.id; 
    
        try {
            const detalleventas = await DetalleVentas.findByPk(id);
    
            if (!detalleventas) {
                return res.status(404).json({ error: 'Detalle de la venta no encontrado' });
            }
    
            await detalleventas.destroy();
            return res.status(200).json({ message: 'Detalle de la venta eliminado correctamente' });
        } catch (error) {
            console.error('Error al eliminar detale de la venta:', error);
            return res.status(500).json({ error: 'Error al eliminar detalle de la venta' });
        }
    }
};