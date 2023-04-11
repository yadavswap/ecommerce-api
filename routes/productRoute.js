import express  from "express";
import { create, deleteProduct, GetProduct, GetProducts, updateProduct } from "../controllers/productController.js";
import { isLoggedIn } from "../middlewares/isLoggedIn.js";
import productupload from "../config/productUpload.js";
import isAdmin from "../middlewares/isAdmin.js";

const productRoutes = express.Router();

productRoutes.post("/",isLoggedIn,isAdmin,productupload.single('file'),create)
productRoutes.get("/",isLoggedIn,GetProducts)
productRoutes.get("/:id",isLoggedIn,GetProduct)

productRoutes.put("/:id",isLoggedIn,isAdmin,updateProduct)

productRoutes.delete("/:id/delete",isLoggedIn,isAdmin,deleteProduct)

export default productRoutes;
