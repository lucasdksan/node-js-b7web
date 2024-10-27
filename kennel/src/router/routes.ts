import { EnvConfig } from "@/shared/infra/config/env/env.config";
import express, { Router } from "express";

export class Routes {
    private _router: Router;

    constructor(
        public readonly envConfig: EnvConfig
    ) {
        this._router = express.Router();
    }

    get router():Router {
        return this._router;
    }
}