const User = require("../../models/user.model");

const logoutController = async (req, res) => {
	try {
		if (!req.user || !req.user._id) {
			return res.status(401).json({
				success: false,
				data: {
					message: "Unauthorized",
				},
			});
		}

		await User.findByIdAndUpdate(req.user._id, {
			$unset: { refreshToken: 1 },
		});

		const options = {
			httpOnly: true,
			secure: process.env.NODE_ENV === "production",
			sameSite: "strict",
		};

		return res
			.status(200)
			.clearCookie("accessToken", options)
			.clearCookie("refreshToken", options)
			.json({
				success: true,
				data: {
					message: "Logged out successfully",
				},
			});
	} catch (error) {
		return res.status(500).json({
			success: false,
			data: {
				message: error.message,
			},
		});
	}
};

module.exports = logoutController;
