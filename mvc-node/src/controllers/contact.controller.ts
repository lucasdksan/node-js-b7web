import { RequestHandler } from "express";
import { createServiceContact, deleteServiceContact, getServiceContacts } from "../services/contact.service";

export const getController:RequestHandler = async (req, res)=> {
    let list = await getServiceContacts();

    res.json({ data: list });
}

export const createController: RequestHandler = async (req, res) => {
    const { name } = req.body;

    if (!name || name.length < 2) {
        return res.json({ error: 'Nome precisa ter pelo menos 2 caracteres.' });
    }

    await createServiceContact(name);

    res.status(201).json({ contato: name });
}

export const deleteController: RequestHandler = async (req, res) => {
    const { name } = req.query;

    if (!name) {
        return res.json({ error: 'Precisa mandar um nome para excluir.' });
    }

    await deleteServiceContact(name as string);

    res.json({ contato: name });
}