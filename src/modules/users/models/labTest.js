const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/dbConfig');
const Patient = require('./Patient');
const Doctor = require('./Doctor');

class LabTest extends Model {}

LabTest.init(
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
        testName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        testDate: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
        },
        result: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        status: {
            type: DataTypes.ENUM('pending', 'completed', 'in-progress', 'cancelled'),
            allowNull: false,
            defaultValue: 'pending',
        },
        comments: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
    },
    {
        sequelize,
        modelName: 'LabTest',
        timestamps: true,
        paranoid: true,
    }
);


Patient.hasMany(LabTest, { foreignKey: 'patientId' });
Doctor.hasMany(LabTest, { foreignKey: 'doctorId' });
LabTest.belongsTo(Patient, { foreignKey: 'patientId' });
LabTest.belongsTo(Doctor, { foreignKey: 'doctorId' });

module.exports = LabTest;
