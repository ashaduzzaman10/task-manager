const { uploadOnCloudinary } = require("../../utils/cloudinary");
const updateProfilePhoto = async (req, res) => {
	try {
		if (!req.file) {
			return res.status(400).json({
				success: false,
				message: "No profile picture provided",
			});
		}

		const user = req.user;
		const result = await uploadOnCloudinary(req.file.path);
		if (!result?.url) {
			return res.status(500).json({
				success: false,
				message: "Error uploading profile picture",
			});
		}
		user.profilePicture = result.url;
		await user.save();

		return res.status(200).json({
			success: true,
			message: "Profile picture updated successfully",
			data: {
				profilePicture: user.profilePicture,
			},
		});
	} catch (error) {
		return res.status(500).json({
			success: false,
			message: error.message || "Error updating profile picture",
		});
	}
};

module.exports = updateProfilePhoto;
