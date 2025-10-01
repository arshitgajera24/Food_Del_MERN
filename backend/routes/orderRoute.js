import {Router} from "express"
import { authMiddleware } from "../middleware/auth.js";
import { listOrders, placeOrder, updateStatus, userOrders, veryfiOrder } from "../controllers/orderControllers.js";

export const orderRouter = Router();

orderRouter.route("/place").post(authMiddleware, placeOrder)
orderRouter.route("/verify").post(veryfiOrder);
orderRouter.route("/userorders").post(authMiddleware, userOrders)
orderRouter.route("/list").get(listOrders)
orderRouter.route("/status").post(updateStatus)
