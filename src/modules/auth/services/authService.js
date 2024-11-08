const User = require('../models/User');

const generateToken = require('../config/jwtConfig')

exports.register = async ({ name, email, password, role }) => {

    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) throw new Error('User already exists');


    const user = await User.create({ name, email, password, role });

    const token = generateToken(user);
    return { user, token };
};

exports.login = async (email, password) => {

    const user = await User.findOne({ where: { email } });
    if (!user) throw new Error('Invalid email or password');


    const isMatch = await user.matchPassword(password);
    if (!isMatch) throw new Error('Invalid email or password');


    const token = generateToken(user);
    return { user, token };
};
