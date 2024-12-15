const { Task } = require("../../models/Task.model");
const User = require("../../models/user.model");
const mongoose = require("mongoose");

const assignTaskById = async (req, res) => {
	try {
		const { taskId, userId } = req.params;
		if (
			!mongoose.Types.ObjectId.isValid(taskId) ||
			!mongoose.Types.ObjectId.isValid(userId)
		) {
			return res.status(400).json({
				success: false,
				message: "Invalid task ID or user ID format",
			});
		}

		const task = await Task.findById(taskId);
		if (!task) {
			return res.status(404).json({
				success: false,
				message: "Task not found",
			});
		}

		const user = await User.findById(userId);
		if (!user) {
			return res.status(404).json({
				success: false,
				message: "User not found",
			});
		}

		task.assignedTo = userId;

		const updatedTask = await task.save();

		return res.status(200).json({
			success: true,
			message: "Task assigned successfully",
			data: updatedTask,
		});
	} catch (error) {
		console.error("Assign Task Error:", error);
		return res.status(500).json({
			success: false,
			message: "Server error while assigning task",
		});
	}
};

module.exports = assignTaskById;
