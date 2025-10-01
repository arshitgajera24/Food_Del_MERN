import {Router} from "express"
import { addToCart, getCart, removeFromCart } from "../controllers/cartControllers.js";
import { authMiddleware } from "../middleware/auth.js";

export const cartRouter = Router();

cartRouter.route("/add").post(authMiddleware, addToCart)
cartRouter.route("/remove").post(authMiddleware, removeFromCart)
cartRouter.route("/get").post(authMiddleware, getCart)

