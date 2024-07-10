// loginAndGetToken.js

import axios from "axios";
import dotenv from "dotenv";

// Load environment variables from .env file
dotenv.config();

const login = async () => {
	try {
		const response = await axios.post("http://localhost:5555/api/login", {
			email: "naay@example.com",
			password: "password123",
		});

		const token = response.data.token;
		console.log("Token:", token);

		return token;
	} catch (error) {
		console.error(
			"Error logging in:",
			error.response ? error.response.data : error.message
		);
	}
};

login();
