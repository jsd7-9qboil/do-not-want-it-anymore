import Wishlist from "../models/wishlistModel.js";

// Get all wishlists for a user
export const getUserWishlists = async (req, res) => {
	try {
		const userId = req.params.id;
		const wishlists = await Wishlist.find({ customer_id: userId }).populate(
			"product_id"
		);
		res.status(200).json(wishlists);
	} catch (error) {
		res
			.status(500)
			.json({ error: "An error occurred while fetching the wishlists" });
	}
};

// Add a new wishlist item for a user
export const addWishlistItem = async (req, res) => {
	try {
		const userId = req.params.id;
		const { product_id } = req.body;
		const newWishlistItem = new Wishlist({
			product_id,
			customer_id: userId,
		});
		await newWishlistItem.save();
		res.status(201).json(newWishlistItem);
	} catch (error) {
		res
			.status(500)
			.json({ error: "An error occurred while adding the wishlist item" });
	}
};

// Delete a wishlist item
export const deleteWishlistItem = async (req, res) => {
	try {
		const wishlistId = req.params.id;
		await Wishlist.findByIdAndDelete(wishlistId);
		res.status(200).json({ message: "Wishlist item deleted successfully" });
	} catch (error) {
		res
			.status(500)
			.json({ error: "An error occurred while deleting the wishlist item" });
	}
};
