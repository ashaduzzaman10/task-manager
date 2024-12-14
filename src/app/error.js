class CustomError extends Error {
	constructor(message, status) {
		super(message);
		this.status = status;
	}
}

const notFoundHandler = (req, res, next) => {
	const error = new CustomError("Not found", 404);
	next(error);
};

const serverErrorHandler = (error, req, res, next) => {
	if (error.status) {
		return res.status(error.status).json({
			error: {
				message: error.message,
			},
		});
	}
	res.status(500);
	res.json({
		error: {
			message: error.message || "Internal Server Error",
		},
	});
};

module.exports = {
	notFoundHandler,
	serverErrorHandler,
};
