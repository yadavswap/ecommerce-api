import Coupon from "../models/Coupon.js";
import asyncHandler from "express-async-handler"
// coupon create
export const create = asyncHandler(
    async (req, res) => {
        const {
            code ,startDate,endDate,discount
        } = req.body;

        // check user exists
        const couponExists = await Coupon.findOne({
            code
        });
        if (couponExists) {
            throw new Error('Coupon Already Exists')

        }
        // check if discount is number
        if(isNaN(discount)){
            throw new Error('Discount value must be a Number')
        }
        // create the coupon
        const coupon = await Coupon.create({
            code:code?.toUpperCase(),
            startDate,
            endDate,
            discount,
            user: req.useAuthId
        })

        res.json({
            status: 'success',
            message: "Coupon Created Successfully",
            data: coupon
        })
    }
)

// GetCoupons

export const GetAllCoupons = asyncHandler(
    async (req, res) => {
    

        const coupons = await Coupon.find();

        res.json({
            status: 'success',
            data: coupons,
            message: "Coupons fetched successfully"
        })
    }
)
// GetCoupon
export const GetCoupon = asyncHandler(
    async (req, res) => {

        const coupon = await  Coupon.findById(req.params.id)
        if (!coupon) {
            throw new Error('Coupon not exists')
    
        }
        res.json({
            status: 'success',
            message: "Coupon Fetched Successfully",
            data: coupon
        })
    }
)


// updateCoupon

export const updateCoupon = asyncHandler(
    async (req, res) => {
        const {code,discount,startDate,endDate} = req.body;
        const coupon = await Coupon.findByIdAndUpdate(req.params.id,{
            code:code?.toUpperCase(),
            discount,
            startDate,
            endDate
        },
        {
            new:true,
        }
        )
       
        res.json({
            status: 'success',
            message: "Category Update Successfully",
            data: coupon
        })
    }
)

// Delete Category

export const deleteCoupon = asyncHandler(
    async (req, res) => {
    
        await Coupon.findByIdAndDelete(req.params.id)
       
        res.json({
            status: 'success',
            message: "Coupon Deleted Successfully"
        })
    }
)