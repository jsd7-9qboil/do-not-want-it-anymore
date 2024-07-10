import User from "../models/userModel.js";
import bcrypt from "bcryptjs";

export const registerAdminService = async ({
	fname,
	lname,
	email,
	password,
}) => {
	const existingUser = await User.findOne({ email });
	if (existingUser) throw new Error("Admin already exists");

	const hashedPassword = await bcrypt.hash(password, 12);
	const newUser = new User({
		fname,
		lname,
		email,
		password: hashedPassword,
		isAdmin: true,
	});
	await newUser.save();
	return newUser;
};

export const loginAdminService = async (email, password) => {
	const admin = await User.findOne({ email, isAdmin: true });
	if (!admin) return null;

	const isPasswordCorrect = await bcrypt.compare(password, admin.password);
	if (!isPasswordCorrect) return null;

	return admin;
};
