import { RequestHandler } from "express"
import { Error } from "../shared/errors/error";
import { IController } from "../shared/controllers/i_controller";
import { ContactService } from "../services/contact";

export class ContactController implements IController {
    constructor(private readonly contactService: ContactService) {}

    create:RequestHandler = async (req, res) => {
        const { name } = req.body;
        
        const response = await this.contactService.create(name);

        if(response.error.exist) {
            res.status(response.status).json(new Error(response.error.text ? response.error.text : "", null));
            return;
        }

        res.status(response.status).json(response.data);
        return;
    }

    list:RequestHandler = async (_, res) => {
        const response = await this.contactService.list();

        if(response.error.exist) {
            res.status(response.status).json(new Error(response.error.text ? response.error.text : "", null));
            return;
        }

        res.status(response.status).json(response.data);
        return;
    }

    delete: RequestHandler = async (req, res) => {
        const { id } = req.query;
        const response = await this.contactService.delete(id as string);

        if(response.error.exist) {
            res.status(response.status).json(new Error(response.error.text ? response.error.text : "", null));
            return;
        }

        res.status(response.status).json(response.data);
        return;
    }

    get: RequestHandler = async (req, res) => {
        const { id } = req.params;
        const response = await this.contactService.get(id as string);

        if(response.error.exist) {
            res.status(response.status).json(new Error(response.error.text ? response.error.text : "", null));
            return;
        }

        res.status(response.status).json(response.data);
        return;
    }
    
    update: RequestHandler = async (req, res) => {
        const { id } = req.query;
        const { name } = req.body;
        const response = await this.contactService.update(id as string, name);

        if(response.error.exist) {
            res.status(response.status).json(new Error(response.error.text ? response.error.text : "", null));
            return;
        }

        res.status(response.status).json(response.data);
        return;
    }
}