import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
<<<<<<< HEAD
import { authMiddleware } from "./middleware/authMiddleware.js";
import { errorHandler, notFound } from "./error/UnAuthorizeError.js"; // Import error handlers

// Routes
=======
// import middleware
import errorMiddleware from "./middleware/errorMiddleware.js";
// import routes
>>>>>>> naay
import userRoutes from "./routes/userRoutes.js";
import addressRoutes from "./routes/addressRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import addressRoutes from "./routes/addressRoutes.js";
import whislistRoutes from "./routes/wishlistRoutes.js";

dotenv.config();
connectDB();

const PORT = process.env.PORT || 5555;
const app = express();

app.use(cors({ origin: "*" }));
app.use(express.json());

// Uncomment the line below if you want to apply auth middleware globally
app.use(authMiddleware);

// Routes
app.use("/api", userRoutes);
app.use("/api", productRoutes);
app.use("/api", addressRoutes);
app.use("/api", whislistRoutes);

// Error handlers
app.use(notFound);
app.use(errorHandler);

app.listen(port, () => {
	console.log(`Server is running on port: ${port} 🍀`);
});
