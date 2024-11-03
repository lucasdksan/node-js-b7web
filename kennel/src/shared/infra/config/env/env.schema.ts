import z from "zod";

export const schema = z.object({
    port: z.number().default(3000),
    db: z.string(),
});