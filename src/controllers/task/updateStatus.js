const { Task } = require("../../models/Task.model");
const mongoose = require("mongoose");

const updateStatus = async (req, res) => {
	try {
		const taskId = req.params.id;
		if (!mongoose.Types.ObjectId.isValid(taskId)) {
			return res.status(400).json({
				success: false,
				message: "Invalid task ID format",
			});
		}

		const { status } = req.body;
		const allowedStatuses = ["pending", "in-process", "completed"];
		if (!status || !allowedStatuses.includes(status)) {
			return res.status(400).json({
				success: false,
				message: "Invalid status value",
			});
		}
		const task = await Task.findById(taskId);

		if (!task) {
			return res.status(404).json({
				success: false,
				message: "Task not found",
			});
		}
		task.status = status;
		const updatedTask = await task.save();
		return res.status(200).json({
			success: true,
			message: "Task status updated successfully",
			data: updatedTask,
		});
	} catch (error) {
		console.error("Update Status Error:", error);
		return res.status(500).json({
			success: false,
			message: "Server error while updating task status",
		});
	}
};

module.exports = updateStatus;
