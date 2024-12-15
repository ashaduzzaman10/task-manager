const express = require("express");
const router = express.Router();
const uploadWithMulter = require("../middlewares/multer.middleware");
const verifyUser = require("../middlewares/auth.middleware");
const registerUser = require("../controllers/user/register.controller");
const loginUser = require("../controllers/user/login.controller");
const logoutController = require("../controllers/user/logout.controller");
const profileInfo = require("../controllers/user/profile.controller");

const upload = uploadWithMulter.upload;

// Register route
router.post(
	"/register",
	upload.fields([{ name: "profilePicture", maxCount: 1 }]),
	registerUser
);

// Login user
router.post("/login", loginUser);

// Logout user
router.post("/logout", logoutController);

// Profile route
router.get("/me", profileInfo);

// Update profile route
router.put("/me", (req, res) => {
	res.send("update me");
});

// Update profile picture route
router.put("/me/profile-picture", (req, res) => {
	res.send("update profile picture");
});

// Delete profile
router.delete("/me", (req, res) => {
	res.send("delete me");
});

// Test authentication route
router.get("/test-auth", verifyUser, (req, res) => {
	res
		.status(200)
		.json({ success: true, message: "Authenticated", user: req.user });
});

module.exports = router;
