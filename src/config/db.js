require("dotenv").config();

const mongoose = require("mongoose");

const dbUrl = process.env.DB_URL;
const dbUserName = process.env.DB_USER_NAME;
const dbUserPassword = process.env.DB_USER_PASSWORD;

if (!dbUrl || !dbUserName || !dbUserPassword) {
	console.error("Database connection string is missing");
	process.exit(1);
}
const encodedPassword = encodeURIComponent(dbUserPassword);

const encodedUrl = dbUrl
	.replace("<db_username>", dbUserName)
	.replace("<db_password>", encodedPassword);

const dbConnection = async () => {
	try {
		await mongoose.connect(encodedUrl);
		// console.log(encodedUrl);
		console.log("Database connection successful");
	} catch (error) {
		console.error("Database connection failed");
		process.exit(1);
	}
};

module.exports = dbConnection;
