import { IEnv } from "./env.interface";
import dotenv from "dotenv";
import z from "zod"; 
import { schema } from "./env.schema";

export class EnvConfig implements IEnv {
    private config: z.infer<typeof schema>;

    constructor() {
        dotenv.config();

        this.config = schema.parse({
            port: Number(process.env.PORT),
            db: String(process.env.DB)
        });
    }

    getDB(): string {
        return this.config.db;
    }

    getPort(): number {
        return this.config.port;
    }
}