const mongoose = require("mongoose");

const flightSchema = new mongoose.Schema({
  flightNumber: {
    type: String,
    required: [true, "Please add a flight number"],
    unique: true,
    uppercase: true,
  },
  airline: {
    type: String,
    required: [true, "Please add airline name"],
  },
  departure: {
    airport: {
      type: String,
      required: [true, "Please add departure airport"],
    },
    city: {
      type: String,
      required: [true, "Please add departure city"],
    },
    country: {
      type: String,
      required: [true, "Please add departure country"],
    },
    date: {
      type: Date,
      required: [true, "Please add departure date"],
    },
    time: {
      type: String,
      required: [true, "Please add departure time"],
    },
  },
  arrival: {
    airport: {
      type: String,
      required: [true, "Please add arrival airport"],
    },
    city: {
      type: String,
      required: [true, "Please add arrival city"],
    },
    country: {
      type: String,
      required: [true, "Please add arrival country"],
    },
    date: {
      type: Date,
      required: [true, "Please add arrival date"],
    },
    time: {
      type: String,
      required: [true, "Please add arrival time"],
    },
  },
  duration: {
    type: String,
    required: [true, "Please add flight duration"],
  },
  aircraft: {
    type: String,
    required: [true, "Please add aircraft type"],
  },
  capacity: {
    total: {
      type: Number,
      required: [true, "Please add total capacity"],
    },
    economy: {
      type: Number,
      required: [true, "Please add economy capacity"],
    },
    business: {
      type: Number,
      default: 0,
    },
    first: {
      type: Number,
      default: 0,
    },
  },
  price: {
    economy: {
      type: Number,
      required: [true, "Please add economy price"],
    },
    business: {
      type: Number,
      default: 0,
    },
    first: {
      type: Number,
      default: 0,
    },
  },
  status: {
    type: String,
    enum: [
      "scheduled",
      "boarding",
      "departed",
      "arrived",
      "cancelled",
      "delayed",
    ],
    default: "scheduled",
  },
  gate: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Index for searching flights
flightSchema.index({
  "departure.city": 1,
  "arrival.city": 1,
  "departure.date": 1,
});

module.exports = mongoose.model("Flight", flightSchema);
