const mongoose = require("mongoose");
require("dotenv").config();

mongoose.connect(
  process.env.MONGODB_URI || "mongodb://localhost:27017/airport_management"
);

mongoose.connection.once("open", async () => {
  console.log("✅ MongoDB Connection Status: ACTIVE");
  console.log("🔗 Connection Details:");
  console.log(`   Database: ${mongoose.connection.name}`);
  console.log(
    `   Host: ${mongoose.connection.host}:${mongoose.connection.port}`
  );
  console.log("");

  try {
    // Get current counts
    const collections = await mongoose.connection.db
      .listCollections()
      .toArray();
    console.log("📊 Current Data Counts:");

    for (let col of collections) {
      const count = await mongoose.connection.db
        .collection(col.name)
        .countDocuments();
      console.log(`   ${col.name}: ${count} documents`);
    }
    console.log("");

    // Show recent users with timestamps
    console.log("👥 Recent Users (with timestamps):");
    const users = await mongoose.connection.db
      .collection("users")
      .find({})
      .sort({ createdAt: -1 })
      .toArray();

    users.forEach((user, index) => {
      const created = new Date(user.createdAt);
      console.log(`   ${index + 1}. ${user.name} (${user.email})`);
      console.log(`      Created: ${created.toLocaleString()}`);
      console.log(`      Role: ${user.role}`);
    });
    console.log("");

    // Test a real-time write and read
    console.log("🧪 Testing Real-time Data Operations:");

    // Create a test document
    const testDoc = {
      testMessage: "Real-time test from Node.js",
      timestamp: new Date(),
      randomId: Math.random(),
    };

    const writeResult = await mongoose.connection.db
      .collection("realtime_test")
      .insertOne(testDoc);
    console.log(
      `   ✅ Write Test: Document inserted with ID ${writeResult.insertedId}`
    );

    // Immediately read it back
    const readResult = await mongoose.connection.db
      .collection("realtime_test")
      .findOne({
        _id: writeResult.insertedId,
      });

    if (readResult) {
      console.log(`   ✅ Read Test: Document found immediately`);
      console.log(`   📝 Data: ${readResult.testMessage}`);
    } else {
      console.log(`   ❌ Read Test: Document NOT found`);
    }

    // Clean up
    await mongoose.connection.db.collection("realtime_test").deleteOne({
      _id: writeResult.insertedId,
    });
    console.log(`   ✅ Cleanup: Test document removed`);
    console.log("");

    console.log("💡 MongoDB Compass Troubleshooting Guide:");
    console.log("");
    console.log("1. 🔄 REFRESH MongoDB Compass:");
    console.log('   - Click the "Refresh" button in the top toolbar');
    console.log("   - Or press F5 / Ctrl+R to refresh");
    console.log('   - Or right-click collection → "Refresh"');
    console.log("");
    console.log("2. 🔗 Verify Connection:");
    console.log("   - Ensure you're connected to: mongodb://localhost:27017");
    console.log("   - Database name: airport_management");
    console.log("   - Collections: users, flights, bookings");
    console.log("");
    console.log("3. 📱 Real-time Updates:");
    console.log("   - MongoDB Compass does NOT auto-refresh by default");
    console.log("   - You must manually refresh to see new data");
    console.log("   - Data is being saved successfully (as shown above)");
    console.log("");
    console.log("4. 🎯 Quick Fixes:");
    console.log("   - Close and reopen MongoDB Compass");
    console.log("   - Disconnect and reconnect to the database");
    console.log("   - Switch to another collection and back");
    console.log('   - Use "Find" button to re-run queries');
    console.log("");
  } catch (error) {
    console.error("❌ Error:", error);
  } finally {
    mongoose.connection.close();
    console.log("✅ Database connection closed");
  }
});

mongoose.connection.on("error", (err) => {
  console.error("❌ MongoDB connection error:", err);
});
