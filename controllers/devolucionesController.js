'use strict';
const db = require("../models");
const Devoluciones = db.devoluciones;
const VENTAS = db.ventas;
const DETALLE_VENTA = db.detalleventas;
const INVENTARIOS = db.inventarios;
const PRODUCTOS = db.productos;
const ENVIOS = db.envios;

// Métodos CRUD
module.exports = {

    // Obtener todos los clientes con estado activo
    find(req, res) {
        return Devoluciones.findAll({
            where: {
                estado: 1
            }
        })
            .then(devoluciones => {
                return res.status(200).json(devoluciones);
            })
            .catch(error => {
                console.error('Error al recuperar las devoluciones:', error);
                return res.status(500).json({
                    message: 'Ocurrió un error al recuperar los datos.'
                });
            });
    },

    findById(req, res) {
        const id = req.params.id;
        return Devoluciones.findByPk(id)
            .then(devoluciones => {
                if (!devoluciones) {
                    return res.status(404).json({
                        message: 'Devolución no encontrada.'
                    });
                }
                return res.status(200).json(cliente);
            })
            .catch(error => {
                console.error(`Error al recuperar la devolución con ID ${id}:`, error);
                return res.status(500).json({
                    message: 'Ocurrió un error al intentar recuperar el registro.'
                });
            });
    },

    createDevolucion(req, res) {
        const datos = req.body;

        if (!datos.fechaDevolucion || !datos.descripcion || !datos.idVenta ) {
            return res.status(400).json({ message: 'Faltan campos requeridos.' });
        }

        const datos_ingreso = { 
            fechaDevolucion: datos.fechaDevolucion,
            descripcion: datos.descripcion,
            idVenta: datos.idVenta,
            estado: datos.estado !== undefined ? datos.estado : 1 
        };

        return Devoluciones.create(datos_ingreso)
            .then(devoluciones => {
                return res.status(201).json(devoluciones);
            })
            .catch(error => {
                console.error('Error al insertar la devolución:', error);
                return res.status(500).json({ error: 'Error al insertar la devolución' });
            });
    },

    async createDevolucionCascada(req, res) {
        const datos = req.body;

        if (!datos.fechaDevolucion || !datos.descripcion || !datos.idVenta) {
            return res.status(400).json({ message: 'Faltan campos requeridos.' });
        }

        try {
            // Paso 1: Buscar la venta por ID
            const venta = await VENTAS.findByPk(datos.idVenta, {
                include: {
                    model: DETALLE_VENTA, // Incluimos los detalles de la venta
                    include: {
                        model: INVENTARIOS // Incluimos el inventario para cada producto
                    }
                }
            });

            if (!venta) {
                return res.status(404).json({ message: 'Venta no encontrada.' });
            }

            // Paso 2: Crear la devolución
            const nuevaDevolucion = await Devoluciones.create({
                fechaDevolucion: datos.fechaDevolucion,
                descripcion: datos.descripcion,
                idVenta: datos.idVenta,
                estado: datos.estado !== undefined ? datos.estado : 1
            });

            // Paso 3: Actualizar el inventario para cada producto en el detalle de la venta
            for (const detalle of venta.detalleventas) {
                const inventario = detalle.inventario;

                if (inventario) {
                    // Incrementar la cantidad del inventario con la cantidad del producto devuelto
                    inventario.cantidad += detalle.cantidad;

                    // Guardar los cambios en el inventario
                    await inventario.save();
                }
            }

            // Paso 4: Actualizar el estado de la venta para indicar que fue devuelta
            venta.estado = 0; // Asumiendo 0 = Venta Devuelta
            await venta.save();

            // Paso 5: Actualizar el estado del envío relacionado con la venta a 0 (Devuelto)
            const envio = await ENVIOS.findOne({ where: { idVenta: datos.idVenta } });
            if (envio) {
                envio.estado = 0; // Asumiendo 0 = Envío Devuelto
                await envio.save();
            }

            res.status(201).json({ message: 'Devolución creada exitosamente', devolucion: nuevaDevolucion });
        } catch (error) {
            console.error("Error en la devolución:", error);
            res.status(500).json({ error: error.message });
        }
    },

    updateDevolucion(req, res) {
        const datos = req.body;
        const id = req.params.id;

        const camposActualizados = {};
    
        if (datos.fechaDevolucion !== undefined) camposActualizados.fechaDevolucion = datos.fechaDevolucion;
        if (datos.descripcion !== undefined) camposActualizados.descripcion = datos.descripcion;
        if (datos.idVenta !== undefined) camposActualizados.idVenta = datos.idVenta;
        if (datos.estado !== undefined) camposActualizados.estado = datos.estado; 

        return Devoluciones.update(
            camposActualizados,
            {
                where: { idDevolucion: id } 
            }
        )
        .then(([rowsUpdated]) => {
            if (rowsUpdated === 0) {
                return res.status(404).json({ message: 'Devolución no encontrada' });
            }
            return res.status(200).json({ message: 'La devolución ha sido actualizada' });
        })
        .catch(error => {
            console.error(`Error al actualizar la devolución con ID ${id}:`, error);
            return res.status(500).json({ error: 'Error al actualizar devolución' });
        });
    },    

    async deleteDevolucion(req, res) {
        const id = req.params.id; 
    
        try {
            const devoluciones = await Devoluciones.findByPk(id);
    
            if (!devoluciones) {
                return res.status(404).json({ error: 'Devolución no encontrada' });
            }
    
            await devoluciones.destroy();
            return res.status(200).json({ message: 'Devoluión eliminada correctamente' });
        } catch (error) {
            console.error('Error al eliminar devolución:', error);
            return res.status(500).json({ error: 'Error al eliminar devolución' });
        }
    }
};