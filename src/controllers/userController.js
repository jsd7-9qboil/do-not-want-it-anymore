import User from "../models/userModel.js";
import jwt from "jsonwebtoken";

//TODO specifically admin can register admin role, other user can not!!!

export const registerUser = async (req, res) => {
  try {
    const { fname, lname, email, password, dob, isAdmin } = req.body;

    const user = new User({ fname, lname, email, password, dob, isAdmin });
    await user.save();

    const token = jwt.sign(
      { _id: user._id, email: user.email, isAdmin: user.isAdmin },
      process.env.JWT_SECRET
    );

    res.status(201).json({ token });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get user by ID with their addresses
export const getUserById = async (req, res, next) => {
	try {
		const { id } = req.params;
		const user = await User.aggregate([
			{
				$match: { _id: mongoose.Types.ObjectId(id) },
			},
			{
				$lookup: {
					from: "addresses",
					localField: "_id",
					foreignField: "customer_id",
					as: "addresses",
				},
			},
		]);

		if (!user.length) {
			return res.status(404).json({ message: `User with id ${id} not found` });
		}

		res.status(200).json(user[0]);
	} catch (error) {
		next(error);
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

		res.status(200).json(updatedUser);
	} catch (error) {
		res.status(400).json({ message: error.message });
	}
};

// Delete User
export const deleteUser = async (req, res, next) => {
	try {
		const { id } = req.params;
		const deletedUser = await User.findByIdAndDelete(id);

		if (!deletedUser) {
			return res.status(404).json({ message: `User with id ${id} not found` });
		}

		// Remove all addresses associated with the user
		await Address.deleteMany({ customer_id: id });

		res.status(200).json({ message: `User with id ${id} has been deleted` });
	} catch (error) {
		res.status(400).json({ message: error.message });
	}
};
