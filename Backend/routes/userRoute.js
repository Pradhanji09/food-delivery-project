import express from "express";
import { loginUser, registerUser } from "../controllers/userController.js";
// creating route

const userRouter = express.Router();

// end points
userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);

export default userRouter;
