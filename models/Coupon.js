import mongoose from "mongoose"
const Schema = mongoose.Schema;
const CouponSchema = new Schema({
    code: {
        type: String,
        required: true
    },
    startDate: {
        type: Date,
        required: true
    },
    endDate: {
        type: Date,
        required: true
    
    },
    discount: {
        type: Number,
        required: true,
        default:0

    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User",
    }
    

}, {
    timestamps: true,
    toJSON:{virtuals:true}

});

// coupon is expired
CouponSchema.virtual("isExpired").get(function(){
    return this.endDate < Date.now()
})
CouponSchema.virtual("daysLeft").get(function(){
    const daysLeft = Math.ceil((this.endDate - Date.now()) / (1000 * 60 * 60 * 24)) + 
    " " + 
    "Days left";
    return daysLeft;
})
// validation
// CouponSchema.pre("validate",function(next){
//     if(this.endDate < this.startDate){
//         next(new Error("End date cannot be less than the start date"))
//     }
// })
// CouponSchema.pre("validate",function(next){
//     if(this.startDate < Date.now() ){
//         next(new Error("Start date cannot be less than totay"))
//     }
// })
// CouponSchema.pre("validate",function(next){
//     if(this.endDate < Date.now() ){
//         next(new Error("End date cannot be less than totay"))
//     }
// })
// complete schema to Model
const Coupon = mongoose.model('Coupon', CouponSchema);
export default Coupon;