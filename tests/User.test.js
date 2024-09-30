jest.mock('../src/models/User');
jest.mock('jsonwebtoken');

const { register, login } = require('../src/services/authService');
const User = require('../src/models/User');
const jwt = require('jsonwebtoken');

describe('Auth Service', () => {
    describe('register', () => {
        it('should register a new user and return user with JWT token', async () => {
            User.findOne.mockResolvedValue(null);
            User.create.mockResolvedValue({
                id: '123',
                name: 'John Doe',
                email: 'john.smith@example.com',
                password: 'hashed_password_123',
                role: 'patient',
                profileImage: 'default-profile.png',
                age: 29,
                gender: 'male',
                phoneNumber: '+1234567890',
                address: '123 Main St, Cityville',
            });

            const mockToken = 'mocked-jwt-token';
            jwt.sign.mockReturnValue(mockToken);

            const data = await register({
                name: 'John Doe',
                email: 'john.smith@example.com',
                password: 'hashed_password_123',
                role: 'patient',
            });

            expect(User.findOne).toHaveBeenCalledWith({ where: { email: 'john.smith@example.com' } });
            expect(User.create).toHaveBeenCalled();
            expect(data).toHaveProperty('user');
            expect(data).toHaveProperty('token', mockToken);
        });

        it('should throw an error if user already exists', async () => {
            User.findOne.mockResolvedValue({ email: 'john.smith@example.com' });

            await expect(register({
                name: 'John Doe',
                email: 'john.smith@example.com',
                password: 'hashed_password_123',
                role: 'patient',
            })).rejects.toThrow('User already exists');
        });
    });

    describe('login', () => {
        it('should login a user and return user with JWT token', async () => {
            User.findOne.mockResolvedValue({
                id: '123',
                name: 'John Doe',
                email: 'john.smith@example.com',
                role: 'patient',
                matchPassword: jest.fn().mockResolvedValue(true),
            });

            const mockToken = 'mocked-jwt-token';
            jwt.sign.mockReturnValue(mockToken);

            const data = await login('john.smith@example.com', 'hashed_password_123');

            expect(User.findOne).toHaveBeenCalledWith({ where: { email: 'john.smith@example.com' } });
            expect(data).toHaveProperty('user');
            expect(data).toHaveProperty('token', mockToken);
        });

        it('should throw an error for invalid email', async () => {
            User.findOne.mockResolvedValue(null);

            await expect(login('invalid@example.com', 'password123')).rejects.toThrow('Invalid email or password');
        });

        it('should throw an error for incorrect password', async () => {
            User.findOne.mockResolvedValue({
                id: '123',
                name: 'John Doe',
                email: 'john.smith@example.com',
                role: 'patient',
                matchPassword: jest.fn().mockResolvedValue(false),
            });

            await expect(login('john.smith@example.com', 'wrongpassword')).rejects.toThrow('Invalid email or password');
        });
    });
});
