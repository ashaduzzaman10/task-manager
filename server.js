require("dotenv").config();
const app = require("./src/app/app");
const dbConnection = require("./src/config/db");

const PORT = process.env.PORT || 3000;

async function startServer() {
	try {
		await dbConnection();
		app.listen(PORT, () => {
			console.log(`Server is running on port ${PORT}.`);
			console.log(`Server address : http://localhost:${PORT}.`);
		});
	} catch (error) {
		console.log(error.message);
		process.exit(1);
	}
}

startServer();
