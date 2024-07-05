import Cart from "../models/cartModel.js";
import Product from "../models/productModel.js";

// Get all cart
export const getCarts = async (req, res) => {
  try {
    const carts = await Cart.find();
    res.status(200).json(carts);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get cart by ID
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

// Create cart
export const createCart = async (req, res) => {
  try {
    const { productId, quantity, price } = req.body; // Destructure data from req.body
    const cart = new Cart({ productId, quantity, price }); // Create new Cart instance with destructured data
    await cart.save();
    res.status(201).json(cart);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

//Update Product in Cart
export const updateCartItem = async (req, res) => {
  const { cartId, productId, quantity } = req.body;

  try {
    // ตรวจสอบว่า cartId และ productId ถูกส่งมาหรือไม่
    if (!cartId || !productId) {
      return res
        .status(400)
        .json({ message: "cartId and productId are required" });
    }

    // ตรวจสอบว่าสินค้าและตะกร้ามีอยู่จริงหรือไม่
    const cart = await Cart.findById(cartId);
    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // ตรวจสอบว่ามีสินค้านี้ในตะกร้าหรือยัง
    let item = cart.items.find((item) => item.productId == productId);

    if (!item) {
      return res.status(404).json({ message: "Product not found in cart" });
    }

    // อัปเดตจำนวนสินค้าในตะกร้า
    item.quantity = quantity;

    // บันทึกการเปลี่ยนแปลงลงในฐานข้อมูล
    await cart.save();

    // ส่งคืนข้อมูลหลังการอัปเดตสำเร็จ
    res.status(200).json({ message: "Cart updated successfully", cart });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Delete product from cart
export const deleteProductFromCart = async (req, res) => {
  const { cartId, productId } = req.body;

  try {
    // ตรวจสอบว่า cartId และ productId ถูกส่งมาหรือไม่
    if (!cartId || !productId) {
      return res
        .status(400)
        .json({ message: "cartId and productId are required" });
    }

    // ค้นหาตะกร้า
    const cart = await Cart.findById(cartId);
    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    // ตรวจสอบว่าสินค้ามีอยู่ในตะกร้าหรือไม่
    const productIndex = cart.items.findIndex(
      (item) => item.productId == productId
    );
    if (productIndex === -1) {
      return res.status(404).json({ message: "Product not found in cart" });
    }

    // ลบสินค้าออกจากตะกร้า
    cart.items.splice(productIndex, 1);

    // บันทึกการเปลี่ยนแปลง
    await cart.save();

    // ส่งคืนข้อมูลหลังการลบสำเร็จ
    res
      .status(200)
      .json({ message: "Product deleted from cart successfully", cart });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
