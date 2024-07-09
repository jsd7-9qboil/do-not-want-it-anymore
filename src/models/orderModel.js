import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
	{
		userId: {
            type: mongoose.Schema.Types.ObjectId,
			ref: "User",
			required: true,
		},
		date: {
			type: String,
			required: true,
		},
		productId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Product",
            required: true,
	
		},
		price: {
			type: Number,
			required: true,
		},

		totalAmount: {
			type: Number,
            required: true,
		},
		shippingAddress: {
			type: String,
            required: true,
		},
	},
	{ timestamps: true }
);

const Order = mongoose.model("Order", orderSchema);

export default Order;