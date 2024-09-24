const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

exports.register = async ({ name, email, password, role }) => {
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) throw new Error('User already exists');

    const user = await User.create({ name, email, password, role });
    return user;
};

exports.login = async (email, password) => {
    const user = await User.findOne({ where: { email } });
    if (!user) throw new Error('Invalid email or password');

    const isMatch = await user.comparePassword(password);
    if (!isMatch) throw new Error('Invalid email or password');

    return user;
};
