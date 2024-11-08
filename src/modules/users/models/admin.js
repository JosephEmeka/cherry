
const { DataTypes } = require('sequelize');
const BaseUser = require('./User');

class Admin extends BaseUser {}

Admin.init({
    adminLevel: {
        type: DataTypes.ENUM('super', 'regular'),
        allowNull: false,
        defaultValue: 'regular',
    },

}, {
    sequelize: BaseUser.sequelize,
    modelName: 'Admin',
});

module.exports = Admin;
