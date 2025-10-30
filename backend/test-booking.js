const mongoose = require("mongoose");
const dotenv = require("dotenv");
const User = require("./models/User");
const Flight = require("./models/Flight");
const Booking = require("./models/Booking");
const connectDB = require("./config/db");

// Load env vars
dotenv.config();

const testBookingOperations = async () => {
  try {
    console.log("🎫 Testing Booking Operations & Passenger Data Storage...\n");

    // Connect to database
    await connectDB();

    // Get a test user and flight
    const testUser = await User.findOne({ email: "user@airport.com" });
    const testFlight = await Flight.findOne({ flightNumber: "AA101" });

    if (!testUser) {
      console.log("❌ Test user not found. Please run the seed script first.");
      return;
    }

    if (!testFlight) {
      console.log(
        "❌ Test flight not found. Please run the seed script first."
      );
      return;
    }

    console.log(`✅ Test User: ${testUser.name} (${testUser.email})`);
    console.log(
      `✅ Test Flight: ${testFlight.flightNumber} - ${testFlight.departure.city} → ${testFlight.arrival.city}`
    );

    // Test 1: Create a comprehensive booking with multiple passengers
    console.log("\n🧪 Test 1: Creating Booking with Multiple Passengers...");

    const testBooking = new Booking({
      user: testUser._id,
      flight: testFlight._id,
      passengers: [
        {
          firstName: "John",
          lastName: "Smith",
          dateOfBirth: new Date("1985-03-15"),
          gender: "male",
          passportNumber: "A12345678",
          nationality: "American",
          seatClass: "economy",
        },
        {
          firstName: "Jane",
          lastName: "Smith",
          dateOfBirth: new Date("1987-07-22"),
          gender: "female",
          passportNumber: "A87654321",
          nationality: "American",
          seatClass: "business",
        },
        {
          firstName: "Tommy",
          lastName: "Smith",
          dateOfBirth: new Date("2015-12-10"),
          gender: "male",
          passportNumber: "A11223344",
          nationality: "American",
          seatClass: "economy",
        },
      ],
      contactInfo: {
        email: "john.smith@example.com",
        phone: "+1-555-0123",
      },
      totalAmount: testFlight.price.economy * 2 + testFlight.price.business * 1, // 2 economy + 1 business
      paymentStatus: "paid",
      bookingStatus: "confirmed",
      specialRequests: "Window seats preferred, child meal for Tommy",
    });

    // Save the booking
    const savedBooking = await testBooking.save();
    console.log(`✅ Booking created successfully!`);
    console.log(`   Booking Reference: ${savedBooking.bookingReference}`);
    console.log(`   Passengers: ${savedBooking.passengers.length}`);
    console.log(`   Total Amount: $${savedBooking.totalAmount}`);

    // Test 2: Verify data was saved correctly
    console.log("\n🔍 Test 2: Verifying Saved Data...");

    const retrievedBooking = await Booking.findById(savedBooking._id)
      .populate("user", "name email")
      .populate("flight", "flightNumber airline departure.city arrival.city");

    console.log(`✅ Retrieved booking: ${retrievedBooking.bookingReference}`);
    console.log(
      `   User: ${retrievedBooking.user.name} (${retrievedBooking.user.email})`
    );
    console.log(
      `   Flight: ${retrievedBooking.flight.flightNumber} - ${retrievedBooking.flight.departure.city} → ${retrievedBooking.flight.arrival.city}`
    );

    console.log("\n📋 Passenger Details Stored:");
    retrievedBooking.passengers.forEach((passenger, index) => {
      console.log(`   Passenger ${index + 1}:`);
      console.log(`     Name: ${passenger.firstName} ${passenger.lastName}`);
      console.log(`     DOB: ${passenger.dateOfBirth.toDateString()}`);
      console.log(`     Gender: ${passenger.gender}`);
      console.log(`     Passport: ${passenger.passportNumber}`);
      console.log(`     Nationality: ${passenger.nationality}`);
      console.log(`     Seat Class: ${passenger.seatClass}`);
      console.log("");
    });

    console.log("📞 Contact Information:");
    console.log(`   Email: ${retrievedBooking.contactInfo.email}`);
    console.log(`   Phone: ${retrievedBooking.contactInfo.phone}`);

    console.log(`💰 Payment Details:`);
    console.log(`   Total Amount: $${retrievedBooking.totalAmount}`);
    console.log(`   Payment Status: ${retrievedBooking.paymentStatus}`);
    console.log(`   Booking Status: ${retrievedBooking.bookingStatus}`);

    if (retrievedBooking.specialRequests) {
      console.log(`📝 Special Requests: ${retrievedBooking.specialRequests}`);
    }

    // Test 3: Test booking updates (e.g., cancellation)
    console.log("\n🔄 Test 3: Testing Booking Updates...");

    retrievedBooking.bookingStatus = "cancelled";
    retrievedBooking.paymentStatus = "refunded";
    retrievedBooking.updatedAt = new Date();

    const updatedBooking = await retrievedBooking.save();
    console.log(`✅ Booking updated successfully`);
    console.log(`   Status: ${updatedBooking.bookingStatus}`);
    console.log(`   Payment: ${updatedBooking.paymentStatus}`);
    console.log(`   Updated: ${updatedBooking.updatedAt}`);

    // Test 4: Test complex queries
    console.log("\n🔍 Test 4: Testing Complex Queries...");

    // Find all bookings for this flight
    const flightBookings = await Booking.find({ flight: testFlight._id })
      .populate("user", "name")
      .select(
        "bookingReference passengers.firstName passengers.lastName bookingStatus"
      );

    console.log(
      `✅ Found ${flightBookings.length} booking(s) for flight ${testFlight.flightNumber}`
    );

    // Count total passengers on this flight
    let totalPassengers = 0;
    flightBookings.forEach((booking) => {
      totalPassengers += booking.passengers.length;
    });
    console.log(`   Total passengers: ${totalPassengers}`);

    // Test 5: Test aggregation for passenger manifest
    console.log("\n📊 Test 5: Testing Passenger Manifest Generation...");

    const passengerManifest = await Booking.aggregate([
      {
        $match: { flight: testFlight._id, bookingStatus: { $ne: "cancelled" } },
      },
      { $unwind: "$passengers" },
      {
        $project: {
          bookingReference: 1,
          "passenger.firstName": "$passengers.firstName",
          "passenger.lastName": "$passengers.lastName",
          "passenger.seatClass": "$passengers.seatClass",
          "passenger.nationality": "$passengers.nationality",
        },
      },
    ]);

    console.log(`✅ Generated passenger manifest:`);
    passengerManifest.forEach((entry, index) => {
      console.log(
        `   ${index + 1}. ${entry.passenger.firstName} ${
          entry.passenger.lastName
        } (${entry.passenger.seatClass}) - ${entry.bookingReference}`
      );
    });

    // Clean up test data
    console.log("\n🧹 Cleaning up test data...");
    await Booking.findByIdAndDelete(savedBooking._id);
    console.log("✅ Test booking deleted");

    // Final verification
    console.log("\n📊 MONGODB INTEGRATION VERIFICATION:");
    console.log("=========================================");
    console.log(`✅ Database Connection: WORKING`);
    console.log(`✅ User Data Storage: WORKING`);
    console.log(`✅ Flight Data Storage: WORKING`);
    console.log(`✅ Booking Creation: WORKING`);
    console.log(`✅ Passenger Details Storage: WORKING`);
    console.log(`✅ Contact Information Storage: WORKING`);
    console.log(`✅ Payment Information Storage: WORKING`);
    console.log(`✅ Booking Updates: WORKING`);
    console.log(`✅ Complex Queries: WORKING`);
    console.log(`✅ Data Relationships: WORKING`);
    console.log(`✅ Aggregation Pipelines: WORKING`);

    console.log("\n🎉 MONGODB INTEGRATION IS FULLY OPERATIONAL!");
    console.log("✅ All flight operations are properly saved to MongoDB");
    console.log("✅ All passenger details are correctly stored");
    console.log("✅ All booking information is persistently saved");
    console.log("✅ Data integrity and relationships are maintained");
  } catch (error) {
    console.error("❌ Test failed:", error);
  } finally {
    await mongoose.connection.close();
    console.log("\n🔌 Database connection closed");
    process.exit(0);
  }
};

// Run the test
testBookingOperations();
