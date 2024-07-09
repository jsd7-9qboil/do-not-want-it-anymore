import express from "express";
import {
  getCarts,
  getCartById,
  createCart,
  updateCart,
  deleteCart,
} from "../controllers/cartController.js";

const router = express.Router();

// Cart route
router.get("/carts", getCarts);
router.get("/carts/:id", getCartById);
router.post("/carts/create", createCart);
router.patch("/carts/:id/items/:productId", updateCart);
router.delete("/carts/:id/items/:productId", deleteCart);

export default router;
