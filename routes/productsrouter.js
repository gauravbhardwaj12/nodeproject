import express from "express";
import product from "../models/product.js";
const productrouter=express.Router();

productrouter.get("/",async (req,res)=>{
    const products = await product.find();
    if(!products){
        return res.send(400)
        .json({ error:"no product you have" })
    }
    res.send(products);
})
productrouter.get("/:id",async (req,res)=>{
    const products = await product.find();
    const id=req.params.id;
    const productdata=products.find((product)=>product.id==id);
    if(!productdata){
        return res
        .status(400)
        .json({"error":"no product exist with this id"});
    }
    res.send(productdata);
});
productrouter.post("/",async (req,res)=>{
const {name,description,price,stock} = req.body;
const newproduct=new product({name,description,price,stock});
await newproduct.save();
res.json({
    message:"product created",
    newproduct
});
});
export default productrouter;