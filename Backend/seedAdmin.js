import mongoose from "mongoose";
import dotenv from "dotenv";
import User from "./src/models/User.js";

dotenv.config();

const seedAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to MongoDB...");

    const adminEmail = "admin@school.com";

    // Check if admin already exists
    const existingAdmin = await User.findOne({ email: adminEmail });
    if (existingAdmin) {
      console.log(`Admin user ${adminEmail} already exists!`);
      process.exit(0);
    }

    // Create the admin
    await User.create({
      name: "School Administrator",
      email: adminEmail,
      password: "adminpassword123", // easy password to remember for testing
      role: "admin",
    });

    console.log("✅ Admin account created successfully!");
    console.log("Email: admin@school.com");
    console.log("Password: adminpassword123");
    
    process.exit(0);
  } catch (error) {
    console.error("❌ Error creating admin:", error);
    process.exit(1);
  }
};

seedAdmin();
