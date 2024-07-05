import mongoose from "mongoose";

const { Schema } = mongoose;

const wishlistSchema = new Schema({
	product_id: { type: Schema.Types.ObjectId, ref: "Product", required: true },
	customer_id: { type: Schema.Types.ObjectId, ref: "Customer", required: true },
});

const Wishlist = mongoose.model("Wishlist", wishlistSchema);

export default Wishlist;
