import mongoose from "mongoose";

const cartSchema = new mongoose.Schema(
  {
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    quantity: {
<<<<<<< HEAD
      type: Number,
=======
      type: Number, 
>>>>>>> 18985ec56f6b37338b6ff27f9350d0f23e70dbad
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);


const Cart = mongoose.model("Cart", cartSchema);

export default Cart;
