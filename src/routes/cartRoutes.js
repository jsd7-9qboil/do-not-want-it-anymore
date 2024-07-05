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
router.patch("/carts/:Id/items/:id", updateCartItem);
router.delete("/carts/:Id/items/:id", deleteProductFromCart);

export default router;
