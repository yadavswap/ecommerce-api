import mongoose from "mongoose";

import dotenv from "dotenv"
dotenv.config()
const dbConnect = async ()=>{
    try {
        const connected =await mongoose.connect(process.env.MONGO_URL || "mongodb+srv://swapnil:z7lvuDQNt0qlLfZz@cluster0.mgsmjoq.mongodb.net/nodejs-ecommerce-api");
        console.log(`Mongodb connected ${(connected).connection.host}`);
        
    } catch (error) {
        console.log(`Error:${error.message}`);
        process.exit(1);
        
    }
}
export default dbConnect;