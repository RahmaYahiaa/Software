const request = require("supertest");
require("dotenv").config();
const app = require("../../app");
const { expect } = require("chai");
const mongoose = require("mongoose");
const User = require("../../models/User");

describe("Auth Routes - Integration Tests", () => {
  before(async function () {
    this.timeout(5000);
    try {
      await mongoose.connect(process.env.TEST_URL);
      console.log("Connected to MongoDB");
    } catch (err) {
      console.error("Connection error", err);
      throw err;
    }
  });

  after(async () => {
    
    await mongoose.disconnect();
  });

  describe("POST /signup", () => {
    it("should register a new user", async () => {
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

      expect(res.status).to.equal(201);
      expect(res.body.message).to.equal("User registered successfully");
    });
   it("should not register if user exists", async () => {
    
      await User.create({
        firstName: "Jann",
        lastName: "Doe",
        email: "jann@example.com",
        mobile: "01234567890",
        password: "hashed",
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

      expect(res.status).to.equal(400);
      expect(res.body.message).to.equal("User already exists");
    });
   
  });

  describe("POST /login", () => {
    it("should login successfully", async () => {
      const bcrypt = require("bcryptjs");
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

      expect(res.status).to.equal(200);
      expect(res.body.message).to.equal("Login successful");
    });
  });
});
