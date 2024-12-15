const { uploadOnCloudinary } = require("../../utils/cloudinary");

const updateProfile = async (req, res) => {
	try {
		const { username, email } = req.body;
		const user = req.user;
		if (username) user.username = username;
		if (email) user.email = email;
		if (req.files?.profilePicture?.[0]) {
			const result = await uploadOnCloudinary(req.files.profilePicture[0].path);
			if (result?.url) {
				user.profilePicture = result.url;
			}
		}
		await user.save();

		res.status(200).json({
			success: true,
			message: "Profile updated successfully",
			data: {
				user: {
					_id: user._id,
					username: user.username,
					email: user.email,
					profilePicture: user.profilePicture,
					updatedAt: user.updatedAt,
				},
			},
		});
	} catch (error) {
		res.status(500).json({
			success: false,
			message: error.message || "Profile update failed",
		});
	}
};

module.exports = updateProfile;
