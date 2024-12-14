const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
	{
		username: {
			type: String,
			required: [true, "Username is required"],
			lowercase: true,
			trim: true,
			index: true,
			unique: true,
			minlength: [5, "Username must be at least 5 characters long"],
			maxlength: [20, "Username must not exceed 20 characters"],
		},
		email: {
			type: String,
			required: [true, "Email is required"],
			lowercase: true,
			unique: true,
			index: true,
			match: [
				/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
				"Please enter a valid email address",
			],
		},
		password: {
			type: String,
			required: [true, "Password is required"],
			minlength: [8, "Password must be at least 8 characters long"],
		},
		profilePicture: {
			type: String,
		},
	},
	{ timestamps: true }
);

const User = mongoose.model("User", UserSchema);

module.exports = {
	User,
};
