const express = require("express");
const {
  getFlights,
  getFlight,
  createFlight,
  updateFlight,
  deleteFlight,
  searchFlights,
} = require("../controllers/flightController");
const { protect, admin } = require("../middleware/auth");

const router = express.Router();

router.route("/").get(getFlights).post(protect, admin, createFlight);

router.get("/search", searchFlights);

router
  .route("/:id")
  .get(getFlight)
  .put(protect, admin, updateFlight)
  .delete(protect, admin, deleteFlight);

module.exports = router;
