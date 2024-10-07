'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class empleados extends Model {
    static associate(models) {
        empleados.belongsTo(models.usuarios, {
            foreignKey: 'idUsuario'
        });
    }
  }

  empleados.init({
    idEmpleado: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    nombre: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    correo: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    telefono: {
        type: DataTypes.STRING(20),
        allowNull: false
    },
    idUsuario: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    estado: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
  }, {
    sequelize,
    modelName: 'empleados',
    tableName: 'empleados',
    timestamps: false
  });

  return empleados;
};