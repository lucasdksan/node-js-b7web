import { RequestHandler } from "express";
import { authSignInSchema } from "../schemas/auth-schema";
import { getUserByEmail } from "../services/user";
import { generateOTP } from "../services/otp";

export const signin: RequestHandler = async (req, res) => {
    const { success, data, error } = authSignInSchema.safeParse(req.body);

    if(!success) {
        res.json({ error: error.flatten().fieldErrors });
        return;
    }

    const user = await getUserByEmail(data.email);

    if(!user) {
        res.json({ error: "Usuário não existe" });
        return;
    }

    const otp = await generateOTP(user.id);

    res.json({ id: otp.id });
}