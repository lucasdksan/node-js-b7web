import express from "express";
import helmet from "helmet";
import { EnvConfig } from "./shared/infra/config/env/env.config";
import { Routes } from "./router/routes";

const server = express();
const env = new EnvConfig();
const routes = new Routes(env);

routes.execute();

server.use(helmet());
server.use(express.json());
server.use(express.urlencoded({ extended: true }));
server.use(routes.router);

server.listen(env.getPort(), ()=> {
    console.log("server is working on the port: ", env.getPort());
});