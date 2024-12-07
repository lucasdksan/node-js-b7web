import { RequestHandler } from "express";
import * as groups from "../services/groups";

export const getAll: RequestHandler = async (req, res, next)=>{
    const { id_event } = req.params;
    const items = await groups.getAll(parseInt(id_event));

    if(items) {
        res.json({ groups: items });
        return;
    }

    res.status(403).json({ error: "Ocorreu um erro!" });
    return;
}