const { User } = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const register = async (req, res) => {

    const { name, email, password, role, phoneNumber } = req.body;
    try {
        const userExists = await User.findOne({ where: { email } });
        if (userExists) {
            return res.status(400).json({ message: 'User already exists' });
        }
        const user = await User.create({ name, email, password, role, phoneNumber });
        const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '30d' });
        res.status(201).json({ id: user.id, name: user.name, email: user.email, role: user.role, token });
    } catch (error) {
        res.status(500).json({ message: 'Error registering user', error });
    }
};



// const login = async (req, res) => {
//     const { email, password } = req.body;
//
//     try {
//         // Find user by email
//         const user = await User.findOne({ where: { email } });
//
//         // Check if user exists
//         if (!user) {
//             return res.status(400).json({ message: 'Invalid email or password' });
//         }
//
//         // Compare the provided password with the hashed password in the database
//         const isPasswordValid = await bcrypt.compare(password, user.password);
//         if (!isPasswordValid) {
//             return res.status(400).json({ message: 'Invalid email or password' });
//         }
//
//         // Generate JWT token
//         const token = jwt.sign(
//             { id: user.id, role: user.role },
//             process.env.JWT_SECRET,
//             { expiresIn: '30d' }
//         );
//
//         // Return the token and user info in the response
//         res.status(200).json({
//             message: 'Login successful',
//             token,
//             user: {
//                 id: user.id,
//                 name: user.name,
//                 email: user.email,
//                 role: user.role,
//             }
//         });
//
//     } catch (error) {
//         console.error('Error during login:', error);
//         res.status(500).json({ message: 'Server error', error });
//     }
// };
//


module.exports = { register };
