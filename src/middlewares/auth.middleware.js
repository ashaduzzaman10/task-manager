require("dotenv").config();
const jwt = require("jsonwebtoken");
const User = require("../models/user.model");

const verifyUser = async (req, res, next) => {
	try {
		const token = req.header("Authorization").replace("Bearer ", "");
		if (!token) {
			return res
				.status(401)
				.json({ success: false, message: "No token provided" });
		}

		const secret = process.env.ACCESS_TOKEN_SECRET;
		if (!secret) {
			return res
				.status(500)
				.json({ success: false, message: "Token secret not defined" });
		}
		const decoded = jwt.verify(token, secret);
		const user = await User.findOne({
			_id: decoded._id,
			"tokens.token": token,
		});

		if (!user) {
			throw new Error();
		}

		req.token = token;
		req.user = user;
		next();
	} catch (error) {
		res.status(401).json({ success: false, message: "Please authenticate" });
	}
};

module.exports = verifyUser;
