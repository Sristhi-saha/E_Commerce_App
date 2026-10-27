import Cart from "../../models/Cart.models.js";
import Product from "../../models/Products.models.js";


export const addToCart = async (req, res) => {
    try {
        // STEP 1: Grab userId, productId, quantity from req.body
        const { userId, productId, quantity } = req.body;
        // STEP 2: Validation check (if missing, return res.status(400))
        if (!userId || !productId || !quantity) {
            return res.status(400).json({
                success: false,
                message: "Must provide the details"
            })
        }
        // STEP 3: Verify the product exists in DB using Product.findById()
        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({
                "message": "product not found!"
            })
        }
        // STEP 4: Check if this user already has a cart using Cart.findOne()
        let cartExists = await Cart.findOne({ userId });
        // STEP 5: Handle Scenario A (No cart) vs Scenario B (Cart exists)
        if (!cartExists) {
            cartExists = new Cart({
                userId,
                items: [{ productId, quantity }]
            })

            cartExists.save();
        } else {

            // Hint for Scenario B: You can use cart.items.findIndex(...)
            const productIndex = cartExists.items.findIndex(
                (item) => item.productId.toString() === productId
            );

            if (productIndex == -1) {
                cartExists.items.push({ productId, quantity });
            } else {
                cartExists.items[productIndex].quantity += quantity;
            }
        }

        cartExists.save();
        return res.status(200).json({
            success: true,
            data: cartExists,
        })
    } catch (e) {
        console.error(e);
        return res.status(500).json({
            success: false,
            message: "Error adding to cart"
        })
    }
}

export const fetchCartItems = async (req, res) => {
    try {
        // STEP 1: Grab userId from req.params
        const { userId } = req.params;
        // STEP 2: Validate userId (return 400 if missing)
        if (!userId) {
            return res.status(400).json({
                success: false,
                message: "user not found"
            })
        }
        // STEP 3: Find the cart for this user AND populate "items.productId"
        const carts = await Cart.findOne({ userId }).populate({
            path: "items.productId",
            select: "image title price salePrice totalStock"
        })

        if (!carts) {
            return res.status(200).json({
                success: true,
                data: { items: [] }
            })
        }
        // Filter out the ghost items:
        const validItems = carts.items.filter((item) => { return item.productId !== null });

        // If we found any ghost items, clean up the database:
        if (validItems.length < carts.items.length) {
            carts.items = validItems;
            await carts.save();
        }

        return res.status(200).json({
            success: true,
            data: carts,
        })

    } catch (e) {
        return res.status(400).json({
            success: false,
            message: "Cart fetching Error"
        })
    }
}

export const cartItemQuantity = async (req, res) => {
    try {
        const { productId, userId, quantity } = req.body;
        if (!productId || !userId || quantity <= 0) {
            return res.status(400).json({
                success: false,
                message: "Required fields are missing"
            })
        }
        // STEP 3: Verify the product exists in DB using Product.findById()
        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({
                "message": "product not found!"
            })
        }
        const carts = await Cart.findOne({ userId });
        const productIndex = carts.items.findIndex((item) => item.productId.toString() === productId);
        if (productIndex !== -1) {
            carts.items[productIndex].quantity =quantity;
        }else{
            return res.status(404).json({
                success: false,
                message: "Item not present in the cart",
            });
        }
        await carts.save();
        await carts.populate({
            path:"items.productId",
            select: "image title price salePrice totalStock",
        })
        return res.status(200).json({
            statu:true,
            data:carts
        })

    } catch (e) {
        return res.status(500).json({
            success: false,
            message: "error in updating quantity"
        })
    }
}

export const deleteCartItem = async (req, res) => {
  try {
    const { userId, productId } = req.params;

    if (!userId || !productId) {
      return res.status(400).json({
        success: false,
        message: "Required fields are missing",
      });
    }

    const carts = await Cart.findOne({ userId });

    if (!carts) {
      return res.status(404).json({
        success: false,
        message: "Cart not found",
      });
    }

    // Filter out the item to delete:
    carts.items = carts.items.filter(
      (item) => item.productId.toString() !== productId
    );

    await carts.save();

    await carts.populate({
      path: "items.productId",
      select: "image title price salePrice totalStock",
    });

    return res.status(200).json({
      success: true,
      data: carts,
    });
  } catch (e) {
    console.error(e);
    return res.status(500).json({
      success: false,
      message: "Cart item delete failed",
    });
  }
};

