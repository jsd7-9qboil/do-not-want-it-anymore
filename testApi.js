import axios from "axios";
import dotenv from "dotenv";

// Load environment variables from .env file
dotenv.config();

const token = "pRQKsLMh8fp5/nnXnD7CToFdGciRgpca8OkW5EYTNgk";

const testApi = async () => {
	try {
		const response = await axios.get("http://localhost:5555/api/user/profile", {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});
		console.log(response.data);
	} catch (error) {
		console.error(
			"Error accessing API:",
			error.response ? error.response.data : error.message
		);
	}
};

testApi();
