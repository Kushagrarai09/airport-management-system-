const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
require("./config/db")();

const User = require("./models/User");

async function testAdminLogin() {
  try {
    console.log("🔍 Testing Admin Login Credentials...\n");

    // Find admin user with password included
    const admin = await User.findOne({ email: "admin@airport.com" }).select(
      "+password"
    );

    if (!admin) {
      console.log("❌ Admin user not found!");
      return;
    }

    console.log("✅ Admin user found:");
    console.log(`   Email: ${admin.email}`);
    console.log(`   Role: ${admin.role}`);
    console.log(`   Password hash: ${admin.password}`);
    console.log(`   Password hash length: ${admin.password.length}`);

    // Test password comparison
    const testPassword = "password123";
    console.log(`\n🔑 Testing password: "${testPassword}"`);

    const isMatch = await admin.matchPassword(testPassword);
    console.log(`✅ Password match result: ${isMatch}`);

    // Also test bcrypt directly
    const directMatch = await bcrypt.compare(testPassword, admin.password);
    console.log(`✅ Direct bcrypt compare: ${directMatch}`);

    // Test other common passwords
    const commonPasswords = ["admin123", "admin", "password", "Password123"];
    console.log("\n🔍 Testing other common passwords:");

    for (const pwd of commonPasswords) {
      const match = await admin.matchPassword(pwd);
      console.log(`   "${pwd}": ${match}`);
    }
  } catch (error) {
    console.error("❌ Error testing admin login:", error);
  } finally {
    mongoose.connection.close();
  }
}

testAdminLogin();
