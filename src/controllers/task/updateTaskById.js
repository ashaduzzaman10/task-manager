const { Task } = require("../../models/Task.model");
const mongoose = require("mongoose");

const updateTaskById = async (req, res) => {
	try {
		const taskId = req.params.id;
		if (!req.body || Object.keys(req.body).length === 0) {
			return res.status(400).json({
				success: false,
				message: "Update data is required",
			});
		}
		if (!mongoose.Types.ObjectId.isValid(taskId)) {
			return res.status(400).json({
				success: false,
				message: "Invalid task ID format",
			});
		}

		const task = await Task.findById(taskId);

		if (!task) {
			return res.status(404).json({
				success: false,
				message: "Task not found",
			});
		}

		const allowedFields = [
			"title",
			"description",
			"status",
			"priority",
			"dueDate",
			"assignedTo",
		];
		allowedFields.forEach((field) => {
			if (req.body[field]) {
				task[field] = req.body[field];
			}
		});

		const updatedTask = await task.save();

		return res.status(200).json({
			success: true,
			message: "Task updated successfully",
			data: updatedTask,
		});
	} catch (error) {
		console.error("Update Error:", error);

		if (error.name === "ValidationError") {
			return res.status(400).json({
				success: false,
				message: error.message,
			});
		}

		return res.status(500).json({
			success: false,
			message: "Server error while updating task",
		});
	}
};

module.exports = updateTaskById;
