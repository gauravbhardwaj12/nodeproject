import express from "express";
import mongoose from "mongoose";
import productsrouter from "./routes/productsrouter.js";
import userRouter from "./routes/usersrouter.js";
import cartrouter from "./routes/cartrouter.js";
const app=express();
app.use(express.json());
let products=[{
    "id":1,
    "title":"washing machine",
    "price":89
}];
let cart = [];

app.listen(3100,()=>{
    console.log("server is running");
})
mongoose.connect("mongodb://localhost:27017/shoppyglobe");
const db=mongoose.connection;
db.on("open",()=>{
    console.log("successfull connection");
});
db.on("error",()=>{
    console.log("error in connection");
})

app.use("/",userRouter);
app.use("/products",productsrouter);
app.use("/cart",cartrouter);


