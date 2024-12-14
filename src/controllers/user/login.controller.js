const { User } = require("../../models/user.model");
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

	// generate token for user
	// const token = generateToken(user);

	return res.status(200).json({
		data: {
			success: true,
			message: "User logged in successfully",
			userInfo : {
				user,
			},
			// token,
		},
	});
};

module.exports = {
	loginUser,
};
