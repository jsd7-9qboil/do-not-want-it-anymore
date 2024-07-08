export const errorHandler = (err, req, res, next) => {
	res.status(err.status || 500).json({
		message: err.message || "Internal Server Error",
	});
};

export const notFound = (req, res, next) => {
	res.status(404).json({ message: "Not Found" });
};
