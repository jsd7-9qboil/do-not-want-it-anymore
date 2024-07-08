import User from "../models/userModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

const secret = process.env.JWT_SECRET;

export const registerAdmin = async (req, res) => {
	try {
		const { fname, lname, email, password } = req.body;

		const existingUser = await User.findOne({ email });
		if (existingUser) {
			return res.status(400).json({ message: "Admin already exists" });
		}

		const hashedPassword = await bcrypt.hash(password, 12);

		const newUser = new User({
			fname,
			lname,
			email,
			password: hashedPassword,
			isAdmin: true,
		});
		await newUser.save();

		res.status(201).json(newUser);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

export const loginAdmin = async (req, res) => {
	try {
		const { email, password } = req.body;

		const user = await User.findOne({ email, isAdmin: true });
		if (!user) {
			return res.status(404).json({ message: "Admin not found" });
		}

		const isPasswordCorrect = await bcrypt.compare(password, user.password);
		if (!isPasswordCorrect) {
			return res.status(400).json({ message: "Invalid credentials" });
		}

		const token = jwt.sign({ id: user._id, isAdmin: user.isAdmin }, secret, {
			expiresIn: "1h",
		});

		res.status(200).json({
			token,
			user: { id: user._id, email: user.email, isAdmin: user.isAdmin },
		});
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};
