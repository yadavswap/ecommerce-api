import Brand from "../models/Brand.js";
import asyncHandler from "express-async-handler"
// Brand create
export const create = asyncHandler(
    async (req, res) => {
        const {
            name
        } = req.body;

        // check user exists
        const brandExists = await Brand.findOne({
            name
        });
        if (brandExists) {
            throw new Error('Brand Already Exists')

        }

        // create the user
        const brand = await Brand.create({
            name:name.toLowerCase(),
            user: req.useAuthId
        })

        res.json({
            status: 'success',
            message: "Brand Created Successfully",
            data: Brand
        })
    }
)

// GetProducts

export const GetAllBrands = asyncHandler(
    async (req, res) => {
    

        const Brands = await Brand.find();

        res.json({
            status: 'success',
            data: Brands,
            message: "Brands fetched successfully"
        })
    }
)

// GetSingleCategory

export const GetBrand = asyncHandler(
    async (req, res) => {

        const brand = await  Brand.findById(req.params.id)
        if (!brand) {
            throw new Error('Category not exists')
    
        }
        res.json({
            status: 'success',
            message: "Brand Fetched Successfully",
            data: brand
        })
    }
)


// updateCategory

export const updateBrand = asyncHandler(
    async (req, res) => {
        const {
            name} = req.body;
        const brand = await Brand.findByIdAndUpdate(req.params.id,{
            name},
        {
            new:true,
        }
        )
       
        res.json({
            status: 'success',
            message: "Brand Update Successfully",
            data: brand
        })
    }
)

// Delete Category

export const deleteBrand = asyncHandler(
    async (req, res) => {
    
        await Brand.findByIdAndDelete(req.params.id)
       
        res.json({
            status: 'success',
            message: "Brand Deleted Successfully"
        })
    }
)