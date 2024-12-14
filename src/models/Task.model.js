const mongoose = require("mongoose");

const TaskSchema = new mongoose.Schema(
	{
		title: {
			type: String,
			required: [true, "Task title is required"],
			lowercase: true,
			unique: true,
			index: true,
			trim: true,
			minlength: [10, "Title must be at least 10 characters long"],
			maxlength: [100, "Title must not exceed 100 characters"],
		},
		description: {
			type: String,
			required: [true, "Task description is required"],
			lowercase: true,
			trim: true,
			minlength: [50, "Description must be at least 50 characters long"],
			maxlength: [3000, "Description must not exceed 3000 characters"],
		},
		status: {
			type: String,
			required: [true, "Task status is required"],
			enum: ["pending", "in-process", "completed"],
			lowercase: true,
			default: "pending",
		},
		priority: {
			type: String,
			required: [true, "Task priority is required"],
			enum: ["low", "medium", "high"],
			lowercase: true,
			default: "low",
		},
		dueDate: {
			type: Date,
			required: false,
			default: function () {
				return new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // Default: 7 days from now
			},
		},
		createdBy: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
			required: [true, "Task must have a creator"],
		},
		assignedTo: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
			required: false,
		},
	},
	{ timestamps: true }
);

const Task = mongoose.model("Task", TaskSchema);

module.exports = {
	Task,
};
