import express from 'express';
import { addToCart, fetchCartItems, cartItemQuantity, deleteCartItem } from '../../controllers/shop/cart-controller.js';

const router = express.Router();

router.post("/add", addToCart);
router.get("/get/:userId", fetchCartItems);
router.put("/updateCart", cartItemQuantity);
router.delete("/:userId/:productId", deleteCartItem);

export default router;
