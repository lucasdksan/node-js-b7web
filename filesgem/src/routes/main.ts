import { Router } from "express";
import * as uploadController from "../controllers/upload";
import { _upload } from "../libs/multer";

export const mainRouter = Router();

mainRouter.get("/ping", (req, res) => {
    res.json({ pong: true });
});

mainRouter.post("/upload", _upload.single("file"),uploadController.upload);