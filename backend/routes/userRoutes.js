const express = require("express");
const {
  registerUser,
  loginUser,
  getUserProfile,
  updateUserProfile,
  getUsers,
} = require("../controllers/userController");
const { protect, admin } = require("../middleware/auth");

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router
  .route("/profile")
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile);
router.get("/", protect, admin, getUsers);
router.get("/admin/all", protect, admin, getUsers);

module.exports = router;
