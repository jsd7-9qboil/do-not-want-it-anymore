import Cart from "../models/cartModel.js";
import Product from "../models/productModel.js";

// Get all cart //
export const getCarts = async (req, res) => {
  try {
    const carts = await Cart.find();
    res.status(200).json(carts);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get cart by ID //
export const getCartById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const cart = await Cart.findById(id);
    if (!cart) {
      return res.status(404).json({ message: `Cart with id ${id} not found` });
    }
    res.status(200).json({ message: "Get Cart By ID", data: cart });
  } catch (error) {
    next(error);
  }
};

// Create cart //

export const createCart = async (req, res) => {
  try {
    const { productId, quantity } = req.body; // Destructure data from req.body
    const cart = new Cart({ productId, quantity }); // Create new Cart instance with destructured data
    await cart.save();
    res.status(201).json(cart);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// export const createCart = async (req, res) => {
//   try {
//     const { productId, quantity } = req.body;
//     if (!productId || !quantity) {
//       return res
//         .status(400)
//         .json({ message: "ProductId and quantity are required" });
//     }
//     const product = await Product.findById(productId);
//     if (!product) {
//       return res.status(404).json({ message: "Product not found" });
//     }
//     const cart = new Cart({ productId, quantity });
//     await cart.save();
//     res.status(201).json(cart);
//   } catch (error) {
//     res.status(400).json({ message: error.message });
//   }
// };



// Update Cart by id

export const updateCart = async (req, res) => {
  try {
    const cart = await Cart.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }
    res.status(200).json(cart);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};






// Delete Cart by id
export const deleteCart = async (req, res, next) => {
  try {
    const { id } = req.params;

    const cart = await Cart.findByIdAndDelete(id);
    if (!cart) {
      return res.status(404).json({ message: `Cart with id ${id} not found` });
    }

    res.status(200).json({ message: "Cart deleted", data: cart });
  } catch (error) {
    next(error);
  }
};
