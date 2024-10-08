const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/dbConfig');
const Doctor = require('./Doctor');
const Patient = require('./Patient');

class Appointment extends Model {}

Appointment.init(
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        doctorId: {
            type: DataTypes.UUID,
            allowNull: false,
            references: {
                model: Doctor,
                key: 'id',
            },
            onDelete: 'CASCADE',
        },
        patientId: {
            type: DataTypes.UUID,
            allowNull: false,
            references: {
                model: Patient,
                key: 'id',
            },
            onDelete: 'CASCADE',
        },
        appointmentDate: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
        },
        status: {
            type: DataTypes.ENUM('scheduled', 'completed', 'cancelled'),
            allowNull: false,
            defaultValue: 'scheduled',
        },
        notes: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
    },
    {
        sequelize,
        modelName: 'Appointment',
        timestamps: true,
        paranoid: true,
    }
);


Doctor.hasMany(Appointment, { foreignKey: 'doctorId' });
Patient.hasOne(Appointment, { foreignKey: 'patientId' });
Appointment.belongsTo(Doctor, { foreignKey: 'doctorId' });
Appointment.belongsTo(Patient, { foreignKey: 'patientId' });

module.exports = Appointment;
