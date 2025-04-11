const express = require("express");
const router = express.Router();
const User = require("../models/User");

//Register 
router.post("/signup", async (req, res) => {
    const { name, email, password } = req.body;
    try {
        const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }
        const newUser = new User({ name, email, password });
        await newUser.save();
        res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});
//Login
router.post("/login", async (req, res) => {
    const { email, password } = req.body;
    const user= await User.findOne({email,password});
    if(!user){ return res.status(400).json({message:"Invalid credentials"});}
    res.status(200).json({ message: "Login successful", user });})
    

    module.exports = router;