import Category from "../models/Category.js";
import asyncHandler from "express-async-handler"
// product create
export const create = asyncHandler(
    async (req, res) => {
        const {
            name
        } = req.body;

        // check user exists
        const categoryExists = await Category.findOne({
            name
        });
        if (categoryExists) {
            throw new Error('Category Already Exists')

        }

        // create the user
        const category = await Category.create({
            name:name.toLowerCase(),
            image:req.file.path,
            user: req.useAuthId
        })

        res.json({
            status: 'success',
            message: "Category Created Successfully",
            data: category
        })
    }
)

// GetProducts

export const GetAllCategories = asyncHandler(
    async (req, res) => {
    

        const categories = await Category.find();

        res.json({
            status: 'success',
            data: categories,
            message: "Category fetched successfully"
        })
    }
)

// GetSingleCategory

export const GetCategory = asyncHandler(
    async (req, res) => {

        const category = await  Category.findById(req.params.id)
        if (!category) {
            throw new Error('Category not exists')
    
        }
        res.json({
            status: 'success',
            message: "Category Fetched Successfully",
            data: category
        })
    }
)


// updateCategory

export const updateCategory = asyncHandler(
    async (req, res) => {
        const {
            name} = req.body;
        const category = await Category.findByIdAndUpdate(req.params.id,{
            name},
        {
            new:true,
        }
        )
       
        res.json({
            status: 'success',
            message: "Category Update Successfully",
            data: category
        })
    }
)

// Delete Category

export const deleteCategory = asyncHandler(
    async (req, res) => {
    
        await Category.findByIdAndDelete(req.params.id)
       
        res.json({
            status: 'success',
            message: "Category Deleted Successfully"
        })
    }
)