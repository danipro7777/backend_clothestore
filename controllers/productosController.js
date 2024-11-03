'use strict';
const db = require("../models");
const PRODUCTOS = db.productos;

// Métodos CRUD
module.exports = {
    findAll: async (req, res) => {
        try {
            const productos = await PRODUCTOS.findAll();
            res.status(200).json(productos);
        } catch (error) {
            res.status(500).json({ message: "Error al obtener los productos", error });
        }
    },

    findById: async (req, res) => {
        const { idProducto } = req.params;
        try {
            const producto = await PRODUCTOS.findByPk(idProducto);
            if (producto) {
                res.status(200).json(producto);
            } else {
                res.status(404).json({ message: "Producto no encontrado" });
            }
        } catch (error) {
            res.status(500).json({ message: "Error al obtener el producto", error });
        }
    },

    create: async (req, res) => {
        const { nombre, genero, color, descripcion, foto, precio } = req.body;
        try {
            const nuevoProducto = await PRODUCTOS.create({
                nombre,
                genero,
                color,
                precio,
                descripcion,
                estado: 1,// Valor por defecto para estado
                foto,
                precio
            });
            res.status(201).json(nuevoProducto);
        } catch (error) {
            res.status(500).json({ message: "Error al crear el producto", error });
        }
    },

    update: async (req, res) => {
        const { idProducto } = req.params;
        const { nombre, genero, color, descripcion, estado, foto, precio } = req.body;
        try {
            const producto = await PRODUCTOS.findByPk(idProducto);
            if (producto) {
                // Solo actualiza los campos que están presentes en req.body
                await producto.update({
                    nombre: nombre !== undefined ? nombre : producto.nombre,
                    genero: genero !== undefined ? genero : producto.genero,
                    color: color !== undefined ? color : producto.color,
                    descripcion: descripcion !== undefined ? descripcion : producto.descripcion,
                    precio: precio !== undefined ? precio : producto.precio,
                    foto:  foto !== undefined ? foto : producto.foto,
                    estado: estado !== undefined ? estado : producto.estado,
                    foto: foto !== undefined ? foto : producto.foto,
                    precio: precio !== undefined ? precio : producto.precio,
                });
                res.status(200).json({ message: "Producto actualizado correctamente", producto });
            } else {
                res.status(404).json({ message: "Producto no encontrado" });
            }
        } catch (error) {
            res.status(500).json({ message: "Error al actualizar el producto", error });
        }
    },    

    delete: async (req, res) => {
        const { idProducto } = req.params;
        try {
            const producto = await PRODUCTOS.findByPk(idProducto);
            if (producto) {
                await producto.destroy();
                res.status(200).json({ message: "Producto eliminado correctamente" });
            } else {
                res.status(404).json({ message: "Producto no encontrado" });
            }
        } catch (error) {
            res.status(500).json({ message: "Error al eliminar el producto", error });
        }
    }
};
