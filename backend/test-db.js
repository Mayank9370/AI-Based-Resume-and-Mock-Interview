import dotenv from "dotenv";
dotenv.config();
import mongoose from "mongoose";

console.log("Testing MongoDB Connection...");
console.log("MONGO_URI:", process.env.MONGO_URI ? "Exists" : "Missing");

const options = {
    serverSelectionTimeoutMS: 5000,
    socketTimeoutMS: 45000,
};

try {
    await mongoose.connect(process.env.MONGO_URI, options);
    console.log("✅ Database Connected Successfully!");
    console.log("Connected to:", mongoose.connection.name);
    process.exit(0);
} catch (error) {
    console.error("❌ MongoDB Connection Error:");
    console.error("Error name:", error.name);
    console.error("Error message:", error.message);
    console.error("Error code:", error.code);
    if (error.cause) {
        console.error("Cause:", error.cause);
    }
    console.error("\nFull Error:", error);
    process.exit(1);
}
