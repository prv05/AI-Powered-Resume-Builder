const express = require("express");
const { registerUser, loginUser } = require("../controllers/authController");

const router = express.Router();

// Test route to check if /api/auth/ is accessible
router.get("/", (req, res) => {
    res.send("Auth route is working!");
});

// User registration route
router.post("/register", registerUser);

// User login route
router.post("/login", loginUser);

module.exports = router;
