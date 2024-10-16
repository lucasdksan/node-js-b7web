import { ErrorRequestHandler } from "express";
import { statusCode } from "../../shared/utils/status_code.util";
import { slog } from "../../shared/utils/log.util";

export const errorHandler: ErrorRequestHandler = (err, req, res, next)=> {
    slog.error("error internal server");
    res.status(statusCode.INTERNAL_SERVER_ERROR).json({ error: "internal server error" });
}