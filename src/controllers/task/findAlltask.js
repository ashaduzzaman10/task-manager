const { Task } = require("../../models/Task.model");

const findAllTask = async (req, res) => {
	try {
		const tasks = await Task.find({});
		if (!tasks.length) {
			return res.status(404).json({
				success: false,
				message: "No task found",
			});
		}

		return res.status(200).json({
			success: true,
			message: "Task found",
			data: tasks,
		});
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

module.exports = findAllTask;
