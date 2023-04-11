import express  from "express";
import { create, deleteCategory, GetAllCategories, GetCategory, updateCategory } from "../controllers/categoriesController.js";
import { isLoggedIn } from "../middlewares/isLoggedIn.js";
import categoryupload from "../config/categoryUpload.js";
import isAdmin from "../middlewares/isAdmin.js";
const categoryRoutes = express.Router();

categoryRoutes.post("/create",isLoggedIn,isAdmin,categoryupload.single('file'),create)
categoryRoutes.get("/",isLoggedIn,GetAllCategories)
categoryRoutes.get("/:id",isLoggedIn,GetCategory)
categoryRoutes.put("/:id",isLoggedIn,isAdmin,updateCategory)
categoryRoutes.delete("/:id/delete",isLoggedIn,isAdmin,deleteCategory)


export default categoryRoutes;

