const deleteProfile = async (req, res) => {
	try {
		await req.user.deleteOne();
		res.clearCookie("accessToken");
		res.clearCookie("refreshToken");

		res.status(200).json({
			success: true,
			message: "Account deleted successfully",
		});
	} catch (error) {
		res.status(500).json({
			success: false,
			message: error.message || "Account deletion failed",
		});
	}
};

module.exports = deleteProfile;
