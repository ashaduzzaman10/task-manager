const express = require("express");
const router = express.Router();
const uploadWithMulter = require("../middlewares/multer.middleware");

const { registerUser } = require("../controllers/user/register.controller");
const { loginUser } = require("../controllers/user/login.controller");

const upload = uploadWithMulter.upload;

router.post(
	"/register",
	upload.fields([{ name: "profilePicture", maxCount: 1 }]),
	registerUser
);

// login user
router.post("/login", loginUser);

module.exports = router;
