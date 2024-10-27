import { RequestHandler } from "express";

export interface IController {
    create: RequestHandler;
    list: RequestHandler;
    delete: RequestHandler;
    get: RequestHandler;
    update: RequestHandler;
}