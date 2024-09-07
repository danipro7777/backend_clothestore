'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Cupon extends Model {
        static associate(models) {
            // Aquí puedes definir asociaciones si es necesario
        }
    }

    Cupon.init({
        idCupon: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        codigo: {
            type: DataTypes.STRING(50),
            allowNull: false,
        },
        descuento: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false,
        },
        descripcion: {
            type: DataTypes.STRING(225),
            allowNull: false,
        },
        estado: {
            type: DataTypes.TINYINT,
            allowNull: false,
            defaultValue: 1,
        },
    }, {
        sequelize,
        modelName: 'Cupon',
        tableName: 'cupones',
        timestamps: false, // Si no tienes campos como createdAt o updatedAt
    });

    return Cupon;
};
