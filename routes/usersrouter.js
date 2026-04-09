import express from "express";
import jwt from 'jsonwebtoken';
import user from "../models/user.js";

const userRouter=express.Router();

const SECRET="mysecretkey";
userRouter.post('/register',async (req,res)=>{
    const {name,email,password}=req.body;

    //check if user exist

    const existingUser= await user.findOne({email});
    if(existingUser){
        return res
        .status(400)
        .json({error:"User already exists"});
    }
    else{
        const newuser=new user({name,email,password});
        await newuser.save();
        res.json({message:"user registerd successfullly"});
    }
});

userRouter.post('/login',async (req,res)=>{
    const {email,password} =req.body;

    // find user

    const getuser=await user.findOne({email});
    if(!getuser){
        return res.status(400).json({ error: "Invalid email" });
    }
    console.log(getuser);
    
    if(getuser.password !==password){
        return res.status(400).json({ error: "Invalid password" });
    }

    // create JWT token
    const token=jwt.sign({id:user._id},SECRET);
    res.json({token});

})

export default userRouter;