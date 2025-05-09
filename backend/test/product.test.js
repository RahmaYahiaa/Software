const request = require('supertest');
const app = require('../app');
const Product = require('../models/productModel');
const mongoose = require('mongoose');
require('dotenv').config({ path: '.env.test' });
const chai = require('chai');
const expect = chai.expect;


before(async () => {
  await mongoose.connect(process.env.TEST_URL, { useNewUrlParser: true, useUnifiedTopology: true });
});



after(async () => {
  await mongoose.disconnect(); 
});

describe("Product Functions", () => {

  it("should create product with capitalized name", async () => {
    const res = await request(app)
      .post('/api/products')
      .send({ name: "shoes", price: 100 });
    expect(res.body.name).to.equal("Shoes");
  });

  //it("should return the total sum of product quantities", async () => {
    // Insert mock products before testing the sum
   // await Product.create([
     // { name: 'Product 1', price: 50, quantity: 5 },
     // { name: 'Product 2', price: 30, quantity: 3 },
      //{ name: 'Product 3', price: 20, quantity: 2 },
   // ]);
  
   // const res = await request(app).get('/api/products/sum-quantities');
  
   // expect(res.status).to.equal(200); // Check for a successful response
   // expect(res.body.totalQuantity).to.equal(10); // Total sum of quantities: 5 + 3 + 2 = 10
 // });
  
});
