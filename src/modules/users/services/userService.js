
const User = require('../models/User');
const generateToken = require('../config/jwtConfig');


exports.deleteUser = async (userId) => {
    const user = await User.findByPk(userId);
    if (!user) throw new Error('User not found');

    await user.destroy();
    return { message: 'User deleted successfully' };
};




exports.updateUser = async (userId, updateData) => {
    const user = await User.findByPk(userId);
    if (!user) throw new Error('User not found');

    await user.update(updateData);

    return user;
};


exports.suspendUser = async (userId) => {
    const user = await User.findByPk(userId);
    if (!user) throw new Error('User not found');

    await user.update({ status: 'suspended' });

    return user;
};
