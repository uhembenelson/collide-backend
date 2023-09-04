import bcrypt from "bcrypt"; 
import User from "../models/User.js"; 
import fetch from "node-fetch"; 


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