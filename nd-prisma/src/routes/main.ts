import { Router } from "express";
import { createUser } from "../services/user";

export const mainRouter = Router();

mainRouter.get('/ping', (req, res) => {
    res.json({ pong: true });
});

mainRouter.post("/user", async (req, res)=> {    
    const user = await createUser("Lucas", "l@gmail.com", "123456789");

    res.json({ user });
})