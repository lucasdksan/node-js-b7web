import express from "express";
import { slog } from "../shared/utils/log.util";

const router = express.Router();

router.get("/get", (req, res)=> {
    slog.info("start get method product");
    res.json({ message: "Um produto!" })
});

export default router;