const { DataTypes } = require('sequelize');
const sequelize = require('../config/dbConfig');
const bcrypt = require('bcryptjs');

const User = sequelize.define('User', {
    name: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, allowNull: false, unique: true },
    password: { type: DataTypes.STRING, allowNull: false },
    role: { type: DataTypes.ENUM('patient', 'doctor', 'admin'), allowNull: false },
    age: { type: DataTypes.INTEGER, allowNull: false },
    gender: { type: DataTypes.STRING },
    healthHistory: { type: DataTypes.TEXT },
}, {
    hooks: {
        beforeCreate: async (user) => {
            user.password = await bcrypt.hash(user.password, 10);
        },
    },
});

User.prototype.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = User;
