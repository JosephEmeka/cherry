const { User } = require('../models/User');
const jwt = require('jsonwebtoken');

const registerUser = async (req, res) => {
    const { name, email, password, role, age, gender, healthHistory } = req.body;
    try {
        const userExists = await User.findOne({ where: { email } });
        if (userExists) {
            return res.status(400).json({ message: 'User already exists' });
        }
        const user = await User.create({ name, email, password, role, age, gender, healthHistory });
        const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '30d' });
        res.status(201).json({ id: user.id, name: user.name, email: user.email, role: user.role, token });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

module.exports = { registerUser };
