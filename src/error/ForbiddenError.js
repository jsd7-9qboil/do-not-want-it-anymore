class ForbiddenError extends Error {
	constructor(message) {
		super(message);
		this.status = 403;
		this.name = "ForbiddenError";
	}
}

export default ForbiddenError;
