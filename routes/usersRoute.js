import express  from "express";
import { login, register ,getProfile, updateShippingAddress} from "../controllers/userController.js";
import { isLoggedIn } from "../middlewares/isLoggedIn.js";

const userRoutes = express.Router();

userRoutes.post("/register",register)
userRoutes.post("/login",login)
userRoutes.get("/profile",isLoggedIn,getProfile)

userRoutes.post("/update/shipping",isLoggedIn,updateShippingAddress)

export default userRoutes;

