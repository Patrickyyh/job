
import User from "../models/User.js"
import { StatusCodes } from "http-status-codes";
import {BadRequestError,NotFoundError} from "../errors/index.js";


const register =  async (req,res) => {

    /**
     * Using the new method, we could get rid of the 
     * try and catch block by using the 'express-async-errors' in the controller
     */

    const {email,password, name} = req.body; 
    if(!email || !password || !name){
        throw new BadRequestError('please provide all values'); 
    }

    const userAlreadyExists = await User.findOne({email});
    if(userAlreadyExists){
        throw new BadRequestError('Email already in Use');
    }
    
    const user = await User.create({email,password, name});
    
    // invoke the build in function. 
    const token = user.createJWT();
    res.status(StatusCodes.OK).json({
        user:{
            email: user.email,
            lastName: user.lastName,
            location: user.location,
            name: user.name,
        }
        ,token});
}

const login = async (req,res) => {
    res.send('login user')
}

const updateUser =  async (req,res) => {
    res.send('update user');
     
}

export {register,login,updateUser}