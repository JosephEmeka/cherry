
const User = require('../models/User');
const generateToken = require('../config/jwtConfig');


exports.createUser = async (userData) => {
    const { name, email, password, role } = userData;


    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) throw new Error('User already exists');


    const user = await User.create({ name, email, password, role });

    return user;
};


exports.deleteUser = async (userId) => {
    const user = await User.findByPk(userId);
    if (!user) throw new Error('User not found');

    await user.destroy();
    return { message: 'User deleted successfully' };
};

exports.registerUser = async (userData) => {
    const { name, email, password, role } = userData;


    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) throw new Error('User already exists');


    const user = await User.create({ name, email, password, role });


    const token = generateToken(user);

    return { user, token };
};

exports.loginUser = async (email, password) => {
    const user = await User.findOne({ where: { email } });
    if (!user) throw new Error('Invalid email or password');

    const isMatch = await user.matchPassword(password);
    if (!isMatch) throw new Error('Invalid email or password');


    const token = generateToken(user);

    return { user, token };
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
