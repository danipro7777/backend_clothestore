'use strict';
const db = require("../models");
const VENTAS = db.ventas;
const CLIENTES = db.clientes;
const PAGOS = db.pagos;
const DESCUENTOS = db.Descuento;
const CUPONES = db.Cupon;

// Métodos CRUD
module.exports = {

    // Obtener todos los registros de ventas con sus clientes, pagos, descuentos y cupones asociados
    async findAll(req, res) {
        try {
            const ventas = await VENTAS.findAll({
                /*include: [
                    { model: CLIENTES, attributes: ['idCliente', 'nombre'] },
                    { model: PAGOS, attributes: ['idPago', 'metodo', 'estado'] },
                    { model: DESCUENTOS, attributes: ['idDescuento', 'porcentaje', 'descripcion'] },
                    { model: CUPONES, attributes: ['idCupon', 'codigo', 'descuento'] }
                ]*/
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
               /* include: [
                    { model: CLIENTES, attributes: ['idCliente', 'nombre', 'apellido', 'email'] },
                    { model: PAGOS, attributes: ['idPago', 'metodo', 'estado'] },
                    { model: DESCUENTOS, attributes: ['idDescuento', 'porcentaje', 'descripcion'] },
                    { model: CUPONES, attributes: ['idCupon', 'codigo', 'descuento'] }
                ]*/
            });
            if (!venta) {
                return res.status(404).json({ message: 'Venta no encontrada' });
            }
            res.status(200).json(venta);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    // Crear un nuevo registro en ventas
    async create(req, res) {
        const { fechaVenta, total, idCliente, idPago, idDescuento, idCupon } = req.body;
        try {
            const newVenta = await VENTAS.create({
                fechaVenta,
                total,
                idCliente,
                idPago,
                idDescuento,
                idCupon
            });
            res.status(201).json(newVenta);
        } catch (error) {
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
