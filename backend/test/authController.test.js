const { expect } = require('chai');
const sinon = require('sinon');
const bcrypt = require('bcryptjs');
const User = require('../models/User'); 
const { signup, login } = require('../controllers/userController'); 

describe('User Controller - Unit Tests', () => {
    afterEach(() => {
        sinon.restore(); 
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
                status: sinon.stub().returnsThis(),
                json: sinon.stub(),
            };

            await signup(req, res);

            expect(res.status.calledWith(400)).to.be.true;
            expect(res.json.calledWith({ message: 'Passwords do not match' })).to.be.true;
        });

        it('should return error if user already exists', async () => {
            sinon.stub(User, 'findOne').resolves({ email: 'john@example.com' });

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
                status: sinon.stub().returnsThis(),
                json: sinon.stub(),
            };

            await signup(req, res);

            expect(res.status.calledWith(400)).to.be.true;
            expect(res.json.calledWith({ message: 'User already exists' })).to.be.true;
        });

        it('should register a new user successfully', async () => {
            sinon.stub(User, 'findOne').resolves(null); 
            sinon.stub(bcrypt, 'hash').resolves('hashedPassword');
            const saveStub = sinon.stub(User.prototype, 'save').resolves();

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
                status: sinon.stub().returnsThis(),
                json: sinon.stub(),
            };

            await signup(req, res);

            expect(saveStub.calledOnce).to.be.true;
            expect(res.status.calledWith(201)).to.be.true;
            expect(res.json.calledWith({ message: 'User registered successfully' })).to.be.true;
        });
    });

    describe('Login', () => {
        it('should return error if user is not found', async () => {
            sinon.stub(User, 'findOne').resolves(null);

            const req = {
                body: { email: 'notfound@example.com', password: 'password' },
            };
            const res = {
                status: sinon.stub().returnsThis(),
                json: sinon.stub(),
            };

            await login(req, res);

            expect(res.status.calledWith(400)).to.be.true;
            expect(res.json.calledWith({ message: 'Invalid credentials' })).to.be.true;
        });

        it('should return error if password is incorrect', async () => {
            const mockUser = { 
                email: 'test@example.com', 
                password: 'hashed',
                comparePassword: function(candidatePassword) {
                    return bcrypt.compare(candidatePassword, this.password);
                }
            };
            sinon.stub(User, 'findOne').resolves(mockUser);
            sinon.stub(bcrypt, 'compare').resolves(false);

            const req = {
                body: { email: 'test@example.com', password: 'wrongpass' },
            };
            const res = {
                status: sinon.stub().returnsThis(),
                json: sinon.stub(),
            };

            await login(req, res);

            expect(res.status.calledWith(400)).to.be.true;
            expect(res.json.calledWith({ message: 'Invalid credentials' })).to.be.true;
        });

        it('should login successfully if credentials are correct', async () => {
            const mockUser = { 
                email: 'test@example.com', 
                password: 'hashed',
                comparePassword: function(candidatePassword) {
                    return bcrypt.compare(candidatePassword, this.password);
                }
            };
            sinon.stub(User, 'findOne').resolves(mockUser);
            sinon.stub(bcrypt, 'compare').resolves(true);

            const req = {
                body: { email: 'test@example.com', password: 'correctpass' },
            };
            const res = {
                status: sinon.stub().returnsThis(),
                json: sinon.stub(),
            };

            await login(req, res);

            expect(res.status.calledWith(200)).to.be.true;
            expect(res.json.calledWith(sinon.match({
                message: 'Login successful',
                user: sinon.match.object
            }))).to.be.true;
        });
    });
}); 