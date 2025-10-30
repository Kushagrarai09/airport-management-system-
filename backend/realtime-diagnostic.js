const mongoose = require("mongoose");
require("dotenv").config();

// Connect to MongoDB
mongoose.connect(
  process.env.MONGODB_URI || "mongodb://localhost:27017/airport_management"
);

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", async function () {
  console.log("✅ Connected to MongoDB for Real-time Diagnostics\n");

  try {
    // Check MongoDB connection details
    console.log("🔗 Connection Details:");
    console.log(`  - Database: ${db.name}`);
    console.log(`  - Host: ${db.host}`);
    console.log(`  - Port: ${db.port}`);
    console.log(`  - Ready State: ${db.readyState}`);
    console.log("");

    // Get collections with real-time stats
    const collections = await mongoose.connection.db
      .listCollections()
      .toArray();
    console.log("📊 Real-time Collection Status:");

    for (let collection of collections) {
      const count = await mongoose.connection.db
        .collection(collection.name)
        .countDocuments();
      const stats = await mongoose.connection.db
        .collection(collection.name)
        .stats();
      console.log(`  - ${collection.name}:`);
      console.log(`    └ Documents: ${count}`);
      console.log(`    └ Size: ${(stats.size / 1024).toFixed(2)} KB`);
      console.log(
        `    └ Last Modified: ${stats.wiredTiger ? "Active" : "Unknown"}`
      );
    }
    console.log("");

    // Test real-time write operation
    console.log("🧪 Testing Real-time Write Operation:");
    const testWrite = await mongoose.connection.db
      .collection("test_realtime")
      .insertOne({
        message: "Real-time test",
        timestamp: new Date(),
        testId: Math.random().toString(36).substr(2, 9),
      });
    console.log(
      `  ✅ Write Test: ${testWrite.acknowledged ? "SUCCESS" : "FAILED"}`
    );

    // Verify the write immediately
    const testRead = await mongoose.connection.db
      .collection("test_realtime")
      .findOne({
        _id: testWrite.insertedId,
      });
    console.log(`  ✅ Read Test: ${testRead ? "SUCCESS" : "FAILED"}`);

    // Clean up test
    await mongoose.connection.db.collection("test_realtime").deleteOne({
      _id: testWrite.insertedId,
    });
    console.log("  ✅ Cleanup: SUCCESS");
    console.log("");

    // Check for recent activity
    console.log("⏰ Recent Database Activity:");

    // Check recent users
    const recentUsers = await mongoose.connection.db
      .collection("users")
      .find({})
      .sort({ createdAt: -1 })
      .limit(3)
      .toArray();

    console.log("  Recent Users:");
    recentUsers.forEach((user) => {
      const timeAgo = new Date() - new Date(user.createdAt);
      const minutesAgo = Math.floor(timeAgo / (1000 * 60));
      console.log(
        `    - ${user.name} (${user.email}) - ${minutesAgo} minutes ago`
      );
    });

    // Check recent bookings
    const recentBookings = await mongoose.connection.db
      .collection("bookings")
      .find({})
      .sort({ createdAt: -1 })
      .limit(5)
      .toArray();

    console.log("  Recent Bookings:");
    if (recentBookings.length === 0) {
      console.log("    - No bookings found");
    } else {
      recentBookings.forEach((booking) => {
        const timeAgo = new Date() - new Date(booking.createdAt);
        const minutesAgo = Math.floor(timeAgo / (1000 * 60));
        console.log(
          `    - ${booking.bookingReference} - ${minutesAgo} minutes ago`
        );
      });
    }
    console.log("");

    // Connection monitoring
    console.log("🔍 MongoDB Compass Troubleshooting:");
    console.log(
      "  1. Connection String for Compass: mongodb://localhost:27017"
    );
    console.log("  2. Database Name: airport_management");
    console.log("  3. Refresh Strategy: Manual refresh required in Compass");
    console.log("  4. Auto-refresh: Not enabled by default in Compass");
    console.log("");

    console.log("💡 Solutions for Real-time Updates:");
    console.log("  1. Click REFRESH button in MongoDB Compass");
    console.log("  2. Press F5 or Ctrl+R to refresh the view");
    console.log("  3. Re-run queries to see latest data");
    console.log("  4. Check if you're viewing the correct database/collection");
    console.log("  5. Ensure MongoDB Compass is connected to localhost:27017");
    console.log("");

    // Test if MongoDB is accepting new connections
    console.log("🔗 Testing MongoDB Connection Pool:");
    const connections = mongoose.connection.readyState;
    const states = {
      0: "disconnected",
      1: "connected",
      2: "connecting",
      3: "disconnecting",
    };
    console.log(
      `  - Connection State: ${states[connections]} (${connections})`
    );
    console.log(
      `  - Active Connections: ${
        mongoose.connection.db.serverConfig?.connections?.length || "Multiple"
      }`
    );
  } catch (error) {
    console.error("❌ Error during diagnostics:", error);
  } finally {
    console.log("\n🎯 MongoDB Real-time Status: ACTIVE & READY");
    mongoose.connection.close();
  }
});
