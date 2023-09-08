import express from "express"; 
import User from "../../models/User.js"; 

import { hashPassword, welcomeEmail } from "../../utils/index.js";

import bcrypt from "bcrypt"; 
import asyncHandler from "express-async-handler"

export const Register = asyncHandler(async (req, res) => {
    const { firstName, lastName, email, phoneNumber } = req.body; 

    const apiKey = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15); 
    const password = await hashPassword(req.body.password); 
    const user = new User({ firstName, lastName, email, phoneNumber, password}) 
    try {
        //check if user with email already exists 
        const userExists = await User.findOne( { email }); 
        if(userExists){
            console.log(userExists)
            return res.status(201).send({ msg: "user Already exist"})
        }
        //save user to database 
        await user.save(); 
        
        //send Welcome email here 
        welcomeEmail(user.email, user.firstName); 
        const data = user 
        res.status(201).send({
            data: data, 
            msg: "Register/SignUp SUCCESSFUL!!!!"
        })
    } catch (error) {
        console.log("there is an error", error); 
        res.status(400).send(error); 
    }
}) 