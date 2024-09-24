const { DataTypes } = require('sequelize');
const sequelize = require('../config/dbConfig');
const bcrypt = require('bcryptjs');

const Doctor = sequelize.define('Doctor', {


    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },

    middleName:{
        type: DataTypes.STRING,
        allowNull: false
    },

    surname: {
        type: DataTypes.STRING,
        allowNull: false
    },

    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true,
        },
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    profileImage: {
        type: DataTypes.STRING,
        allowNull: true,
    },


    role: {
        type: DataTypes.ENUM('admin', 'doctor', 'patient'),
        allowNull: false,
        defaultValue: 'patient',
    },

    gender: {
        type: DataTypes.ENUM('male', 'female'),
        allowNull: true,
    },

    phoneNumber: {
        type: DataTypes.STRING,
        allowNull: true
    },

    address: {
        type: DataTypes.STRING,
        allowNull: true
    },


    specialty: {
        type: DataTypes.STRING,
        allowNull: true,
    },

    workSchedule: {
        type: DataTypes.JSON, // Store doctor’s available time slots (e.g., [{day: "Monday", start: "09:00", end: "17:00"}])
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
});
    module.exports = Doctor;

