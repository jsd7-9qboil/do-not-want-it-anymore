import Address from "../models/addressModel.js";

// Create a new address
export const createAddress = async (req, res) => {
	try {
		const newAddress = new Address(req.body);
		await newAddress.save();
		res.status(201).json(newAddress);
	} catch (error) {
		res.status(400).json({ message: error.message });
	}
};

// Get all addresses
export const getAddresses = async (req, res) => {
	try {
		const addresses = await Address.find();
		res.status(200).json(addresses);
	} catch (error) {
		res.status(400).json({ message: error.message });
	}
};

// Get all addresses and users
export const getUsers = async (req, res) => {
	try {
		const addresses = await User.aggregate([
			{
				$lookup: {
					from: "users",
					localField: "_id",
					foreignField: "address_id",
					as: "users",
				},
			},
		]);
		res.status(200).json(addresses);
	} catch (error) {
		res.status(400).json({ message: error.message });
	}
};

// Update address
export const editAddress = async (req, res) => {
	try {
		const { id } = req.params;
		const updatedAddress = await Address.findByIdAndUpdate(id, req.body, {
			new: true,
			runValidators: true,
		});

		if (!updatedAddress) {
			return res
				.status(404)
				.json({ message: `Address with id ${id} not found` });
		}

		res.status(200).json(updatedAddress);
	} catch (error) {
		res.status(400).json({ message: error.message });
	}
};

export const getAddress = async (req, res) => {
  try {
    const address = await Address.findById(req.params.id);
    if (!address) {
      return res.status(404).json({ message: "Address not found." });
    }
    res.json(address);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
