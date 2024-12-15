const express = require("express");
const router = express.Router();
const uploadWithMulter = require("../middlewares/multer.middleware");

const { registerUser } = require("../controllers/user/register.controller");
const { loginUser } = require("../controllers/user/login.controller");
const { logoutController } = require( "../controllers/user/logout.controller" );

const upload = uploadWithMulter.upload;
//  register route

router.post(
	"/register",
	upload.fields([{ name: "profilePicture", maxCount: 1 }]),
	registerUser
);

// login user
router.post("/login", loginUser);

// logout user
router.post("/logout", logoutController);

// profile route
router.get("/me", (req, res) => {
	res.send("me");
});

//  update profile route
router.put("/me", (req, res) => {
	res.send("update me");
});

//  update profile picture route
router.put("/me/profile-picture", (req, res) => {
	res.send("update profile picture");
});

// delete profile
router.delete("/me", (req, res) => {
	res.send("delete me");
});
module.exports = router;
