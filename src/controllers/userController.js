import User from "../models/userModel.js";
import jwt from "jsonwebtoken";
import moment from "moment";
import userService from "../services/userService.js";

// Middleware to authenticate users and get their roles
export const authenticate = (req, res, next) => {
	const token = req.header("Authorization").replace("Bearer ", "");
	if (!token) {
		return res.status(401).json({ message: "No token provided" });
	}

	try {
		const decoded = jwt.verify(token, process.env.JWT_SECRET);
		req.user = decoded;
		next();
	} catch (error) {
		res.status(401).json({ message: "Invalid token" });
	}
};

export const registerUser = async (req, res) => {
	try {
		const { fname, lname, email, password, dob, isAdmin } = req.body;

		const formattedDob = moment(dob, "DD/MM/YYYY").toDate(); // แปลงรูปแบบวันที่

		const user = await userService.createUser({
			fname,
			lname,
			email,
			password,
			dob: formattedDob,
			isAdmin,
		});

		const token = jwt.sign(
			{ _id: user._id, email: user.email, isAdmin: user.isAdmin },
			process.env.JWT_SECRET
		);

		res.status(201).json({ token });
	} catch (error) {
		res.status(400).json({ message: error.message });
	}
};

export const loginUser = async (req, res) => {
	try {
		const { email, password } = req.body;
		const user = await User.findOne({ email });

		if (!user || user.password !== password) {
			return res.status(401).json({ message: "Invalid email or password." });
		}

		const token = jwt.sign(
			{ _id: user._id, email: user.email, isAdmin: user.isAdmin },
			process.env.JWT_SECRET
		);

		res.json({ token });
	} catch (error) {
		res.status(400).json({ message: error.message });
	}
};

export const getUserProfile = async (req, res) => {
	try {
		const user = await User.findById(req.user._id).select("-password");
		res.json(user);
	} catch (error) {
		res.status(404).json({ message: "User not found." });
	}
};

export const updateUserProfile = async (req, res) => {
	try {
		const user = await User.findById(req.user._id);

		if (!user) {
			return res.status(404).json({ message: "User not found." });
		}

		const { fname, lname, email, password, dob, imgProfile } = req.body;

		// Update fields
		if (fname) user.fname = fname;
		if (lname) user.lname = lname;
		if (email) user.email = email;
		if (password) user.password = password;
		if (dob) user.dob = dob;
		if (imgProfile) user.imgProfile = imgProfile;

		await user.save();

		res.json({ message: "Profile updated successfully." });
	} catch (error) {
		res.status(400).json({ message: error.message });
	}
};
