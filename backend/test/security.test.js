const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../app'); 
const User = require('../models/User');

beforeAll(async () => {
  await mongoose.connect(process.env.MONGO_URl)
});

beforeEach(async () => {
//   await User.deleteMany(); 
});

afterAll(async () => {
  await mongoose.connection.close(); 
});

describe('Security Tests', () => {
  it('should block XSS in email field during signup', async () => {
    const res = await request(app).post('/api/signup').send({
      firstName: 'rahma',
      lastName: 'yahia',
      email: '<script>alert("xss")</script>@test.com',
      mobile: '01156681233',
      password: 'StrongPass123!',
      confirmPassword: 'StrongPass123!',
      gender: 'female'
    });

    expect(res.statusCode).toBe(400);
  });

  it('should reject weak password during signup', async () => {
    const res = await request(app).post('/api/signup').send({
      firstName: 'rahma',
      lastName: 'yahia',
      email: 'weakpass@test.com',
      mobile: '0123456789',
      password: '123456',
      confirmPassword: '123456',
      gender: 'female'
    });

    expect(res.statusCode).toBe(400);
  });

  it('should not reveal if email exists during login (no enumeration)', async () => {
    const user = new User({
      firstName: 'Existing',
      lastName: 'User',
      email: 'exist@test.com',
      mobile: '0123456789',
      password: await require('bcryptjs').hash('StrongPass123!', 10),
      gender: 'male'
    });
    await user.save();

    const res = await request(app).post('/api/login').send({
      email: 'notfound@test.com',
      password: 'StrongPass123!'
    });

    expect(res.body.message).toBe('Invalid credentials');
  });

  it('should limit repeated failed login attempts', async () => {
    for (let i = 0; i < 6; i++) {
      await request(app).post('/api/login').send({
        email: 'attack@test.com',
        password: 'wrongpassword'
      });
    }

    const res = await request(app).post('/api/login').send({
      email: 'attack@test.com',
      password: 'wrongpassword'
    });

    expect(res.statusCode).toBe(429);
  });
});
