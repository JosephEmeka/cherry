const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/dbConfig');
const Patient = require('./Patient');

class Wallet extends Model {}

Wallet.init(
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
        balance: {
            type: DataTypes.FLOAT,
            allowNull: false,
            defaultValue: 0.0,
        },
        lastTransactionDate: {
            type: DataTypes.DATE,
            allowNull: true,
        },
        status: {
            type: DataTypes.ENUM('active', 'inactive', 'frozen'),
            allowNull: false,
            defaultValue: 'active',
        },
    },
    {
        sequelize,
        modelName: 'Wallet',
        timestamps: true,
        paranoid: true, // Soft delete
    }
);


Patient.hasOne(Wallet, { foreignKey: 'patientId' });
Wallet.belongsTo(Patient, { foreignKey: 'patientId' });

module.exports = Wallet;
