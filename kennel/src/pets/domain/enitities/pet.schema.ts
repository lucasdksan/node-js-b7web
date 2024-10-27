import z from "zod";

export const schema = z.object({
    race: z.string(),
    gender: z.enum([ "Masculino", "Feminino" ]),
    color: z.string(),
    image: z.string(),
    createdAt: z.date().optional(),
    updatedAt: z.date().optional(),
});