import User from "../models/userModel.js";

const userService = {
	async createUser(data) {
		const user = new User(data);
		await user.save();
		return user;
	},

	async getUsers() {
		return User.find();
	},

	async getUserById(id) {
		return User.findById(id);
	},

	async getUserByEmail(email) {
		return User.findOne({ email });
	},

	async updateUser(id, data) {
		return User.findByIdAndUpdate(id, data, { new: true });
	},

	async deleteUser(id) {
		return User.findByIdAndDelete(id);
	},
};

export default userService;
