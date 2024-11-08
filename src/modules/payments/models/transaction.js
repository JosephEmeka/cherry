import { DataTypes, Model } from 'sequelize';
import sequelize from '../../../config/dbConfig.js';
import Wallet from './wallet.js';

class Transaction extends Model {}

Transaction.init(
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        walletId: {
            type: DataTypes.UUID,
            allowNull: false,
            references: {
                model: Wallet,
                key: 'id',
            },
            onDelete: 'CASCADE',
        },
        amount: {
            type: DataTypes.FLOAT,
            allowNull: false,
        },
        type: {
            type: DataTypes.ENUM('credit', 'debit'),
            allowNull: false,
        },
        transactionDate: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
    },
    {
        sequelize,
        modelName: 'Transaction',
        timestamps: true,
        paranoid: true,
    }
);

Wallet.hasMany(Transaction, { foreignKey: 'walletId' });
Transaction.belongsTo(Wallet, { foreignKey: 'walletId' });

export default Transaction;
