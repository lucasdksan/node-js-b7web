import { RequestHandler } from "express";
import { z } from "zod";

export const login: RequestHandler = (req, res, next) => {
    const loginSchema = z.object({
        password: z.string(),
    });

    const body = loginSchema.safeParse(req.body);
}