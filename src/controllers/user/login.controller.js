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
		return res.status(404).json({
			data: {
				success: false,
				message: "User not found",
			},
		});
	}

	// check if password is correct
	const isPasswordValid = await comparePassword(password, user.password);

	if (!isPasswordValid) {
		return res.status(401).json({
			data: {
				success: false,
				message: "Invalid credentials",
			},
		});
	}

	// user is logged in
	return res.status(200).json({
		data: {
			success: true,
			message: "User was logged in",
			user: {
				id: user._id,
				email: user.email,
				userData: user,
			},
		},
	});
};

module.exports = loginUser;
