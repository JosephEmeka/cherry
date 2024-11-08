import { validateLoginDTO } from '../dtos/login.dto';
import { loginUser, logoutUser } from '../services/authService';


export const login = async (req, res) => {
    const validationError = validateLoginDTO(req.body);
    if (validationError) {
        return res.status(400).json({ message: validationError });
    }

    try {
        const result = await loginUser(req.body.email, req.body.password);

        res.status(200).json({
            message: 'Login successful',
            token: result.token,
            user: result.user
        });
    } catch (error) {
        console.error('Error during login:', error.message);
        res.status(400).json({ message: error.message });
    }
};

export const logout = async (req, res) => {
    const token = req.header('Authorization') && req.header('Authorization').replace('Bearer ', '');

    if (!token) {
        return res.status(400).json({ message: 'Token is required' });
    }

    try {
        await logoutUser(token);

        res.status(200).json({ message: 'Logout successful' });
    } catch (error) {
        console.error('Error during logout:', error.message);
        res.status(400).json({ message: 'Invalid token' });
    }
};
