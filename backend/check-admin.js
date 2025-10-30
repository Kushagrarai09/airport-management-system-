const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
require("dotenv").config();

const checkAdminCredentials = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("✅ Connected to MongoDB");

    // Find all users with admin role
    const adminUsers = await mongoose.connection.db
      .collection("users")
      .find({ role: "admin" })
      .toArray();

    console.log("\n👑 ADMIN USERS FOUND:");
    console.log("===================");

    if (adminUsers.length === 0) {
      console.log("❌ NO ADMIN USERS FOUND!");
      console.log("Creating a default admin user...");

      // Create default admin user
      const hashedPassword = await bcrypt.hash("admin123", 10);
      const defaultAdmin = {
        name: "Admin User",
        email: "admin@airport.com",
        password: hashedPassword,
        role: "admin",
        phone: "+1234567890",
        dateOfBirth: new Date("1980-01-01"),
        createdAt: new Date(),
      };

      await mongoose.connection.db.collection("users").insertOne(defaultAdmin);
      console.log("✅ Default admin user created!");
      console.log("📧 Email: admin@airport.com");
      console.log("🔑 Password: admin123");
    } else {
      adminUsers.forEach((admin, index) => {
        console.log(`\n${index + 1}. Admin User:`);
        console.log(`   📧 Email: ${admin.email}`);
        console.log(`   👤 Name: ${admin.name}`);
        console.log(
          `   🔑 Password Hash: ${admin.password.substring(0, 20)}...`
        );
        console.log(`   📱 Phone: ${admin.phone || "Not set"}`);
        console.log(`   🆔 ID: ${admin._id}`);
      });
    }

    // Find all users (to see regular users too)
    const allUsers = await mongoose.connection.db
      .collection("users")
      .find({})
      .toArray();

    console.log("\n\n👥 ALL USERS IN DATABASE:");
    console.log("========================");

    allUsers.forEach((user, index) => {
      console.log(`\n${index + 1}. ${user.role.toUpperCase()} User:`);
      console.log(`   📧 Email: ${user.email}`);
      console.log(`   👤 Name: ${user.name}`);
      console.log(`   🎭 Role: ${user.role}`);
    });

    console.log("\n\n🔍 LOGIN CREDENTIALS TO TRY:");
    console.log("============================");

    // Show suggested login credentials
    const adminUser =
      adminUsers[0] ||
      (await mongoose.connection.db
        .collection("users")
        .findOne({ role: "admin" }));
    if (adminUser) {
      console.log("👑 ADMIN LOGIN:");
      console.log(`   📧 Email: ${adminUser.email}`);
      console.log("   🔑 Password: Try these common passwords:");
      console.log("       - admin123");
      console.log("       - password");
      console.log("       - admin");
      console.log("       - 123456");
    }

    const regularUser = allUsers.find((user) => user.role === "user");
    if (regularUser) {
      console.log("\n👤 REGULAR USER LOGIN:");
      console.log(`   📧 Email: ${regularUser.email}`);
      console.log("   🔑 Password: Try these common passwords:");
      console.log("       - password");
      console.log("       - user123");
      console.log("       - 123456");
    }
  } catch (error) {
    console.error("❌ Error:", error.message);
  } finally {
    await mongoose.connection.close();
    console.log("\n✅ Database connection closed");
  }
};

checkAdminCredentials();
