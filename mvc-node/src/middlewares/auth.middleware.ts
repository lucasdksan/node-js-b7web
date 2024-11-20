import { RequestHandler } from "express";

export const privateRequest: RequestHandler = (req, res, next) => {
    if(!req.headers.authorization) {
        return res.status(401).json({ error: "Acesso negado!" });
    }

    const authorization = req.headers.authorization.split(" ")[1];

    if(authorization) next();
    else return res.status(401).json({ error: "Acesso negado!" });
}