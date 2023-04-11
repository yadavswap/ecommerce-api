import Review from "../models/Review.js";
import asyncHandler from "express-async-handler"
import Product from "../models/Product.js";
// Review create
export const create = asyncHandler(
    async (req, res) => {

        const {product,message,rating} = req.body
        // product found
        const {productID} = req.params
        const productFound = await Product.findById(productID).populate("reviews")

        if (!productFound) {
            throw new Error('Product Not Found')

        }
        // check if user already reviewed this product
        const hasReviewed =productFound?.reviews?.find((review)=>{
            // console.log('r', req.useAuthId);
            return review.user.toString() === req.useAuthId.toString()
        })
        // console.log(hasReviewed);
        if(hasReviewed){
            throw new Error('You have already reviewed this product')
        }
         // create the review
         const review = await Review.create({
            message,
            rating,
            products:productFound?._id,
            user: req.useAuthId
        })

          // push review into product
        
          productFound.reviews.push(review?._id)
          // resave
          await productFound.save()
          res.status(201).json({
            status: 'success',
            message: "Review Created Successfully",
        })

       
      
    }
)