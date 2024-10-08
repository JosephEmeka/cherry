const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/dbConfig');
const Patient = require('./Patient');
const Doctor = require('./Doctor');

class MedicalRecord extends Model {}

MedicalRecord.init(
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
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
        doctorId: {
            type: DataTypes.UUID,
            allowNull: true,
            references: {
                model: Doctor,
                key: 'id',
            },
            onDelete: 'SET NULL',
        },
        diagnosis: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        prescription: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        allergies: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        surgeries: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        visitDate: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
        },
        comments: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
    },
    {
        sequelize,
        modelName: 'MedicalRecord',
        timestamps: true,
        paranoid: true,
    }
);


Patient.hasOne(MedicalRecord, { foreignKey: 'patientId' });
Doctor.hasMany(MedicalRecord, { foreignKey: 'doctorId' });
MedicalRecord.belongsTo(Patient, { foreignKey: 'patientId' });
MedicalRecord.belongsTo(Doctor, { foreignKey: 'doctorId' });

module.exports = MedicalRecord;
