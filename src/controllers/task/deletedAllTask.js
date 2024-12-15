const { Task } = require("../../models/Task.model");
const mongoose = require("mongoose");

const bulkDelete = async (req, res) => {
	try {
		const { userId } = req.params;

		if (!mongoose.Types.ObjectId.isValid(userId)) {
			return res.status(400).json({
				success: false,
				message: "Invalid user ID format",
			});
		}

		const result = await Task.deleteMany({ createdBy: userId });

		if (result.deletedCount === 0) {
			return res.status(404).json({
				success: false,
				message: "No tasks found for the user",
			});
		}

		return res.status(200).json({
			success: true,
			message: `${result.deletedCount} tasks deleted successfully`,
		});
	} catch (error) {
		console.error("Bulk Delete Error:", error);
		return res.status(500).json({
			success: false,
			message: "Server error while deleting tasks",
		});
	}
};

module.exports = bulkDelete;
