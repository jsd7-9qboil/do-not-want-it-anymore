import jwt from "jsonwebtoken";

export const generateToken = (user) => {
	return jwt.sign(
		{
			id: user._id,
			email: user.email,
			isAdmin: user.isAdmin, // เพิ่ม isAdmin ลงใน payload
		},
		process.env.JWT_SECRET,
		{ expiresIn: "1h" }
	);
};
