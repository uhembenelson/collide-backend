import express from "express"; 
import User from "../../models/User.js";
import bcrypt from "bcrypt"; 


import pkg from 'jsonwebtoken'; 
import { PasswordCorrect } from "../../utils/index.js";
import asyncHandler from "express-async-handler"




export const Login =   asyncHandler(async (req, res,next) => {
    
    const jwt = pkg; 
    const { email, password } = req.body; 
    
        //check if user with email already exists
        const userExists = await User.findOne( {email} ); 
        if(!userExists){
            res.status(404);
            throw new Error("user does not exist!!!"); 
         
        } 
        //check if password is correct 
        const passwordCorrect = await PasswordCorrect(password, userExists)
        if (passwordCorrect){
            const user = {
                data: userExists
            }
            const accessToken = jwt.sign({ user: user}, 'eking@590', {
                expiresIn: '1h'
            }) 
            return res.status(200).send({
                msg: "Login Successful", 
                accessToken
            })
        } 
        if(!passwordCorrect) {
            res.status(404);
           throw new Error("Incorrect password ")
        }
    
        throw new Error("Something went Wrong!!!"); 
    }
)    