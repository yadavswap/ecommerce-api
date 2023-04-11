import Product from "../models/Product.js";
import Category from "../models/Category.js";
import Brand from "../models/Brand.js";

import asyncHandler from "express-async-handler"
// product create
export const create = asyncHandler(async (req, res) => {
        // console.log(req.file.path);
        const {
            name,
            description,
            category,
            brand,
            sizes,
            colors,
            price,
            totalQty,
            images,
            user
        } = req.body;

        // check user exists
        const productExists = await Product.findOne({
            name
        });
        if (productExists) {
            throw new Error('Product Already Exists')

        }
        // find the category
        const categoryFound = await Category.findOne({
            name:category
        })
        if (!categoryFound) {
            throw new Error('Catgory not found,please create category first or check category')

        }
          // find the brand
          const brandFound = await Brand.findOne({
            name:brand.toLowerCase()
        })
        if (!brandFound) {
            throw new Error('Brand not found,please create brand first or check brand')

        }


        // create the user
        const product = await Product.create({
            name,
            description,
            category,
            brand,
            sizes,
            colors,
            price,
            totalQty,
            images:req.file.path,
            user: req.useAuthId,

        })
        // push product into category
        
        categoryFound.products.push(product._id)
        // resave
        await categoryFound.save()

        // push product into brand
        
        brandFound.products.push(product._id)
        // resave
        await brandFound.save()
        res.json({
            status: 'success',
            message: "Product Created Successfully",
            data: product
        })
    })

// GetProducts

export const GetProducts = asyncHandler(
    async (req, res) => {
        // query
        let productQuery = Product.find();
        // search by name
        if (req.query.name) {
            productQuery = productQuery.find({
                name: {
                    $regex: req.query.name,
                    $options: "i"
                },
            })

        }
        // search by brand
        if (req.query.brand) {
            productQuery = productQuery.find({
                brand: {
                    $regex: req.query.brand,
                    $options: "i"
                },
            })

        }
        // search by colors
        if (req.query.colors) {
            productQuery = productQuery.find({
                colors: {
                    $regex: req.query.colors,
                    $options: "i"
                },
            })

        }
        // search by colors
        if (req.query.sizes) {
            productQuery = productQuery.find({
                sizes: {
                    $regex: req.query.sizes,
                    $options: "i"
                },
            })

        }

        // find by price range

        if (req.query.price) {
            const pricerange = req.query.price.split("-")
            // gte:greater or equal
            // lte:less than or equal to
            productQuery = productQuery.find({
                price: {
                    $gte: pricerange[0],
                    $lte: pricerange[1]
                }
            })
        }

        // pagination
        // page
        const page = parseInt(req.query.page) ? parseInt(req.query.page) : 1;
        // limit
        const limit = parseInt(req.query.limit) ? parseInt(req.query.limit) : 10;
        // startIdx
        const startIndex = (page - 1) * limit;
        // endIdx
        const endIndex = page * limit;
        // total 
        const total = await Product.countDocuments().populate('reviews')
        productQuery = productQuery.skip(startIndex).limit(limit)
        // pagaination results
        const pagination = {};

        if (endIndex < total) {
            pagination.next = {
                page: page + 1,
                limit
            }
        }
        if (startIndex > 0) {
            pagination.prev = {
                page: page - 1,
                limit
            }
        }
        // await the query

        const products = await productQuery;

        res.json({
            status: 'success',
            total,
            data: products.length,
            pagination,
            message: "Products fetched successfully",
            products
        })
    }
)

// GetProduct

export const GetProduct = asyncHandler(
    async (req, res) => {

        const product = await Product.findById(req.params.id).populate('reviews')
        if (!product) {
            throw new Error('Product not exists')

        }
        res.json({
            status: 'success',
            message: "Product Fetched Successfully",
            data: product
        })
    }
)

// updateProduct

export const updateProduct = asyncHandler(
    async (req, res) => {
        const {
            name,
            description,
            category,
            brand,
            sizes,
            colors,
            price,
            totalQty,
            user
        } = req.body;
        const product = await Product.findByIdAndUpdate(req.params.id, {
            name,
            description,
            category,
            brand,
            sizes,
            colors,
            price,
            totalQty,
            user
        }, {
            new: true,
        })

        res.json({
            status: 'success',
            message: "Product Update Successfully",
            data: product
        })
    }
)

// Delete Product

export const deleteProduct = asyncHandler(
    async (req, res) => {

        await Product.findByIdAndDelete(req.params.id)

        res.json({
            status: 'success',
            message: "Product Deleted Successfully"
        })
    }
)