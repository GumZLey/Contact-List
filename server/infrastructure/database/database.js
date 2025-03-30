const mongoose = require("mongoose");
require("dotenv").config();

module.exports = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI, { dbName: "ContactList" });
        console.log("Connected to MongoDB");
    } catch (error) {
        throw new Error("MongoDB connection error");
    }
};
