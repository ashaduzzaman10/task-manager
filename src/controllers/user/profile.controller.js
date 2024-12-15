const profileInfo = (req, res) => {
	try {
		const user = req.user;
		res.status(200).json({
			success: true,
			data: {
				user: {
					_id: user._id,
					username: user.username,
					email: user.email,
					profilePicture: user.profilePicture,
					createdAt: user.createdAt,
					updatedAt: user.updatedAt,
				},
			},
		});
	} catch (error) {
		res.status(500).json({
			success: false,
			message: error.message,
		});
	}
};

module.exports = profileInfo;
