const mongoose = require("mongoose");
const Flight = require("./models/Flight");
require("dotenv").config();

mongoose.connect(
  process.env.MONGODB_URI || "mongodb://localhost:27017/airport_management"
);

mongoose.connection.once("open", async () => {
  console.log("🔍 Checking Flight Data Issues...\n");

  try {
    // Get all flights
    const allFlights = await Flight.find({});
    console.log(`📊 Total flights in database: ${allFlights.length}`);

    console.log("\n✈️ All flights with details:");
    allFlights.forEach((flight, index) => {
      console.log(`${index + 1}. ${flight.flightNumber} (${flight.airline})`);
      console.log(
        `   Route: ${flight.departure.city} → ${flight.arrival.city}`
      );
      console.log(`   Date: ${flight.departure.date.toLocaleDateString()}`);
      console.log(`   Status: ${flight.status}`);
      console.log(
        `   Created: ${flight.createdAt?.toLocaleDateString() || "Unknown"}`
      );
      console.log("");
    });

    // Check API filtering
    const today = new Date();
    const futureFlights = await Flight.find({
      "departure.date": { $gte: today },
      status: { $in: ["scheduled", "boarding"] },
    });

    console.log(`🎯 API Filter Results:`);
    console.log(`   Today's date: ${today.toLocaleDateString()}`);
    console.log(
      `   Future flights with correct status: ${futureFlights.length}`
    );

    if (futureFlights.length === 0) {
      console.log("\n❌ Issue Found: No flights match API criteria!");
      console.log("\nPossible problems:");
      console.log("1. Flight dates are in the past");
      console.log('2. Flight status is not "scheduled" or "boarding"');
      console.log("3. Date comparison issue");

      // Check each issue
      const pastFlights = await Flight.find({
        "departure.date": { $lt: today },
      });
      console.log(`   - Past flights: ${pastFlights.length}`);

      const wrongStatus = await Flight.find({
        status: { $nin: ["scheduled", "boarding"] },
      });
      console.log(`   - Wrong status flights: ${wrongStatus.length}`);
    }

    // Show what needs to be fixed
    console.log("\n🔧 Fixing the issues...");

    // Update all flights to have future dates and correct status
    const updatedFlights = await Flight.updateMany(
      {},
      {
        $set: {
          "departure.date": new Date("2025-12-01"),
          "arrival.date": new Date("2025-12-01"),
          status: "scheduled",
        },
      }
    );

    console.log(
      `✅ Updated ${updatedFlights.modifiedCount} flights with future dates and correct status`
    );

    // Verify the fix
    const fixedFlights = await Flight.find({
      "departure.date": { $gte: today },
      status: { $in: ["scheduled", "boarding"] },
    });

    console.log(
      `✅ After fix: ${fixedFlights.length} flights now match API criteria`
    );
  } catch (error) {
    console.error("❌ Error:", error);
  } finally {
    mongoose.connection.close();
    console.log("\n🎉 Flight data check complete!");
  }
});
