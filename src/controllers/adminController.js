
const { User, Doctor, Appointment } = require('../models/User');

// Get all users (admin functionality)
const getAllUsers = async (req, res) => {
    try {
        const users = await User.findAll();
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving users', error });
    }
};

// Assign roles to users
const assignRole = async (req, res) => {
    const { userId, role } = req.body;
    try {
        const user = await User.findByPk(userId);
        if (!user) return res.status(404).json({ message: 'User not found' });
        user.role = role;
        await user.save();
        res.json({ message: 'Role updated successfully', user });
    } catch (error) {
        res.status(500).json({ message: 'Error updating role', error });
    }
};

// Get all appointments (admin functionality)
const getAllAppointments = async (req, res) => {
    try {
        const appointments = await Appointment.findAll({ include: [User, Doctor] });
        res.json(appointments);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving appointments', error });
    }
};

module.exports = { getAllUsers, assignRole, getAllAppointments };
