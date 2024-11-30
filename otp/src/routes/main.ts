import { Router } from "express";
import * as authController from "../controllers/auth";

export const mainRouter = Router();

mainRouter.post("/auth/signin", authController.signin);
mainRouter.post("/auth/signup", authController.signup);