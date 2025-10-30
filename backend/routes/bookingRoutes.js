const express = require("express");
const {
  createBooking,
  getUserBookings,
  getAllBookings,
  getBooking,
  cancelBooking,
  getFlightPassengers,
} = require("../controllers/bookingController");
const { protect, admin } = require("../middleware/auth");

const router = express.Router();

router
  .route("/")
  .post(protect, createBooking)
  .get(protect, admin, getAllBookings);

router.get("/my-bookings", protect, getUserBookings);
router.get("/admin/all", protect, admin, getAllBookings);

router.route("/:id").get(protect, getBooking);

router.put("/:id/cancel", protect, cancelBooking);

router.get("/flight/:flightId/passengers", protect, admin, getFlightPassengers);

module.exports = router;
