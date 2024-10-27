import express from "express";
import { ContactController } from "../controllers/contact";
import { ContactService } from "../services/contact";

const dataSource = "./src/data/data.json";
const routes = express.Router();

const contactService = new ContactService(dataSource);
const contactController = new ContactController(contactService);

routes.post("/contacts", contactController.create);
routes.get("/contacts", contactController.list);
routes.get("/contacts/:id", contactController.get);
routes.delete("/contacts", contactController.delete);
routes.put("/contacts", contactController.update);

export default routes;
