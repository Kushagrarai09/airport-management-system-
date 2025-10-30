const Booking = require("../models/Booking");
const Flight = require("../models/Flight");
const User = require("../models/User");

// @desc    Create new booking
// @route   POST /api/bookings
// @access  Private
const createBooking = async (req, res) => {
  try {
    const {
      flightId,
      passengers,
      contactInfo,
      specialRequests,
      seatClass = "economy",
    } = req.body;

    // Check if flight exists
    const flight = await Flight.findById(flightId);
    if (!flight) {
      return res.status(404).json({
        success: false,
        message: "Flight not found",
      });
    }

    // Check if flight is available for booking
    if (flight.status !== "scheduled" && flight.status !== "boarding") {
      return res.status(400).json({
        success: false,
        message: "Flight is not available for booking",
      });
    }

    // Check capacity
    const capacityField = `capacity.${seatClass}`;
    const currentBookings = await Booking.countDocuments({
      flight: flightId,
      bookingStatus: "confirmed",
      "passengers.seatClass": seatClass,
    });

    if (currentBookings + passengers.length > flight.capacity[seatClass]) {
      return res.status(400).json({
        success: false,
        message: `Not enough ${seatClass} seats available`,
      });
    }

    // Calculate total amount
    const pricePerPassenger = flight.price[seatClass];
    const totalAmount = pricePerPassenger * passengers.length;

    // Create booking
    const booking = await Booking.create({
      user: req.user.id,
      flight: flightId,
      passengers: passengers.map((passenger) => ({
        ...passenger,
        seatClass,
      })),
      contactInfo,
      totalAmount,
      specialRequests,
      bookingStatus: "confirmed",
      paymentStatus: "paid",
    });

    // Populate the booking with flight and user details
    const populatedBooking = await Booking.findById(booking._id)
      .populate("flight")
      .populate("user", "name email");

    res.status(201).json({
      success: true,
      data: populatedBooking,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Get user bookings
// @route   GET /api/bookings/my-bookings
// @access  Private
const getUserBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.user.id })
      .populate("flight")
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      count: bookings.length,
      data: bookings,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Get all bookings
// @route   GET /api/bookings
// @access  Private/Admin
const getAllBookings = async (req, res) => {
  try {
    const { page = 1, limit = 10, status, flightId } = req.query;

    let query = {};

    if (status) {
      query.bookingStatus = status;
    }
    if (flightId) {
      query.flight = flightId;
    }

    const bookings = await Booking.find(query)
      .populate("flight")
      .populate("user", "name email")
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .sort({ createdAt: -1 });

    const total = await Booking.countDocuments(query);

    res.json({
      success: true,
      count: bookings.length,
      total,
      page,
      pages: Math.ceil(total / limit),
      data: bookings,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Get single booking
// @route   GET /api/bookings/:id
// @access  Private
const getBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id)
      .populate("flight")
      .populate("user", "name email");

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: "Booking not found",
      });
    }

    // Make sure user can only access their own bookings (unless admin)
    if (
      booking.user._id.toString() !== req.user.id &&
      req.user.role !== "admin"
    ) {
      return res.status(403).json({
        success: false,
        message: "Not authorized to access this booking",
      });
    }

    res.json({
      success: true,
      data: booking,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Cancel booking
// @route   PUT /api/bookings/:id/cancel
// @access  Private
const cancelBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: "Booking not found",
      });
    }

    // Make sure user can only cancel their own bookings (unless admin)
    if (booking.user.toString() !== req.user.id && req.user.role !== "admin") {
      return res.status(403).json({
        success: false,
        message: "Not authorized to cancel this booking",
      });
    }

    // Check if booking can be cancelled
    if (booking.bookingStatus === "cancelled") {
      return res.status(400).json({
        success: false,
        message: "Booking is already cancelled",
      });
    }

    // Get flight details to check departure time
    const flight = await Flight.findById(booking.flight);
    const departureDateTime = new Date(
      `${flight.departure.date} ${flight.departure.time}`
    );
    const now = new Date();
    const hoursUntilDeparture = (departureDateTime - now) / (1000 * 60 * 60);

    // Don't allow cancellation within 24 hours of departure
    if (hoursUntilDeparture < 24) {
      return res.status(400).json({
        success: false,
        message: "Cannot cancel booking within 24 hours of departure",
      });
    }

    booking.bookingStatus = "cancelled";
    booking.paymentStatus = "refunded";
    booking.updatedAt = new Date();

    await booking.save();

    const updatedBooking = await Booking.findById(booking._id)
      .populate("flight")
      .populate("user", "name email");

    res.json({
      success: true,
      data: updatedBooking,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Get passengers for a flight
// @route   GET /api/bookings/flight/:flightId/passengers
// @access  Private/Admin
const getFlightPassengers = async (req, res) => {
  try {
    const { flightId } = req.params;

    const bookings = await Booking.find({
      flight: flightId,
      bookingStatus: "confirmed",
    }).populate("user", "name email");

    const passengers = [];
    bookings.forEach((booking) => {
      booking.passengers.forEach((passenger) => {
        passengers.push({
          ...passenger.toObject(),
          bookingReference: booking.bookingReference,
          userEmail: booking.user.email,
          userName: booking.user.name,
        });
      });
    });

    res.json({
      success: true,
      count: passengers.length,
      data: passengers,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  createBooking,
  getUserBookings,
  getAllBookings,
  getBooking,
  cancelBooking,
  getFlightPassengers,
};
