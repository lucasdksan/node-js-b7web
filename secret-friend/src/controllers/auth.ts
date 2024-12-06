import { RequestHandler } from "express";
import * as auth from "../services/auth";
import { z } from "zod";

export const login: RequestHandler = (req, res, next) => {
    const loginSchema = z.object({
        password: z.string(),
    });

    const parsed = loginSchema.safeParse(req.body);

    if (!parsed.success) {
        res.status(400).json({ error: "Invalid data", details: parsed.error.issues });
        return;
    }

    const { password } = parsed.data;

    if (!auth.validatePassword(password)) res.status(403).json({ error: "Access denied" });

    const token = auth.createToken();
    
    res.status(200).json({ token });
};

export const validate: RequestHandler = (req, res, next) => {
    if(!req.headers.authorization) {
        res.status(403).json({ error: "Acesso Negado" });
        return;
    }

    const token = req.headers.authorization.split(" ")[1];
    
    if(!auth.validateToken(token)){
        res.status(403).json({ error: "Acesso Negado" });
        return;
    }
    
    next();
}
