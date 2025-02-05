import {
  addToCart,
  getCart,
  removeFromCart,
} from "../controllers/cartController.js";
import express from "express";
import authMiddelware from "../middleware/auth.js";

const cartRouter = express.Router();

cartRouter.post("/add", authMiddelware, addToCart);
cartRouter.post("/remove", authMiddelware, removeFromCart);
cartRouter.post("/get", authMiddelware, getCart);

export default cartRouter;
