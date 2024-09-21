'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class usuarios extends Model {
    static associate(models) {
      // Asociación con el modelo Empleados
      usuarios.hasOne(models.clientes, {
        foreignKey: 'idUsuario'
      });
      // Asociación  con el modelo Empleados
      usuarios.hasOne(models.empleados, {
        foreignKey: 'idUsuario'
      });
    }
  };

  usuarios.init({
    idUsuario: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    usuario: {
      type: DataTypes.STRING,
      allowNull: false
    },
    contrasenia: {
      type: DataTypes.STRING,
      allowNull: false
    },
    estado: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    token: { // Nuevo campo para almacenar el token
      type: DataTypes.STRING,
      allowNull: true
    },
    tokenExpiresAt: { // Nuevo campo para almacenar la fecha de expiración del token
      type: DataTypes.DATE,
      allowNull: true
    }
  }, {
    sequelize,
    modelName: 'usuarios',
    timestamps: false // No incluir createdAt y updatedAt
  });

  return usuarios;
};