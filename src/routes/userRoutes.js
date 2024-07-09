import express from "express";
import {
	registerUser,
	loginUser,
	getUserProfile,
	updateUserProfile,
} from "../controllers/userController.js";
import { registerAdmin, loginAdmin } from "../services/userService.js";
import { authMiddleware } from "../middleware/authMiddleware.js";
const router = express.Router();

// User routes
router.get("/users", authMiddleware, getUsers);
router.get("/user/:id", authMiddleware, getUserById);
router.patch("/users/edit-profile/:id", authMiddleware, editProfile);
router.post("/users/sign-up", createUser); // No auth required for sign-up
router.delete("/users/:id", authMiddleware, deleteUser);

// Admin routes
router.post("/admin/sign-up", registerAdmin); // No auth required for admin sign-up
router.post("/admin/sign-in", loginAdmin); // No auth required for admin sign-in

export default router;
