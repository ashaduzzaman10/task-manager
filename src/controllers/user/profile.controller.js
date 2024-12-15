// @ts-nocheck
require("dotenv").config();
const jwt = require("jsonwebtoken");
const User = require("../../models/user.model");

const profileInfo = async (req, res, next) => {
	try {
		const token = req.header("Authorization").replace("Bearer ", "");
		const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
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
		res.status(401).json({ success: false, message: "Please authenticate." });
	}
};

module.exports = profileInfo;
