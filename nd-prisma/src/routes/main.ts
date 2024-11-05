import { Router } from "express";
import { createUser } from "../services/user";

export const mainRouter = Router();

mainRouter.get('/ping', (req, res) => {
    res.json({ pong: true });
});

mainRouter.post("/user", async (req, res)=> {    
    try {
        const user = await createUser({ name: "Lucas", email: "l@gmail.com", password: "123456789" }); 

        res.json({ user });
    } catch (error) {
        
    }
})