import {
	registerAdminService,
	loginAdminService,
} from "../services/adminService.js";
import { generateToken } from "../utils/tokenUtils.js";

export const registerAdmin = async (req, res) => {
	try {
		const { fname, lname, email, password } = req.body;

		const admin = await registerAdminService({
			fname,
			lname,
			email,
			password,
			isAdmin: true,
		});
		const token = generateToken(admin);
		res.status(201).json({ token });
	} catch (error) {
		res.status(400).json({ message: error.message });
	}
};

export const loginAdmin = async (req, res) => {
	try {
		const { email, password } = req.body;
		const admin = await loginAdminService(email, password);

		if (!admin) {
			return res.status(404).json({ message: "Admin not found" });
		}

		const token = generateToken(admin);
		res.status(200).json({ token });
	} catch (error) {
		res.status(400).json({ message: error.message });
	}
};
