const { Task } = require("../../models/Task.model");

const mongoose = require("mongoose");

const creteTask = async (req, res) => {
	try {
		if (
			!req.body.title ||
			!req.body.description ||
			!req.body.priority ||
			!req.body.status
		) {
			return res.status(400).json({
				message: "Missing required fields",
				required: ["title", "description", "priority", "status"],
			});
		}

		const task = new Task({
			...req.body,
			createdBy: req.user._id,
		});

		const savedTask = await task.save();
		res.status(201).json(savedTask);
	} catch (error) {
		console.error("Task creation error:", error);
		if (error.name === "ValidationError") {
			return res.status(400).json({
				message: "Validation error",
				details: Object.values(error.errors).map((err) => ({
					field: err.path,
					message: err.message,
				})),
			});
		}
		res.status(500).json({
			message: "Error creating task",
			error: error.message,
		});
	}
};

module.exports = creteTask;
