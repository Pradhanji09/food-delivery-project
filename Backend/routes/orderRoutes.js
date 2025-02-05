import express from "express";
import authMiddelware from "../middleware/auth.js";
import {
  ListOrder,
  placeOrder,
  updateStatus,
  userOrders,
  verifyOrder,
} from "../controllers/orderController.js";

const orderRouter = express.Router();

orderRouter.post("/place", authMiddelware, placeOrder);

orderRouter.post("/verify", verifyOrder);
orderRouter.post("/orders", authMiddelware, userOrders);
orderRouter.get("/list", ListOrder);
orderRouter.post("/status", updateStatus);

export default orderRouter;
