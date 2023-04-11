import Color from "../models/Color.js";

import asyncHandler from "express-async-handler"
// Color create
export const create = asyncHandler(
    async (req, res) => {
        const {
            name
        } = req.body;

        // check user exists
        const colorExists = await Color.findOne({
            name
        });
        if (colorExists) {
            throw new Error('Color Already Exists')

        }

        // create the user
        const color = await Color.create({
            name:name.toLowerCase(),
            user: req.useAuthId
        })

        res.json({
            status: 'success',
            message: "Color Created Successfully",
            data: Color
        })
    }
)

// GetColors

export const GetAllColors = asyncHandler(
    async (req, res) => {
    

        const Colors = await Color.find();

        res.json({
            status: 'success',
            data: Colors,
            message: "Colors fetched successfully"
        })
    }
)

// GetSingleCategory

export const GetColor = asyncHandler(
    async (req, res) => {

        const color = await  Color.findById(req.params.id)
        if (!color) {
            throw new Error('Color not exists')
    
        }
        res.json({
            status: 'success',
            message: "Color Fetched Successfully",
            data: color
        })
    }
)


// updateCategory

export const updateColor = asyncHandler(
    async (req, res) => {
        const {
            name} = req.body;
        const color = await Color.findByIdAndUpdate(req.params.id,{
            name},
        {
            new:true,
        }
        )
       
        res.json({
            status: 'success',
            message: "Color Update Successfully",
            data: color
        })
    }
)

// Delete Category

export const deleteColor = asyncHandler(
    async (req, res) => {
    
        await Color.findByIdAndDelete(req.params.id)
       
        res.json({
            status: 'success',
            message: "Color Deleted Successfully"
        })
    }
)