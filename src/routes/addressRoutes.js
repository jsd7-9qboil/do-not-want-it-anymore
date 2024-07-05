import express from "express";
import {
	createAddress,
	getAddresses,
	editAddress,
	deleteAddress,
} from "../controllers/addressController.js";

const router = express.Router();

router.post("/users/address", createAddress);
router.get("/users/address", getAddresses);
router.patch("/users/address/:id", editAddress);
router.delete("/users/address/:id", deleteAddress);

export default router;
