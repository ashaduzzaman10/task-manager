require("dotenv").config();

const Router = require("express").Router();
const userRouter = require("../routers/register.route");
const taskRouter = require("../routers/task.route");

//  custom routes

Router.use("/api/v1/users", userRouter);
Router.use("/api/v1/tasks", taskRouter);
//  health check
Router.get("/health", (_req, res) => {
	res.status(200).json({
		data: {
			success: true,
			message: "success",
		},
	});
});

// home route

Router.get("/", (_req, res) => {
	res.status(200).json({
		data: {
			success: true,
			message: "Welcome to the  task-manager API",
		},
	});
});

module.exports = Router;
