const User = require('../models/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const registerUser = async (req, res) => {
    const { name, surname, email, password, role, age, gender, healthHistory } = req.body;

    try {

        const userExists = await User.findOne({ where: { email } });
        if (userExists) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            name,
            surname,
            email,
            password: hashedPassword,
            role,
            age,
            gender,
            healthHistory
        });
        const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '30d' });

        res.status(201).json({ id: user.id, name: user.name, email: user.email, role: user.role, token });

    } catch (error) {
        console.error('Error during registration:', error);
        res.status(500).json({ message: 'Server error' });
    }
};


const uploadProfilePicture = async (req, res) => {
    try {

        if (!req.file) {
            return res.status(400).json({ message: 'No file uploaded' });
        }

        const profileImage = req.file.path;

        const user = await User.findByPk(req.user.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        user.profileImage = profileImage;
        await user.save();

        res.status(200).json({ message: 'Profile picture uploaded successfully', profileImage });

    } catch (error) {
        console.error('Error uploading profile picture:', error);
        res.status(500).json({ message: 'Error uploading profile picture', error });
    }
};

module.exports = {
    registerUser,
    uploadProfilePicture
};
