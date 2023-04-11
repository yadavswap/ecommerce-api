import express  from "express";
import { create,GetOrders,GetOrder,updateOrder,getOrderStats } from "../controllers/orderController.js";
import { isLoggedIn } from "../middlewares/isLoggedIn.js";
import isAdmin from "../middlewares/isAdmin.js";

const orderRoute = express.Router();

orderRoute.post("/create",isLoggedIn,isAdmin,create)
orderRoute.get("/",isLoggedIn,GetOrders)
orderRoute.get("/stats",isLoggedIn,getOrderStats)

orderRoute.get("/:id",isLoggedIn,GetOrder)

orderRoute.put("/update/:id",isLoggedIn,isAdmin,updateOrder)


export default orderRoute;

