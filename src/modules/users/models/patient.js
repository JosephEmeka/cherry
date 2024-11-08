import { DataTypes } from 'sequelize';
import BaseUser from './user';

class Patient extends BaseUser {}

Patient.init({
    healthHistory: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    assignedDoctor: {
        type: DataTypes.INTEGER,
    },
    healthInsuranceNumber: {
        type: DataTypes.TEXT,
    },
}, {
    sequelize: BaseUser.sequelize,
    modelName: 'Patient',
});

export default Patient;
