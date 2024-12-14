require("dotenv").config();
const express = require("express");
const Router = require("./routes"); 

const { notFoundHandler, serverErrorHandler } = require("./error");
const middleware = require("./middleware");

const app = express();

// Middleware
app.use(middleware);

// Routes
app.use(Router);

// error handler
app.use(notFoundHandler);

// Server error handler
app.use(serverErrorHandler);

module.exports = app;
