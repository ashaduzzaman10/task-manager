require("dotenv").config();
const jwt = require("jsonwebtoken");
const User = require("../models/user.model");
const verifyUser = async (req, res, next) => {
	try {
		// Check for Authorization header
		const authHeader = req.header("Authorization");
		if (!authHeader?.startsWith("Bearer ")) {
			return res.status(401).json({
				success: false,
				message: "Authorization header missing or invalid",
			});
		}

		const token = authHeader.replace("Bearer ", "");
		const secret = process.env.ACCESS_TOKEN_SECRET;

		if (!secret) {
			return res.status(500).json({
				success: false,
				message: "Server configuration error",
			});
		}

		const decoded = jwt.verify(token, secret);
		const user = await User.findById(decoded._id).select("-password");

		if (!user) {
			return res.status(401).json({
				success: false,
				message: "User not found or invalid token",
			});
		}

		req.user = user;
		next();
	} catch (error) {
		return res.status(401).json({
			success: false,
			message: "Invalid token or authentication failed",
		});
	}
};
module.exports = verifyUser;
