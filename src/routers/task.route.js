const Router = require("express").Router();

// create new task task

Router.post("/", (req, res) => {
	res.send("create task");
});

// get all task
Router.get("/", (req, res) => {
	res.send("get all task");
});

// get task by id
Router.get("/:id", (req, res) => {
	res.send("get task by id");
});

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
