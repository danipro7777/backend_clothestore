'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Talla extends Model {
        static associate(models) {
            // Aquí puedes definir asociaciones si es necesario
        }
    }

    Talla.init({
        idTalla: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        talla: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        estado: {
            type: DataTypes.TINYINT,
            allowNull: false,
            defaultValue: 1,
        },
    }, {
        sequelize,
        modelName: 'Talla',
        tableName: 'tallas',
        timestamps: false,
    });

    return Talla;
};
