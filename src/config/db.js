import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const connectDB = async () => {
	try {
		await mongoose.connect(process.env.MONGODB_URI);
		console.log("Connected to MongoDB 🟢");
	} catch (error) {
		console.error("Database connection error:", error);
		process.exit(1); // Exit process with failure
	}
};

export default connectDB;
