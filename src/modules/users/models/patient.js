
const { DataTypes } = require('sequelize');
const BaseUser = require('./User');

class Patient extends BaseUser {}

Patient.init({
    healthHistory: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    assignedDoctor: {
        type: DataTypes.INTEGER
    },
    healthInsuranceNumber:{
        type: DataTypes.TEXT,
    },
}, {
    sequelize: BaseUser.sequelize,
    modelName: 'Patient',
});

module.exports = Patient;
