import Joi from "joi";

export const registerSchema = Joi.object({
	fname: Joi.string().required(),
	lname: Joi.string().required(),
	email: Joi.string().email().required(),
	password: Joi.string().min(6).required(),
	confirmPassword: Joi.string().min(6).required(),
	dob: Joi.date().required(),
	imgProfile: Joi.string().uri().optional(),
	isAdmin: Joi.boolean().optional(),
});

export const loginSchema = Joi.object({
	email: Joi.string().email().required(),
	password: Joi.string().required(),
});

export const validateRegister = async (data) => {
	return registerSchema.validate(data);
};

export const validateLogin = async (data) => {
	return loginSchema.validate(data);
};
