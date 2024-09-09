'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class productos extends Model {
    static associate(models) {
      // Relación uno a muchos con detalletemporadas
      productos.hasMany(models.detalletemporadas, {
        foreignKey: 'idProducto'
      });
    }
  }

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
    modelName: 'productos',
    tableName: 'productos',
    timestamps: false
  });

  return productos;
};
