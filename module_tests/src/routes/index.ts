import express from "express";
import productRouter from "./product.route";
import userRouter from "./user.route";

const router = express.Router();

router.use("/products",productRouter);
router.use("/users", userRouter);

export default router;