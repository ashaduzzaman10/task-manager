const logoutController = async (req, res) => {
	try {
		const user = req.user;
		if (!user?._id) {
			return res.status(401).json({
				success: false,
				message: "Unauthorized",
			});
		}

		// Clear cookies
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
				message: "Logged out successfully",
			});
	} catch (error) {
		return res.status(500).json({
			success: false,
			message: error.message || "Logout failed",
		});
	}
};
module.exports = logoutController;
