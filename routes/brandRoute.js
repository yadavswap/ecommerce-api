import express  from "express";
import { create, deleteBrand, GetAllBrands, GetBrand, updateBrand } from "../controllers/brandController.js";
import { isLoggedIn } from "../middlewares/isLoggedIn.js";
import isAdmin from "../middlewares/isAdmin.js";

const brandRoute = express.Router();

brandRoute.post("/create",isAdmin,isLoggedIn,create)
brandRoute.get("/",isLoggedIn,GetAllBrands)
brandRoute.get("/:id",isLoggedIn,GetBrand)
brandRoute.put("/:id",isLoggedIn,isAdmin,updateBrand)
brandRoute.delete("/:id/delete",isLoggedIn,isAdmin,deleteBrand)


export default brandRoute;

