import { RequestHandler } from "express";
import { authSignInSchema, authSignUpSchema, authUseOTPSchema } from "../schemas/auth-schema";
import { createUser, getUserByEmail } from "../services/user";
import { generateOTP, validateOTP } from "../services/otp";
import { sendEmail } from "../libs/mailtrap";
import { createJWT } from "../libs/jwt";

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

    await sendEmail(user.email, "Seu código de acesso de "+otp.code, "Digite seu código "+otp.code);

    res.json({ id: otp.id });
}

export const signup: RequestHandler = async (req, res) => {
    const { success, data, error } = authSignUpSchema.safeParse(req.body);

    if(!success) {
        res.json({ error: error.flatten().fieldErrors });
        return;
    }

    const user = await getUserByEmail(data.email);

    if(user) {
        res.json({ error: "Já existe usuário com este e-mail" });
        return;
    }

    const newUser = await createUser(data.name, data.email);

    res.status(201).json({ user: newUser });
    return;
}

export const useOTP: RequestHandler = async (req, res)=>{
    const { success, data, error } = authUseOTPSchema.safeParse(req.body);

    if(!success) {
        res.json({ error: error.flatten().fieldErrors });
        return;
    }

    const user = await validateOTP(data.id, data.code);

    if(!user) {
        res.json({ error: "OTP inválido ou expirado" });
        return;
    }

    const token = createJWT(user.id);

    res.json({ token, user });
}