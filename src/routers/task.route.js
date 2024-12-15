const Router = require("express").Router();
const creteTask = require("../controllers/task/createTask");
const findAllTask = require("../controllers/task/findAlltask");
const findTaskById = require("../controllers/task/findTaskById");
const verifyUser = require("../middlewares/auth.middleware");
const { Task } = require("../models/Task.model");
const mongoose = require("mongoose");

Router.use(verifyUser);

Router.post("/", creteTask);

// get all task
Router.get("/", findAllTask);

// get task by id
Router.get("/:id", findTaskById);

// update task by id
Router.put("/:id", (req, res) => {
	res.send("update task by id");
});

// delete task by id
Router.delete("/:id", (req, res) => {
	res.send("delete task by id");
});

// delete all task
Router.delete("/", (req, res) => {
	res.send("delete all task");
});

// update status of a task
Router.patch("/:id/status", (req, res) => {
	res.send("update status of a task");
});

// assign task to user
Router.patch("/:id/assign", (req, res) => {
	res.send("assign task to user");
});

module.exports = Router;
