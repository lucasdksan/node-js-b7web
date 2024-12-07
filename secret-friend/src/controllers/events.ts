import { RequestHandler } from "express";
import * as events from "../services/events";
import { z } from "zod";

export const getAll: RequestHandler = async (req, res, next) => {
    const items = await events.getAll();

    if(items) {
        res.json({ events: items });
        return;
    }

    res.status(403).json({ error: "Ocorreu um erro!" });
}

export const getEvent: RequestHandler = async (req, res, next) => {
    const { id } = req.params;
    const eventItem = await events.getOne(parseInt(id));

    if(eventItem) {
        res.json({ event: eventItem });
        return;
    }

    res.status(403).json({ error: "Ocorreu um erro!" });
}

export const addEvent: RequestHandler = async (req, res, next) => {
    const addEventSchema = z.object({
        title: z.string(),
        description: z.string(),
        grouped: z.boolean().optional(),
    });
    const body = addEventSchema.safeParse(req.body);

    if(!body.success) {
        res.json({ error: "Dados inválidos!" });
        return;
    }

    const newEvent = await events.add(body.data);

    if(newEvent) {
        res.json({ event: newEvent });
        return;
    }

    res.status(403).json({ error: "Ocorreu um erro!" });
}

export const updateEvent: RequestHandler = async (req, res, next) => {
    const { id } = req.params;
    const updateEventSchema = z.object({
        status: z.boolean().optional(),
        title: z.string().optional(),
        description: z.string().optional(),
        grouped: z.boolean().optional(),
    });
    const body = updateEventSchema.safeParse(req.body);

    if(!body.success) {
        res.status(403).json({ error: "Dados inválidos!" });
        return;
    }

    const updateEvent = await events.update(parseInt(id), body.data);
    
    if(updateEvent) {
        if(updateEvent.status) {

        }
        res.json({ event: updateEvent });
        return;
    }

    res.status(403).json({ error: "Ocorreu um erro!" });
    return;
}

export const deleteEvent: RequestHandler = async (req, res, next)=> {
    const { id } = req.params;
    const deleteEvent = await events.remove(parseInt(id));
    
    if(deleteEvent) {
        res.json({ event: deleteEvent });
        return;
    }

    res.status(403).json({ error: "Ocorreu um erro!" });
    return;
}