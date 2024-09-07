'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class productos extends Model {
  };

  productos.init({
    idProducto: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    nombre: {
      type: DataTypes.STRING,
      allowNull: false
    },
    genero: {
        type: DataTypes.STRING,
        allowNull: false
    },
    color: {
        type: DataTypes.STRING,
        allowNull: false
    },
    descripcion: {
        type: DataTypes.STRING,
        allowNull: false
    },
    estado: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
  }, {
    sequelize,
    modelName: 'productos', // nombre del modelo
    tableName: 'productos', // Nombre de la tabla
    timestamps: false // No incluir createdAt y updatedAt
  });

  return productos;
};