import { DataTypes } from 'sequelize';
import sequelize from '../../../config/dbConfig';
import bcrypt from 'bcryptjs';
import User from "../../users/models/user";

class Doctor extends User {}

Doctor.init({
    specialty: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    workSchedule: {
        type: DataTypes.JSON,
        allowNull: true,
    },
    bio: {
        type: DataTypes.TEXT,
    },
    available: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
    },
    experience: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
}, {
    sequelize: User.sequelize,
    modelName: 'Doctor',
});

export default Doctor;
