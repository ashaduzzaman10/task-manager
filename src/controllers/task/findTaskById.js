const { Task } = require("../../models/Task.model");
const mongoose = require("mongoose");

const findTaskById = async (req, res) => {
	try {
		const { taskId, userId } = req.params;
		if (
			!mongoose.Types.ObjectId.isValid(taskId) ||
			!mongoose.Types.ObjectId.isValid(userId)
		) {
			return res.status(400).json({
				success: false,
				message: "Invalid ID format",
			});
		}

		const task = await Task.findOne({
			_id: taskId,
			createdBy: userId,
		}).populate("createdBy", "name email");

		if (!task) {
			return res.status(404).json({
				success: false,
				message: "Task not found or unauthorized",
			});
		}

		return res.status(200).json({
			success: true,
			message: "Task found successfully",
			data: task,
		});
	} catch (error) {
		return res.status(500).json({
			success: false,
			message: "Server error",
			error: error.message,
		});
	}
};

module.exports = findTaskById;
