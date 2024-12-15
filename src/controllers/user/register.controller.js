const User = require("../../models/user.model");
const { uploadOnCloudinary } = require("../../utils/cloudinary");
const { hashPassword } = require("../../utils/encrypt");

const registerUser = async (req, res) => {
	const { username, email, password } = req.body;

	// check if user input isn't empty
	if (!username || !email || !password) {
		return res.status(400).json({
			data: {
				success: false,
				message: "All fields are required",
			},
		});
	}

	// check if the user already exists
	const userExists = await User.findOne({ $or: [{ email }, { username }] });
	if (userExists) {
		return res.status(400).json({
			data: {
				success: false,
				message: "User already exists",
			},
		});
	}

	// handle profile picture upload
	let profilePictureUrl = null;
	try {
		if (req.files && req.files.profilePicture && req.files.profilePicture[0]) {
			const avatarLocalPath = req.files.profilePicture[0].path;
			const profilePicture = await uploadOnCloudinary(avatarLocalPath);
			if (profilePicture) {
				profilePictureUrl = profilePicture.url;
			} else {
				return res.status(500).json({
					data: {
						success: false,
						message: "Failed to upload profile picture",
					},
				});
			}
		}
	} catch (error) {
		return res.status(500).json({
			data: {
				success: false,
				message: "An error occurred during profile picture upload",
				error: error.message,
			},
		});
	}

	// hash the password
	const hashedPassword = await hashPassword(password);

	// create new user
	const newUser = new User({
		username,
		email,
		password: hashedPassword,
		profilePicture: profilePictureUrl,
	});

	try {
		await newUser.save();
		const accessToken = await newUser.generateAccessToken();
		const refreshToken = await newUser.generateRefreshToken();
		const option = {
			httpOnly: true,
			secure: true,
		};
		return res
			.status(201)
			.cookie("accessToken", accessToken, option)
			.cookie("refreshToken", refreshToken, option)
			.json({
				data: {
					success: true,
					message: "User registered successfully",
					user: newUser,
					tokens: {
						accessToken,
						refreshToken,
					},
				},
			});
	} catch (error) {
		return res.status(500).json({
			data: {
				success: false,
				message: "An error occurred while creating the user",
				error: error.message,
			},
		});
	}
};

module.exports = registerUser;
