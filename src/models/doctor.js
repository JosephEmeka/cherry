const { DataTypes } = require('sequelize');
const sequelize = require('../config/dbConfig');
const bcrypt = require('bcryptjs');
const User = require("./User");

 class Doctor extends User {}

    Doctor.init( {


    specialty: {
        type: DataTypes.STRING,
        allowNull: true,
    },

    workSchedule: {
        type: DataTypes.JSON,
        allowNull: true,
    },

    bio:{
        type:DataTypes.TEXT
    },

    available: {
        type: DataTypes.BOOLEAN,

        defaultValue: true

    },

    experience: {
        type: DataTypes.TEXT,
        allowNull: false

    },
}, {
        sequelize: User.sequelize,
        modelName: 'Doctor',
    }
);


    module.exports = Doctor;

