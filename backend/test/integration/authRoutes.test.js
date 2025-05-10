const request = require("supertest");
require("dotenv").config();
const app = require("../../app");
const mongoose = require("mongoose");
const User = require("../../models/User");
const bcrypt = require("bcryptjs");

describe("Auth Routes - Integration Tests", () => {
  beforeAll(async () => {
    await mongoose.connect(process.env.MONGO_URl);
    console.log("Connected to MongoDB");
  });

  afterAll(async () => {
    await mongoose.connection.db.dropDatabase(); // عشان تنظفي الداتا بعد التيست
    await mongoose.disconnect();
  });

  describe("POST /signup", () => {
    test("should register a new user", async () => {
      const uniqueEmail = `jann+${Date.now()}@example.com`;

      const res = await request(app)
        .post("/api/signup")
        .send({
          firstName: "Jann",
          lastName: "Doe",
          email: uniqueEmail,
          mobile: "01234567890",
          password: "strong$123456",
          confirmPassword: "strong$123456",
          gender: "female"
        });

      expect(res.status).toBe(201);
      expect(res.body.message).toBe("User registered successfully");
    });

    test("should not register if user exists", async () => {
      await User.create({
        firstName: "Jann",
        lastName: "Doe",
        email: "jann@example.com",
        mobile: "01234567890",
        password: "hashed", // مش مهم كلمة السر هنا
        gender: "female"
      });

      const res = await request(app)
        .post("/api/signup")
        .send({
          firstName: "Jann",
          lastName: "Doe",
          email: "jann@example.com",
          mobile: "01234567890",
          password: "strong$123456",
          confirmPassword: "strong$123456",
          gender: "female"
        });

      expect(res.status).toBe(400);
      expect(res.body.message).toBe("User already exists");
    });
  });

  describe("POST /login", () => {
    test("should login successfully", async () => {
      const email = `test+${Date.now()}@example.com`;
      const hashed = await bcrypt.hash("strong$123456", 10);

      await User.create({
        firstName: "Test",
        lastName: "User",
        email,
        mobile: "9999999999",
        password: hashed,
        gender: "male"
      });

      const res = await request(app)
        .post("/api/login")
        .send({
          email,
          password: "strong$123456"
        });

      expect(res.status).toBe(200);
      expect(res.body.message).toBe("Login successful");
    });
  });
});
