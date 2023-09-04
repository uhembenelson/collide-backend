import express from 'express'; 
const router = express.Router(); 
import { Register } from '../controllers/Users/register.js';
import { Login } from '../controllers/Users/login.js';
import { CurrentUser } from '../controllers/Users/currentUser.js';
import { ValidateToken } from '../middleware/ValidateToken.js';




//create user 
router.post("/api/v1/register", Register); 


//login user 
router.post("/api/v1/login", Login); 


//get current user info 
router.get("/api/v1/current-user",ValidateToken, CurrentUser); 

export { router as userRoute }