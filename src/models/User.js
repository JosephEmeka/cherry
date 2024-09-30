const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/dbConfig');
const bcrypt = require('bcryptjs');

class User extends Model {}


User.init(
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        middleName: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        surname: {
            type: DataTypes.STRING,
            allowNull: false,
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
        age: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        gender: {
            type: DataTypes.ENUM('male', 'female', 'other'),
            allowNull: true,
        },
        phoneNumber: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        address: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        lastLogin: {
            type: DataTypes.DATE,
            allowNull: true,
        },
        status: {
            type: DataTypes.ENUM('active', 'inactive', 'suspended'),
            allowNull: false,
            defaultValue: 'active',
        },
    },
    {
        sequelize,
        modelName: 'User',
        timestamps: true,
        paranoid: true,
        hooks: {
            beforeCreate: async (user) => {
                if (user.password) {
                    user.password = await bcrypt.hash(user.password, 10);
                }
            },
            beforeUpdate: async (user) => {
                if (user.password) {
                    user.password = await bcrypt.hash(user.password, 10);
                }
            },
        },
    }
);


User.prototype.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};


User.prototype.isAdmin = function () {
    return this.role === 'admin';
};

User.prototype.isDoctor = function () {
    return this.role === 'doctor';
};

User.prototype.isPatient = function () {
    return this.role === 'patient';
};

module.exports = User;
