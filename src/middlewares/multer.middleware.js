const multer = require("multer");
const fs = require("fs");
const path = require("path");

const tempDir = path.join(__dirname, "../../public/temp");

if (!fs.existsSync(tempDir)) {
	fs.mkdirSync(tempDir, { recursive: true });
}

const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, tempDir);
	},
	filename: (req, file, cb) => {
		cb(null, file.originalname);
	},
});

const upload = multer({ storage });

module.exports = { upload };
