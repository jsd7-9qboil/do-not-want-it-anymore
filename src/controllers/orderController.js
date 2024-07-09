import Order from "../models/orderModel.js";
import User from "../models/userModel.js";
import Product from "../models/productModel.js";

// Get all orders
export const getAllOrders = async (req, res, next) => {
  try {
    const orders = await Order.find();
    res.status(200).json(orders);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get order by ID
export const getOrderById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const order = await Order.findById(id);
    if (!order) {
      return res.status(404).json({ message: `Order with id ${id} not found` });
    }
    res.status(200).json({ message: "Get order by ID", data: order });
  } catch (error) {
    next(error);
  }
};

// Create order
export const createOrder = async (req, res, next) => {
  try {
    const { userId, date, productId, price, totalAmount, shippingAddress } =
      req.body;
    const order = new Order({
      userId,
      date,
      productId,
      price,
      totalAmount,
      shippingAddress,
    });
    await order.save();
    res.status(201).json(order);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Find the cart by ID
//     const cart = await Cart.findById(cartId);
//     if (!cart) {
//       return res
//         .status(404)
//         .json({ message: `Cart with id ${cartId} not found` });
//     }

//     // Find the user
//     const user = await User.findById(cart.userId);
//     if (!user) {
//       return res
//         .status(404)
//         .json({ message: `User with id ${cart.userId} not found` });
//     }

//     // Fetch product details and calculate total price
//     const products = await Promise.all(
//       cart.productId.map(async (item) => {
//         const product = await Product.findById(item.productId);
//         if (!product) {
//           throw new Error(`Product with id ${item.productId} not found`);
//         }
//         return {
//           productId: item.productId,
//           quantity: item.quantity,
//           price: product.price,
//           total: product.price * item.quantity,
//         };
//       })
//     );

//     const total = products.reduce((sum, item) => sum + item.total, 0);

//     // Create a new order
//     const order = new Order({
//       userId: cart.userId,
//       products: cart.productId,
//       total,
//     });

//     await order.save();

//     // Optionally, you might want to clear the cart after creating an order
//     await Cart.findByIdAndDelete(cartId);

//     res.status(201).json({ message: "Order created from cart", data: order });
//   } catch (error) {
//     next(error);
//   }
// };




// Update an order by id
export const updateOrder = async (req, res) => {
  try {
    const order = await Order.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }
    res.status(200).json(order);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// export const updateOrder = async (req, res, next) => {
//   try {
//     const { id } = req.params;
//     const updates = req.body;

//     const order = await Order.findByIdAndUpdate(id, updates, { new: true });
//     if (!order) {
//       return res.status(404).json({ message: `Order with id ${id} not found` });
//     }

//     res.status(200).json({ message: "Order updated", data: order });
//   } catch (error) {
//     next(error);
//   }
// };

// Delete an order by id
export const deleteOrder = async (req, res, next) => {
  try {
    const { id } = req.params;

    const order = await Order.findByIdAndDelete(id);
    if (!order) {
      return res.status(404).json({ message: `Order with id ${id} not found` });
    }

    res.status(200).json({ message: "Order deleted", data: order });
  } catch (error) {
    next(error);
  }
};
