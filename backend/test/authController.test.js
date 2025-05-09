const bcrypt = require('bcryptjs');
const User = require('../models/User');
const { signup, login } = require('../controllers/userController');

jest.mock('bcryptjs');

describe('User Controller - Unit Tests (Jest)', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('Signup', () => {
        it('should return error if passwords do not match', async () => {
            const req = {
                body: {
                    firstName: 'John',
                    lastName: 'Doe',
                    email: 'john@example.com',
                    mobile: '1234567890',
                    password: '123456',
                    confirmPassword: '654321',
                    gender: 'male',
                },
            };
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn(),
            };

            await signup(req, res);

            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith({ message: 'Passwords do not match' });
        });

        it('should return error if user already exists', async () => {
            jest.spyOn(User, 'findOne').mockResolvedValue({ email: 'john@example.com' });

            const req = {
                body: {
                    firstName: 'John',
                    lastName: 'Doe',
                    email: 'john@example.com',
                    mobile: '1234567890',
                    password: '123456',
                    confirmPassword: '123456',
                    gender: 'male',
                },
            };
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn(),
            };

            await signup(req, res);

            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith({ message: 'User already exists' });
        });

        it('should register a new user successfully', async () => {
            jest.spyOn(User, 'findOne').mockResolvedValue(null);
            bcrypt.hash.mockResolvedValue('hashedPassword');
            const saveMock = jest.fn().mockResolvedValue();

            jest.spyOn(User.prototype, 'save').mockImplementation(saveMock);

            const req = {
                body: {
                    firstName: 'John',
                    lastName: 'Doe',
                    email: 'john@example.com',
                    mobile: '1234567890',
                    password: '123456',
                    confirmPassword: '123456',
                    gender: 'male',
                },
            };
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn(),
            };

            await signup(req, res);

            expect(saveMock).toHaveBeenCalled();
            expect(res.status).toHaveBeenCalledWith(201);
            expect(res.json).toHaveBeenCalledWith({ message: 'User registered successfully' });
        });
    });

    describe('Login', () => {
        it('should return error if user is not found', async () => {
            jest.spyOn(User, 'findOne').mockResolvedValue(null);

            const req = {
                body: { email: 'notfound@example.com', password: 'password' },
            };
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn(),
            };

            await login(req, res);

            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith({ message: 'Invalid credentials' });
        });

        it('should return error if password is incorrect', async () => {
            const mockUser = {
                email: 'test@example.com',
                password: 'hashed',
            };
            jest.spyOn(User, 'findOne').mockResolvedValue(mockUser);
            bcrypt.compare.mockResolvedValue(false);

            const req = {
                body: { email: 'test@example.com', password: 'wrongpass' },
            };
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn(),
            };

            await login(req, res);

            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith({ message: 'Invalid credentials' });
        });

        it('should login successfully if credentials are correct', async () => {
            const mockUser = {
                email: 'test@example.com',
                password: 'hashed',
            };
            jest.spyOn(User, 'findOne').mockResolvedValue(mockUser);
            bcrypt.compare.mockResolvedValue(true);

            const req = {
                body: { email: 'test@example.com', password: 'correctpass' },
            };
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn(),
            };

            await login(req, res);

            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
                message: 'Login successful',
                user: expect.any(Object),
            }));
        });
    });
})
