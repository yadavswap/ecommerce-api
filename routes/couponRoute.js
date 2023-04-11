import express  from "express";
import { create,deleteCoupon,GetAllCoupons, GetCoupon, updateCoupon} from "../controllers/couponController.js";
import { isLoggedIn } from "../middlewares/isLoggedIn.js";
import isAdmin from "../middlewares/isAdmin.js";

const couponRoutes = express.Router();

couponRoutes.post("/create",isLoggedIn,isAdmin,create)

couponRoutes.get("/",GetAllCoupons)
couponRoutes.get("/:id",isLoggedIn,GetCoupon)
couponRoutes.put("/:id",isLoggedIn,isAdmin,updateCoupon)
couponRoutes.delete("/:id/delete",isLoggedIn,isAdmin,deleteCoupon)


export default couponRoutes;

