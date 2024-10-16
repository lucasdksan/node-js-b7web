import { RequestHandler } from "express";
import { statusCode } from "../../shared/utils/status_code.util";
import { slog } from "../../shared/utils/log.util";

export const notFoundRequest: RequestHandler = (req, res)=> {
    slog.error("not found");
    res.status(statusCode.NOT_FOUND).json({ error: "route not found" });
}