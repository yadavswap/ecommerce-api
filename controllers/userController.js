import User from "../models/User.js"
import asyncHandler from "express-async-handler"
import bcrypt from "bcryptjs"
import generateToken from "../utils/generateToken.js"
import { getTokenFromHeader } from "../utils/getTokenFromHeader.js"
import {verifyToken} from "../utils/verifyToken.js"
export const register = asyncHandler(
    async (req, res) => {
        const {
            fullname,
            email,
            password
        } = req.body;
    
        // check user exists
        const userExists = await User.findOne({
            email
        });
        if (userExists) {
            throw new Error('User already exists')
    
        }
        // has password
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)
        // create the user
        const user = await User.create({
            fullname,
            email,
            password: hashedPassword
        })
    
        res.status(201).json({
            status: 'success',
            message: "User Registered Successfully",
            data: user
        })
    }
)


// login
export const login =asyncHandler(
    async (req, res) => {
        const {email,password} = req.body;
    
        // check user exists
        const userExists = await User.findOne({
            email
        });
        if (userExists && (await bcrypt.compare(password, userExists?.password))) {
            res.status(200).json({
                status: true,
                message: "User Login Successfully",
                userExists,
                token:generateToken(userExists?._id)
            })
    
        } else {
            throw new Error('Invalid Login Details')
    
        }
      
    }


)

// GET Profile
export const getProfile = asyncHandler(

    async (req, res) => {
        const user = await User.findById(req.useAuthId).populate('orders')
        res.json({
            success:true,
            message: "User Order Profile Fetched",
            user
        })
    }
)
// Update SHipping Address
// GET Profile
export const updateShippingAddress = asyncHandler(

    async (req, res) => {

        const { firstName,
            lastName,
            address,
            city,
            postalcode,
            province,
            phone} = req.body

        const user = await User.findByIdAndUpdate(req.useAuthId,{
            shippingAddress:{
                firstName,
                lastName,
                address,
                city,
                postalcode,
                province,
                phone,
            },
            hasShippingAddress:true,
        },
            {
                new:true
            }
        );
      
       
        res.json({
            success:true,
            message: "Updated Shipping Address",
            user
        })
    }
    
)


