const { Task } = require("../../models/Task.model");
const mongoose = require("mongoose");

const deleteById = async (req, res) => {
	try {
		const taskId = req.params.id;

		if (!mongoose.Types.ObjectId.isValid(taskId)) {
			return res.status(400).json({
				success: false,
				message: "Invalid task ID format",
			});
		}

		const task = await Task.findByIdAndDelete(taskId);

		if (!task) {
			return res.status(404).json({
				success: false,
				message: "Task not found",
			});
		}

		return res.status(200).json({
			success: true,
			message: "Task deleted successfully",
			data: task,
		});
	} catch (error) {
		console.error("Delete Error:", error);
		return res.status(500).json({
			success: false,
			message: "Server error while deleting task",
		});
	}
};

module.exports = deleteById;
