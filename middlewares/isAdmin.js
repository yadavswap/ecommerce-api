import User from "../models/User.js"
const isAdmin = async(req,res,next)=>{
    // find the login user
    const user = await User.findById(req.useAuthId)
    // check if admin
    if(user.isAdmin){
        next()
    }else{
        next(new Error("Access denied,Admin only"));
    }
}
export default isAdmin;