import { IEnv } from "./env.interface";
import dotenv from "dotenv";
import z from "zod"; 
import { schema } from "./env.schema";

export class EnvConfig implements IEnv {
    private config: z.infer<typeof schema>;

    constructor() {
        dotenv.config();

        this.config = schema.parse({
            port: Number(process.env.PORT)
        });
    }

    getPort(): number {
        return this.config.port;
    }
}