import express from "express";
import cors from "cors";
import colors from "colors";
import morgan from "morgan";
import { connectDB } from "./config/db.js";
import dotenv from "dotenv";
import foodRouter from "./routes/foodRoute.js";
import userRouter from "./routes/userRoute.js";
import orderRouter from "./routes/orderRoutes.js";
import cartRouter from "./routes/cartRoutes.js";

// dot env config
dotenv.config();
//app config
const app = express();

// middleware
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));

// DB connection
connectDB();

// API end points
app.use("/api/food", foodRouter);
app.use("/images", express.static("uploads"));
app.use("/api/user", userRouter);
app.use("/api/cart", cartRouter);
app.use("/api/order", orderRouter);
//
app.get("/", (req, res) => {
  res.send("APi working");
});

app.listen(process.env.PORT || 4000, () => {
  console.log(`Server lisitng on port no ${process.env.PORT}`.bgCyan);
});
