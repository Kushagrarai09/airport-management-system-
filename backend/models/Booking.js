const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
  bookingReference: {
    type: String,
    unique: true,
    uppercase: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  flight: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Flight",
    required: true,
  },
  passengers: [
    {
      firstName: {
        type: String,
        required: [true, "Please add passenger first name"],
      },
      lastName: {
        type: String,
        required: [true, "Please add passenger last name"],
      },
      dateOfBirth: {
        type: Date,
        required: [true, "Please add passenger date of birth"],
      },
      gender: {
        type: String,
        enum: ["male", "female", "other"],
        required: [true, "Please add passenger gender"],
      },
      passportNumber: {
        type: String,
        required: [true, "Please add passport number"],
      },
      nationality: {
        type: String,
        required: [true, "Please add nationality"],
      },
      seatNumber: {
        type: String,
      },
      seatClass: {
        type: String,
        enum: ["economy", "business", "first"],
        default: "economy",
      },
    },
  ],
  contactInfo: {
    email: {
      type: String,
      required: [true, "Please add contact email"],
    },
    phone: {
      type: String,
      required: [true, "Please add contact phone"],
    },
  },
  totalAmount: {
    type: Number,
    required: [true, "Please add total amount"],
  },
  paymentStatus: {
    type: String,
    enum: ["pending", "paid", "failed", "refunded"],
    default: "pending",
  },
  bookingStatus: {
    type: String,
    enum: ["confirmed", "cancelled", "pending"],
    default: "pending",
  },
  specialRequests: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

// Generate booking reference before saving
bookingSchema.pre("save", function (next) {
  if (!this.bookingReference) {
    this.bookingReference =
      "BK" +
      Date.now().toString().slice(-8) +
      Math.random().toString(36).substr(2, 4).toUpperCase();
  }
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model("Booking", bookingSchema);
