import Address from "../models/addressModel.js";
import mongoose from "mongoose";

export const addAddress = async (req, res) => {
	try {
		const {
			customer_id,
			address_line1,
			address_line2,
			postcode,
			province,
			district,
			subdistrict,
		} = req.body;

		const address = new Address({
			customer_id,
			address_line1,
			address_line2,
			postcode,
			province,
			district,
			subdistrict,
		});
		await address.save();

		res.status(201).json(address);
	} catch (error) {
		res.status(400).json({ message: error.message });
	}
};

export const getAddress = async (req, res) => {
	try {
		const address = await Address.aggregate([
			{
				$match: { _id: new mongoose.Types.ObjectId(req.params.id) },
			},
			{
				$lookup: {
					from: "users",
					localField: "customer_id",
					foreignField: "_id",
					as: "customer",
				},
			},
			{
				$unwind: "$customer",
			},
			{
				$project: {
					_id: 1,
					address_line1: 1,
					address_line2: 1,
					postcode: 1,
					province: 1,
					district: 1,
					subdistrict: 1,
					customer: {
						_id: 1,
						fname: 1,
						lname: 1,
						email: 1,
						dob: 1,
						imgProfile: 1,
					},
				},
			},
		]);

		if (!address || address.length === 0) {
			return res.status(404).json({ message: "Address not found." });
		}
		res.json(address[0]);
	} catch (error) {
		res.status(400).json({ message: error.message });
	}
};
