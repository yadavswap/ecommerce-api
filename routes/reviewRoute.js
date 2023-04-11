import express  from "express";
import { create } from "../controllers/reviewController.js";
import { isLoggedIn } from "../middlewares/isLoggedIn.js";

const reviewRoute = express.Router();

reviewRoute.post("/:productID",isLoggedIn,create)



export default reviewRoute;

