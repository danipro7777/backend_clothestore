'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class clientes extends Model {
    static associate(models) {
        clientes.belongsTo(models.usuarios, {
            foreignKey: 'idUsuario'
        });
    }
  }

  clientes.init({
    idCliente: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    nombre: {
      type: DataTypes.STRING(250),
      allowNull: false
    },
    edad: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    correo: {
        type: DataTypes.STRING(250),
        allowNull: false
    },
    telefono: {
        type: DataTypes.STRING(250),
        allowNull: false
    },
    direccion: {
        type: DataTypes.STRING(250),
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
    modelName: 'clientes',
    tableName: 'clientes',
    timestamps: false
  });

  return clientes;
};