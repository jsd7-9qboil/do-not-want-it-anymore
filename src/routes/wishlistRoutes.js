import express from "express";
import {
	addWishlistItem,
	getUserWishlists,
	deleteWishlistItem,
} from "../controllers/wishlistController.js";

const router = express.Router();

// ดึงข้อมูล wishlists ทั้งหมดของผู้ใช้
router.get("/users/:id/wishlists", getUserWishlists);

// เพิ่ม wishlist item ใหม่สำหรับผู้ใช้
router.post("/users/:id/wishlists", addWishlistItem);

// ลบ wishlist item
router.delete("/users/wishlists/:id", deleteWishlistItem);

export default router;
