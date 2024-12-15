const express = require("express");
const router = express.Router();
const { upload } = require("../middlewares/multer.middleware");
const verifyUser = require("../middlewares/auth.middleware");
const registerUser = require("../controllers/user/register.controller");
const loginUser = require("../controllers/user/login.controller");
const logoutController = require("../controllers/user/logout.controller");
const profileInfo = require("../controllers/user/profile.controller");
const updateProfile = require("../controllers/user/updateProfile");
const deleteProfile = require("../controllers/user/deleteProfile");
const updateProfilePhoto = require("../controllers/user/updateProfilePhoto");

// Async  wrapper

const asyncHandler = (fn) => (req, res, next) => {
	Promise.resolve(fn(req, res, next)).catch(next);
};

// Public routes
router.post(
	"/register",
	upload.fields([{ name: "profilePicture", maxCount: 1 }]),
	asyncHandler(registerUser)
);

router.post("/login", asyncHandler(loginUser));

// Protected routes
router.use(verifyUser);

// Logout route

router.post("/logout", asyncHandler(logoutController));

// User profile routes

router.get("/me", asyncHandler(profileInfo));

// Update user profile
router.put(
	"/me",
	upload.fields([{ name: "profilePicture", maxCount: 1 }]),
	asyncHandler(updateProfile)
);

// Update profile picture

router.put(
	"/me/profile-picture",
	upload.single("profilePicture"),
	asyncHandler(updateProfilePhoto)
);

router.delete("/me", asyncHandler(deleteProfile));

module.exports = router;
