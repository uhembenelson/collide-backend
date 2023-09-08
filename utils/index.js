import bcrypt from "bcrypt"; 
import User from "../models/User.js"; 
import fetch from "node-fetch"; 
import nodemailer from "nodemailer"; 
import { Register } from "../controllers/Users/register.js"; 
import path from 'path'; 
import { fileURLToPath } from "url";

import ejs from 'ejs'; 

//create/import the directory path 
const __filename = fileURLToPath(import.meta.url); 
const __dirname = path.resolve(); 


//hash password 
export const hashPassword = async (password) => {
    const salt = await bcrypt.genSalt(12); 
    const hashedPassword = await bcrypt.hash(password, salt); 
    return hashedPassword; 
} 

//check if password is coorect 
export const PasswordCorrect = async (password, userExists) => {
    const passwordCorrect = await bcrypt.compare(password, userExists.password)
    return passwordCorrect; 
}

//send welcome email 
export const welcomeEmail = async(email, firstName) => {
    const transporter = nodemailer.createTransport({
        host: 'smtp.zoho.com', 
        port: 465, 
        secure: true, 
        auth: {
            user: 'welcome@borrowlite.com', 
            pass: 'Mayorgnn@088'
        }, 
        tls: 587
    }); 
    //call the user.firstName 
    const firstname = firstName; 
    //rendering the email in ejs format attaching the firstname 
    const data = await ejs.renderFile(__dirname + "/views/email.ejs", {name: firstname})
    
    const mailOptions = {
        from: '<welcome@borrowlite.com>', 
        to: email, 
        subject: 'Welcome to LMS', 
        html: data
    }; 
    transporter.sendMail(mailOptions, function(error, info){
        if(error){
            console.log(error); 
        }else {
            console.log('Email sent' + info.response); 
        }
    })
}
