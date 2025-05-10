const request = require("supertest");
const mongoose = require("mongoose");
const app = require("../app");
const Product = require("../models/productModel");

beforeAll(async () => {
  const uri = process.env.MONGO_URl ;
  await mongoose.connect(uri);
});

afterAll(async () => {
  await mongoose.disconnect();
});

describe("Product API Integration Tests", () => {
  it("should create a product", async () => {
    const res = await request(app)
      .post("/api/products")
      .send({ name: "Product 1", price: 100 });

    expect(res.status).toBe(201);
    expect(res.body.name).toBe("Product 1");
    expect(res.body.price).toBe(100);
  });

  it("should get all products", async () => {
    await Product.create({ name: "Product 2", price: 200 });

    const res = await request(app).get("/api/products");

    expect(res.status).toBe(200);
    expect(res.body.length).toBeGreaterThan(0);
  });

  it("should get a product by ID", async () => {
    const product = await Product.create({ name: "Product 3", price: 300 });

    const res = await request(app).get(`/api/products/${product._id}`);

    expect(res.status).toBe(200);
    expect(res.body.name).toBe("Product 3");
  });

  it("should update a product", async () => {
    const product = await Product.create({ name: "Product 4", price: 400 });

    const res = await request(app)
      .put(`/api/products/${product._id}`)
      .send({ name: "Updated Product 4", price: 450 });

    expect(res.status).toBe(200);
    expect(res.body.name).toBe("Updated Product 4");
    expect(res.body.price).toBe(450);
  });

  it("should delete a product", async () => {
    const product = await Product.create({ name: "Product 5", price: 500 });

    const res = await request(app).delete(`/api/products/${product._id}`);

    expect(res.status).toBe(200);
    expect(res.body.message).toBe("Product deleted");
  });
});
