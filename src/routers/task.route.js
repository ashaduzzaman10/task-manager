const Router = require("express").Router();
const assignTaskById = require("../controllers/task/assignTaskbyId");
const creteTask = require("../controllers/task/createTask");
const deleteById = require("../controllers/task/deleteById");
const bulkDelete = require("../controllers/task/deletedAllTask");
const findAllTask = require("../controllers/task/findAlltask");
const findTaskById = require("../controllers/task/findTaskById");
const updateStatus = require("../controllers/task/updateStatus");
const updateTaskById = require("../controllers/task/updateTaskById");
const verifyUser = require("../middlewares/auth.middleware");

Router.use(verifyUser);

Router.post("/", creteTask);

// get all task
Router.get("/", findAllTask);

// get task by id
Router.get("/:id", findTaskById);

// update task by id
Router.put("/:id", updateTaskById);

// delete task by id
Router.delete("/:id", deleteById);
      
// delete all task
Router.delete("/", bulkDelete);

// update status of a task
Router.patch("/:id/status", updateStatus);

// assign task to user
Router.patch("/:id/assign", assignTaskById);

module.exports = Router;


