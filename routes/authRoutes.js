import { register,login,updateUser } from "../controllers/authController.js";
import express from "express";
import authenticateUser from "../middleware/auth.js";
const router = express.Router();

// rate limitor 
import rateLimit from 'express-rate-limit';
const authlimter = rateLimit({
    windowMs: 15 * 60 *1000 ,//15 mints
    max: 10, // limit each Ip to 100 requests per 'window',
    message: 'Too many request from this ip, please try again after 15 mins',
    standardHeaders: true,
    legacyHeaders: false,
})


// Then inject the rate-limit api into the post requests
router.route('/register').post(authlimter,register)
router.route('/login').post(authlimter,login)

router.route('/updateUser').patch(authenticateUser, updateUser)

export default router
