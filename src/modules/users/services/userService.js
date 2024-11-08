import User from '../models/user.js';


 const deleteUser = async (userId) => {
    const user = await User.findByPk(userId);
    if (!user) throw new Error('User not found');

    await user.destroy();
    return { message: 'User deleted successfully' };
};

 const updateUser = async (userId, updateData) => {
    const user = await User.findByPk(userId);
    if (!user) throw new Error('User not found');

    await user.update(updateData);
    return user;
};

 const suspendUser = async (userId) => {
    const user = await User.findByPk(userId);
    if (!user) throw new Error('User not found');

    await user.update({ status: 'suspended' });
    return user;
};

export default {deleteUser, updateUser,suspendUser }