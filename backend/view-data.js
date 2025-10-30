const mongoose = require("mongoose");
require("dotenv").config();

// Connect to MongoDB
mongoose.connect(
  process.env.MONGODB_URI || "mongodb://localhost:27017/airport_management"
);

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", async function () {
  console.log("✅ Connected to MongoDB");

  try {
    // Get all collections
    const collections = await mongoose.connection.db
      .listCollections()
      .toArray();
    console.log("\n📊 Database Collections:");
    collections.forEach((col) => console.log(`  - ${col.name}`));

    // Count documents in each collection
    console.log("\n📈 Document Counts:");
    for (let collection of collections) {
      const count = await mongoose.connection.db
        .collection(collection.name)
        .countDocuments();
      console.log(`  - ${collection.name}: ${count} documents`);
    }

    // Show sample data from each collection
    console.log("\n🔍 Sample Data:");

    if (collections.find((c) => c.name === "users")) {
      console.log("\n👥 Users:");
      const users = await mongoose.connection.db
        .collection("users")
        .find({})
        .limit(3)
        .toArray();
      users.forEach((user) => {
        console.log(`  - ${user.name} (${user.email}) - Role: ${user.role}`);
      });
    }

    if (collections.find((c) => c.name === "flights")) {
      console.log("\n✈️ Flights:");
      const flights = await mongoose.connection.db
        .collection("flights")
        .find({})
        .limit(5)
        .toArray();
      flights.forEach((flight) => {
        console.log(
          `  - ${flight.flightNumber}: ${flight.departure.city} → ${flight.arrival.city} (${flight.airline})`
        );
      });
    }

    if (collections.find((c) => c.name === "bookings")) {
      console.log("\n🎫 Bookings:");
      const bookings = await mongoose.connection.db
        .collection("bookings")
        .find({})
        .limit(3)
        .toArray();
      bookings.forEach((booking) => {
        console.log(
          `  - ${booking.bookingReference}: ${
            booking.passengers?.length || 0
          } passengers - Status: ${booking.bookingStatus}`
        );
      });
    }

    console.log("\n🎉 All data is successfully stored in MongoDB!");
  } catch (error) {
    console.error("❌ Error viewing data:", error);
  } finally {
    mongoose.connection.close();
  }
});
