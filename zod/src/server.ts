import express from "express";
import z from "zod";
import { postsSchema } from "./schemas/posts";

const app = express();

app.use(express.json());

app.post("/test", (req, res)=>{
    const schema = z.object({
        name: z.string().min(2),
        email: z.string().email(),
        age: z.number().min(18).max(90).default(18)
    });

    console.log(req.body)

    const body = schema.safeParse(req.body);

    if(!body.success) {
        res.status(500).json({ error: body.error });
        return;
    }

    const { age, email, name } = body.data;

    console.log({ age, email, name });

    res.status(201).json();
});

app.get("/posts", async (req, res)=>{
    const request = await fetch("https://jsonplaceholder.typicode.com/posts");
    const data = await request.json();

    const result = postsSchema.safeParse(data);

    if(!result.success) {
        res.status(500).json({ error: "deu ruim" })
    }

    res.status(200).json({ data: result.data, len: result.data?.length });
    return;
});

app.listen(3000, ()=>{
    console.log("Server on!");
});