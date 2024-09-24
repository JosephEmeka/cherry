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


const uploadProfilePicture = async (req, res) => {
    try {
        // req.file contains the Cloudinary result with URL
        const profileImage = req.file.path;

        // Find the user by ID (can get it from the JWT or the request body)
        const user = await User.findByPk(req.user.id);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Update user's profile image URL
        user.profileImage = profileImage;
        await user.save();

        res.status(200).json({ message: 'Profile picture uploaded successfully', profileImage });
    } catch (error) {
        res.status(500).json({ message: 'Error uploading profile picture', error });
    }
};

module.exports = {
    uploadProfilePicture,
};
module.exports = { registerUser };
