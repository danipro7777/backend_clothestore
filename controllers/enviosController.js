'use strict';
const db = require("../models");
const ENVIOS = db.envios;
const VENTAS = db.ventas;
const CLIENTES = db.clientes;
const DETALLE_VENTA = db.detalleventas;
const INVENTARIOS = db.inventarios;
const PRODUCTOS = db.productos;

// Métodos CRUD
module.exports = {

    // Obtener todos los registros de envíos con sus ventas asociadas
    async findAllActive(req, res) {
        try {
            const envios = await ENVIOS.findAll({
                /*where : {
                    estado : 1
                },*/
                include: [
                    {
                      model: VENTAS,
                      attributes: ['idVenta', 'fechaVenta', 'total'], // Atributos de la venta
                      include: [
                        {
                          model: CLIENTES, // Relación con CLIENTES para obtener el nombre del cliente
                          attributes: ['nombre'],
                        }
                      ]
                    }
                  ]
            });
            res.status(200).json(envios);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    // Obtener un registro de envío por su idEnvio
    async findById(req, res) {
        const { id } = req.params;
        try {
            const envio = await ENVIOS.findByPk(id, {
                include: [
                    {
                      model: VENTAS,
                      attributes: ['fechaVenta', 'total'], // Atributos de la venta
                      include: [
                        {
                          model: CLIENTES, // Relación con CLIENTES para obtener el nombre del cliente
                          attributes: ['nombre'],
                        }
                      ]
                    }
                  ]
            });
            if (!envio) {
                return res.status(404).json({ message: 'Envío no encontrado' });
            }
            res.status(200).json(envio);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
    
    async findProductosByEnvio(req, res) {
        const { idEnvio } = req.params;
        try {
            // Encontrar el envío con la venta asociada y el detalle de ventas
            const envio = await ENVIOS.findOne({
                where: { idEnvio },
                include: {
                    model: VENTAS,
                    attributes: ['fechaVenta', 'total'],
                    include: {
                        model: DETALLE_VENTA, // Aquí nos aseguramos de incluir el detalle de ventas completo
                        attributes: ['cantidad', 'subtotal'],
                        include: {
                            model: INVENTARIOS, // Incluimos los inventarios para obtener los productos
                            attributes: ['cantidad'],
                            include: {
                                model: PRODUCTOS, // Finalmente, incluimos los productos
                                attributes: ['nombre', 'precio', 'descripcion']
                            }
                        }
                    }
                }
            });
    
            if (!envio) {
                return res.status(404).json({ message: 'Envío no encontrado' });
            }
    
            // Asegurarse de que el detalle de ventas esté en forma de arreglo para mapear todos los productos
            const productos = envio.venta.detalleventas.map(detalle => {
                return {
                    nombre: detalle.inventario.producto.nombre,
                    descripcion: detalle.inventario.producto.descripcion,
                    precio: detalle.inventario.producto.precio,
                    cantidad: detalle.cantidad,
                    subtotal: detalle.subtotal
                };
            });
    
            res.status(200).json({ productos });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    // Crear un nuevo registro en envíos
    async create(req, res) {
        const { fechaEnvio, estado, fechaRecepcion, idVenta } = req.body;
        try {
            const newEnvio = await ENVIOS.create({
                fechaEnvio,
                estado: 1,
                fechaRecepcion,
                idVenta
            });
            res.status(201).json(newEnvio);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    // Actualizar un registro de envío por su idEnvio
    async update(req, res) {
        const { id } = req.params;
        const { fechaEnvio, estado, fechaRecepcion, idVenta } = req.body;
        try {
            const envio = await ENVIOS.findByPk(id);
            if (!envio) {
                return res.status(404).json({ message: 'Envío no encontrado' });
            }

            // Actualizar solo los campos que fueron enviados
            if (fechaEnvio !== undefined) {
                envio.fechaEnvio = fechaEnvio;
            }
            if (estado !== undefined) {
                envio.estado = estado;
            }
            if (fechaRecepcion !== undefined) {
                envio.fechaRecepcion = fechaRecepcion;
            }
            if (idVenta !== undefined) {
                envio.idVenta = idVenta;
            }

            await envio.save(); // Guardar los cambios
            res.status(200).json(envio);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    // Eliminar un registro de envío por su idEnvio
    async delete(req, res) {
        const { id } = req.params;
        try {
            const envio = await ENVIOS.findByPk(id);
            if (!envio) {
                return res.status(404).json({ message: 'Envío no encontrado' });
            }
            await envio.destroy();
            res.status(200).json({ message: 'Envío eliminado correctamente' });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
};
