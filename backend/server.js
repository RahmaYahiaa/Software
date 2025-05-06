const mongoose = require("mongoose");
require("dotenv").config();
const app= require("./app");

mongoose.connect(process.env.MONGO_URl).then(() => {
    console.log("MongoDB connected");
}).catch((err) => {
    console.log("MongoDB connection error:", err.message);
})

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
})