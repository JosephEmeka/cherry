import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const generateToken = (user) => {
    if (!user || !user.id || !user.role) {
        throw new Error('Invalid user object passed to generateToken');
    }
    return jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '30d' });
};

export default generateToken;
