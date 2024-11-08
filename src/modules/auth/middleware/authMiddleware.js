import jwt from 'jsonwebtoken';
import { isTokenBlacklisted } from '../services/authService';
import { User } from '../../users/models/user';

export const protect = async (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).json({ message: 'Not authorized' });

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = await User.findByPk(decoded.id);
        next();
    } catch (error) {
        res.status(401).json({ message: 'Not authorized' });
    }
};

export const verifyToken = async (req, res, next) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');

    if (!token) {
        return res.status(401).json({ message: 'Access denied. No token provided.' });
    }

    try {
        const blacklisted = await isTokenBlacklisted(token);
        if (blacklisted) {
            return res.status(401).json({ message: 'Token has been blacklisted. Please log in again.' });
        }

        req.user = jwt.verify(token, process.env.JWT_SECRET);
        next();
    } catch (ex) {
        res.status(400).json({ message: 'Invalid token.' });
    }
};

export const roleMiddleware = (roles) => (req, res, next) => {
    if (!roles.includes(req.user.role)) {
        return res.status(403).send({ message: 'Access denied.' });
    }
    next();
};
