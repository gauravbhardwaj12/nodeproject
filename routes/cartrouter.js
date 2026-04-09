import express from "express"
import cart from "../models/cart.js";
import products from "../models/product.js";
import auth from "../middleware/auth.js";

const cartrouter=express.Router();
cartrouter.use(auth);

cartrouter.post("/",async (req,res)=>{
    const userId = req.user.id;
    const { product, quantity } = req.body;
   // const {id,quantity}=req.body;
   const existingProduct = await products.findById(product);
   if (!existingProduct) {
      return res.status(404).json({ error: "Product not found" });
    }
    let cartuser = await cart.findOne({ user: userId });
    if (!cartuser) {
      cartuser = new cart({ user: userId, items: [] });
    }
    // check if product already in cart
    const item = cartuser.items.find(
      i => i.product.toString() === product
    );
    if (item) {
      item.quantity += quantity; // increase quantity
    } else {
      cartuser.items.push({ product, quantity });
    }
    await cartuser.save();
    res.json({ message: "Item added to cart", cartuser });


});

// PUT /cart/:id → Update quantity
cartrouter.put('/:id', async (req, res) => {
  
    const userId = req.user.id;
    const { quantity } = req.body;

    const cartuser = await cart.findOne({ user: userId });
    if (!cartuser) {
        return res
        .status(404)
        .json({ error: "Cart not found" });
    }

    const item = cartuser.items.id(req.params.id);
    
    if (!item) 
        {
            return res
            .status(404)
            .json({ error: "Item not found" });
        }

    item.quantity = quantity;

    await cartuser.save();

    res.json({ message: "Cart updated", cart });

 
});

// DELETE /cart/:id → Remove item
cartrouter.delete('/:id', async (req, res) => {
  try {
    const userId = req.user.id;

    const cartuser = await cart.findOne({ user: userId });
    if (!cartuser) return res.status(404).json({ error: "Cart not found" });

    const initialLength = cartuser.items.length;
    cartuser.items = cartuser.items.filter(
      i => i.product.toString() !== req.params.id.toString()
    );

    if (cartuser.items.length === initialLength) {
      return res.status(404).json({ error: "Item not found" });
    }


    await cartuser.save();

    res.json({ message: "Item removed", cart });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


export default cartrouter;
