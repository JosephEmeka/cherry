import User from '../../users/models/user';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import redisClient from '../../../config/redis';
import { validateLoginDTO } from '../dtos/login.dto';

export const loginUser = async (email, password) => {
    const errorMessage = validateLoginDTO({ email, password });
    if (errorMessage) {
        throw new Error(errorMessage);
    }

    const user = await User.findOne({ where: { email } });
    console.log('User model:', user);
    if (!user) {
        throw new Error('Invalid email or password');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
        throw new Error('Invalid password');
    }

    const token = jwt.sign(
        { id: user.id, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: '30d' }
    );

    return {
        token,
        user: {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
        },
    };
};

export const logoutUser = async (token) => {
    try {
        console.log('Token received:', token);

        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        console.log('Token decoded:', decodedToken);

        const tokenExpiry = decodedToken.exp - Math.floor(Date.now() / 1000);
        console.log('Token expiry:', tokenExpiry);

        if (tokenExpiry <= 0) {
            throw new Error('Token has already expired');
        }

        // await redisClient.set(token, 'blacklisted', 'EX', tokenExpiry);
        return true;
    } catch (error) {
        console.error('Error during logout:', error.message);
        throw new Error('Invalid token');
    }
};

export const isTokenBlacklisted = async (token) => {
    const isBlacklisted = await redisClient.get(token);
    return isBlacklisted !== null;
};
