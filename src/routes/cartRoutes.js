import express from "express";
import {
    getCarts,
    getCartById,
    createCart,
    updateCartItem,
    deleteProductFromCart,
} from "../controllers/cartController.js";

const router = express.Router();

// Cart route
router.get("/carts", getCarts);
router.get("/carts/:id", getCartById);
router.post("/carts/create", createCart);
router.patch("/carts/:cartId/items/:productId", updateCartItem); 
router.delete("/carts/:cartId/items/:productId", deleteProductFromCart);

export default router;
