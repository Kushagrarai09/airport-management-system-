const mongoose = require("mongoose");
const dotenv = require("dotenv");
const User = require("./models/User");
const Flight = require("./models/Flight");
const Booking = require("./models/Booking");
const connectDB = require("./config/db");

// Load env vars
dotenv.config();

// Sample data
const users = [
  {
    name: "Admin User",
    email: "admin@airport.com",
    password: "password123",
    role: "admin",
    phone: "+1234567890",
    dateOfBirth: new Date("1990-01-01"),
  },
  {
    name: "John Doe",
    email: "user@airport.com",
    password: "password123",
    role: "user",
    phone: "+1234567891",
    dateOfBirth: new Date("1985-05-15"),
  },
];

const flights = [
  {
    flightNumber: "AA101",
    airline: "American Airlines",
    departure: {
      airport: "JFK",
      city: "New York",
      country: "USA",
      date: new Date("2025-01-15"),
      time: "08:00",
    },
    arrival: {
      airport: "LAX",
      city: "Los Angeles",
      country: "USA",
      date: new Date("2025-01-15"),
      time: "11:30",
    },
    duration: "5h 30m",
    aircraft: "Boeing 737",
    capacity: {
      total: 180,
      economy: 150,
      business: 20,
      first: 10,
    },
    price: {
      economy: 299,
      business: 799,
      first: 1299,
    },
    status: "scheduled",
    gate: "A1",
  },
  {
    flightNumber: "UA202",
    airline: "United Airlines",
    departure: {
      airport: "ORD",
      city: "Chicago",
      country: "USA",
      date: new Date("2025-01-16"),
      time: "14:00",
    },
    arrival: {
      airport: "MIA",
      city: "Miami",
      country: "USA",
      date: new Date("2025-01-16"),
      time: "17:45",
    },
    duration: "3h 45m",
    aircraft: "Airbus A320",
    capacity: {
      total: 160,
      economy: 140,
      business: 20,
      first: 0,
    },
    price: {
      economy: 249,
      business: 699,
      first: 0,
    },
    status: "scheduled",
    gate: "B5",
  },
  {
    flightNumber: "DL303",
    airline: "Delta Airlines",
    departure: {
      airport: "ATL",
      city: "Atlanta",
      country: "USA",
      date: new Date("2025-01-17"),
      time: "09:30",
    },
    arrival: {
      airport: "SEA",
      city: "Seattle",
      country: "USA",
      date: new Date("2025-01-17"),
      time: "12:15",
    },
    duration: "4h 45m",
    aircraft: "Boeing 757",
    capacity: {
      total: 200,
      economy: 170,
      business: 25,
      first: 5,
    },
    price: {
      economy: 349,
      business: 899,
      first: 1599,
    },
    status: "scheduled",
    gate: "C3",
  },
  {
    flightNumber: "SW404",
    airline: "Southwest Airlines",
    departure: {
      airport: "DEN",
      city: "Denver",
      country: "USA",
      date: new Date("2025-01-18"),
      time: "16:20",
    },
    arrival: {
      airport: "PHX",
      city: "Phoenix",
      country: "USA",
      date: new Date("2025-01-18"),
      time: "18:30",
    },
    duration: "2h 10m",
    aircraft: "Boeing 737",
    capacity: {
      total: 175,
      economy: 175,
      business: 0,
      first: 0,
    },
    price: {
      economy: 199,
      business: 0,
      first: 0,
    },
    status: "scheduled",
    gate: "D7",
  },
  {
    flightNumber: "BA505",
    airline: "British Airways",
    departure: {
      airport: "LHR",
      city: "London",
      country: "UK",
      date: new Date("2025-01-19"),
      time: "22:00",
    },
    arrival: {
      airport: "JFK",
      city: "New York",
      country: "USA",
      date: new Date("2025-01-20"),
      time: "01:30",
    },
    duration: "8h 30m",
    aircraft: "Boeing 777",
    capacity: {
      total: 350,
      economy: 280,
      business: 50,
      first: 20,
    },
    price: {
      economy: 699,
      business: 2499,
      first: 4999,
    },
    status: "scheduled",
    gate: "E2",
  },
];

const seedData = async () => {
  try {
    // Connect to database
    await connectDB();

    // Clear existing data
    await User.deleteMany({});
    await Flight.deleteMany({});
    await Booking.deleteMany({});

    console.log("Cleared existing data");

    // Insert users
    const createdUsers = await User.create(users);
    console.log("Users seeded successfully");

    // Insert flights
    const createdFlights = await Flight.create(flights);
    console.log("Flights seeded successfully");

    console.log("Database seeded successfully!");
    console.log("\nDemo Credentials:");
    console.log("Admin: admin@airport.com / password123");
    console.log("User: user@airport.com / password123");

    process.exit(0);
  } catch (error) {
    console.error("Error seeding database:", error);
    process.exit(1);
  }
};

seedData();
