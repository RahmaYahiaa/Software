const request = require('supertest');
const app = require('../app');
const Product = require('../models/productModel');
const mongoose = require('mongoose');
require('dotenv').config();  


beforeAll(async () => {
  console.log("MONGO_URI:", process.env.MONGO_URl);

  await mongoose.connect(process.env.MONGO_URl);
});

afterAll(async () => {
  await mongoose.disconnect();
});

describe("Product Functions", () => {

  it("should create product with capitalized name", async () => {
    const res = await request(app)
      .post('/api/products')
      .send({ name: "shoes", price: 100 });
    
    expect(res.body.name).toBe("Shoes");
    expect(res.status).toBe(201); // Ensure the status code is 201 (Created)
  });
it("should return the correct price of the created product", async () => {
  const res = await request(app)
    .post('/api/products')
    .send({ name: "shoes", price: 100 });

  expect(res.body.price).toBe(100); // Check that the price is correct
});
it("should return the product as an object", async () => {
  const res = await request(app)
    .post('/api/products')
    .send({ name: "shoes", price: 100 });

  expect(res.body).toMatchObject({ name: "Shoes", price: 100 });
});
it("should return all products in an array", async () => {
  const res = await request(app).get('/api/products');
  expect(Array.isArray(res.body)).toBe(true);  // Check if the response is an array
  expect(res.body.length).toBeGreaterThan(0);  // Ensure the array isn't empty
});

  //it("should return the total sum of product quantities", async () => {
    // Insert mock products before testing the sum
   // await Product.create([
    //  { name: 'Product 1', price: 50, quantity: 5 },
     // { name: 'Product 2', price: 30, quantity: 3 },
    //  { name: 'Product 3', price: 20, quantity: 2 },
   // ]);
  
    //const res = await request(app).get('/api/products/sum-quantities');
    //expect(res.status).toBe(200); // Check for a successful response
    //expect(res.body.totalQuantity).toBe(10); // Total sum of quantities: 5 + 3 + 2 = 10
 // });
});
