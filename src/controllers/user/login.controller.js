const User = require("../../models/user.model");
const { comparePassword } = require("../../utils/encrypt");

const loginUser = async (req, res) => {
	const { email, password } = req.body;

	// check if user input isn't empty
	if (!email || !password) {
		return res.status(400).json({
			data: {
				success: false,
				message: "All fields are required",
			},
		});
	}

	// check if user exists
	const user = await User.findOne({ email });
	if (!user) {
		return res.status(400).json({
			data: {
				success: false,
				message: "User not found",
			},
		});
	}

	// check password
	const isPasswordValid = await comparePassword(password, user.password);
	if (!isPasswordValid) {
		return res.status(400).json({
			data: {
				success: false,
				message: "Invalid password",
			},
		});
	}

	// generate access token and refresh token

	const accessToken = await user.generateAccessToken();
	const refreshToken = await user.generateRefreshToken();
	console.log(`Bearer ${accessToken}`);

	const option = {
		httpOnly: true,
		secure: true,
	};

	return res
		.status(200)
		.cookie("accessToken", accessToken, option)
		.cookie("refreshToken", refreshToken, option)
		.json({
			data: {
				success: true,
				message: "User logged in successfully",
				userInfo: {
					user,
					accessToken,
					refreshToken,
				},
			},
		});
};

module.exports = {
	loginUser,
};
