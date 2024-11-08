import { DataTypes } from 'sequelize';
import BaseUser from './user';

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

export default Admin;
