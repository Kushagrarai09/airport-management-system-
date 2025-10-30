const Flight = require("../models/Flight");

// @desc    Get all flights
// @route   GET /api/flights
// @access  Public
const getFlights = async (req, res) => {
  try {
    const {
      departure,
      arrival,
      date,
      passengers,
      class: seatClass,
      page = 1,
      limit = 10,
    } = req.query;

    let query = {};

    // Build search query
    if (departure) {
      query["departure.city"] = { $regex: departure, $options: "i" };
    }
    if (arrival) {
      query["arrival.city"] = { $regex: arrival, $options: "i" };
    }
    if (date) {
      const searchDate = new Date(date);
      const nextDay = new Date(searchDate);
      nextDay.setDate(nextDay.getDate() + 1);
      query["departure.date"] = {
        $gte: searchDate,
        $lt: nextDay,
      };
    }

    // Only show flights that haven't departed yet
    query["departure.date"] = {
      ...query["departure.date"],
      $gte: new Date(),
    };
    query.status = { $in: ["scheduled", "boarding"] };

    const options = {
      page: parseInt(page, 10),
      limit: parseInt(limit, 10),
      sort: { "departure.date": 1, "departure.time": 1 },
    };

    const flights = await Flight.find(query)
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .sort(options.sort);

    const total = await Flight.countDocuments(query);

    res.json({
      success: true,
      count: flights.length,
      total,
      page,
      pages: Math.ceil(total / limit),
      data: flights,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Get single flight
// @route   GET /api/flights/:id
// @access  Public
const getFlight = async (req, res) => {
  try {
    const flight = await Flight.findById(req.params.id);

    if (!flight) {
      return res.status(404).json({
        success: false,
        message: "Flight not found",
      });
    }

    res.json({
      success: true,
      data: flight,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Create new flight
// @route   POST /api/flights
// @access  Private/Admin
const createFlight = async (req, res) => {
  try {
    const flight = await Flight.create(req.body);

    res.status(201).json({
      success: true,
      data: flight,
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: "Flight number already exists",
      });
    }
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Update flight
// @route   PUT /api/flights/:id
// @access  Private/Admin
const updateFlight = async (req, res) => {
  try {
    let flight = await Flight.findById(req.params.id);

    if (!flight) {
      return res.status(404).json({
        success: false,
        message: "Flight not found",
      });
    }

    flight = await Flight.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.json({
      success: true,
      data: flight,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Delete flight
// @route   DELETE /api/flights/:id
// @access  Private/Admin
const deleteFlight = async (req, res) => {
  try {
    const flight = await Flight.findById(req.params.id);

    if (!flight) {
      return res.status(404).json({
        success: false,
        message: "Flight not found",
      });
    }

    await Flight.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
      data: {},
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Search flights
// @route   GET /api/flights/search
// @access  Public
const searchFlights = async (req, res) => {
  try {
    const {
      from,
      to,
      departureDate,
      returnDate,
      passengers = 1,
      class: seatClass = "economy",
    } = req.query;

    if (!from || !to || !departureDate) {
      return res.status(400).json({
        success: false,
        message:
          "Please provide departure city, arrival city, and departure date",
      });
    }

    let query = {
      "departure.city": { $regex: from, $options: "i" },
      "arrival.city": { $regex: to, $options: "i" },
      status: { $in: ["scheduled", "boarding"] },
    };

    // Add date filter
    const searchDate = new Date(departureDate);
    const nextDay = new Date(searchDate);
    nextDay.setDate(nextDay.getDate() + 1);
    query["departure.date"] = {
      $gte: searchDate,
      $lt: nextDay,
    };

    // Check capacity
    const capacityField = `capacity.${seatClass}`;
    query[capacityField] = { $gte: parseInt(passengers) };

    const flights = await Flight.find(query).sort({
      "departure.date": 1,
      "departure.time": 1,
    });

    res.json({
      success: true,
      count: flights.length,
      data: flights,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  getFlights,
  getFlight,
  createFlight,
  updateFlight,
  deleteFlight,
  searchFlights,
};
