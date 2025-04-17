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
    
//Update user details
router.put("/update/:id", async (req, res) => {
    const  id  = req.params.id;
    const { name, email, password } = req.body;
    try {
        const updatedUser = await User.findByIdAndUpdate(
            id,
            { name, email, password },
            { new: true }
        );
        res.status(200).json(updatedUser);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});
//Delete user
router.delete("/delete/:id", async (req, res) => {
    const  UserId  = req.params.id;  
    try {
        const deletedUser = User.filter( user => user.id !== UserId); 
        //or  const deletedUser = await User.findByIdAndDelete(UserId);
        //or const deletedUser = await User.deleteOne({ _id: UserId });
        //or const deletedUser = await User.findByIdAndRemove(UserId);
        //or const deletedUser = await User.remove({ _id: UserId });
        //or const deletedUser = await User.destroy({ _id: UserId });
        
        if (!deletedUser) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json({ message: "User deleted successfully" });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});




    module.exports = router;