const express = require("express");
const router = express.Router();
const multer = require("multer");

const { registerUser } = require("../controllers/user/register.controller");
const { loginUser } = require("../controllers/user/login.controller");

const upload = multer({ dest: "uploads/" });

router.post(
	"/register",
	upload.fields([{ name: "profilePicture", maxCount: 1 }]),
	registerUser
);

// login user
router.post("/login", loginUser);

module.exports = router;
