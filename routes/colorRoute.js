import express  from "express";
import { create, deleteColor, GetAllColors, GetColor, updateColor } from "../controllers/colorController.js";
import { isLoggedIn } from "../middlewares/isLoggedIn.js";
import isAdmin from "../middlewares/isAdmin.js";

const colorRoute = express.Router();

colorRoute.post("/create",isLoggedIn,isAdmin,create)
colorRoute.get("/",isLoggedIn,GetAllColors)
colorRoute.get("/:id",isLoggedIn,GetColor)
colorRoute.put("/:id",isLoggedIn,isAdmin,updateColor)
colorRoute.delete("/:id/delete",isLoggedIn,isAdmin,deleteColor)


export default colorRoute;

