const mongoose = require("mongoose");
require("dotenv").config();

const checkDatabase = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("✅ Successfully connected to MongoDB");
    console.log("📍 Connection String:", process.env.MONGODB_URI);

    // Get database name
    const dbName = mongoose.connection.name;
    console.log("🗃️  Database Name:", dbName);

    // List all collections
    const collections = await mongoose.connection.db
      .listCollections()
      .toArray();
    console.log("\n📂 Available Collections:");

    for (const collection of collections) {
      const collectionName = collection.name;
      const count = await mongoose.connection.db
        .collection(collectionName)
        .countDocuments();
      console.log(`   • ${collectionName}: ${count} documents`);
    }

    // Show sample data from each collection
    console.log("\n📄 Sample Data:");

    for (const collection of collections) {
      const collectionName = collection.name;
      const sampleDoc = await mongoose.connection.db
        .collection(collectionName)
        .findOne();

      if (sampleDoc) {
        console.log(`\n🔍 Sample from ${collectionName}:`);
        console.log(JSON.stringify(sampleDoc, null, 2));
      }
    }

    console.log("\n🎯 MongoDB Compass Connection Details:");
    console.log(
      "   Connection String: mongodb://localhost:27017/airport_management"
    );
    console.log("   Host: localhost");
    console.log("   Port: 27017");
    console.log("   Database: airport_management");
  } catch (error) {
    console.error("❌ Database connection failed:", error.message);
  } finally {
    await mongoose.connection.close();
    console.log("\n✅ Database connection closed");
  }
};

checkDatabase();
