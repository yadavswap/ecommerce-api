import mongoose from "mongoose"
const Schema = mongoose.Schema;
const ProductSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    brand: {
        type: String,
        required: true
    },
    category: {
        type: String,
        ref: "Category",
        required: true
    },
    sizes: {
        type: [String],
        enum: ["S", "M", "L", "XL", "XXL"],
        required: true

    },
    colors: {
        type: [String],
        required: true

    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User",
    },
    images: [{
        type: String,
        default: "http://via.placeholder.com/150",

    }, ],
    reviews: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Review",
    }, ],

    price: {
        type: Number,
        required: true
    },
    totalQty: {
        type: Number,
        required: true
    },
    totalSold: {
        type: Number,
        default:0

    },
    

}, {
    timestamps: true,
    toJSON:{virtuals:true}
});

// Virtuals

// qty left
ProductSchema.virtual("qtyLeft").get(function(){
    const product = this;
    return product.totalQty - product.totalSold
})
// Total Ratting
ProductSchema.virtual("totalReviews").get(function(){
    const product = this;
    return product?.reviews?.length;
    // console.log('product',product);
})

// avg ratting
ProductSchema.virtual("averageRating").get(function(){
    let rattingsTotal = 0;
    const product = this;
    product?.reviews?.forEach((review)=>{
        rattingsTotal += review?.rating;
    })
    // calc avg rating
    const avgRatting = Number(rattingsTotal / product?.reviews?.length).toFixed(1);
    return avgRatting;
})
// complete schema to Model
const Product = mongoose.model('Product', ProductSchema);
export default Product;