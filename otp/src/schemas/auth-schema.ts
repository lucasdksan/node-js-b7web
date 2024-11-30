import { z } from "zod";

export const authSignInSchema = z.object({
    email: z.string({ message: "Campo email é obrigatório" }).email("E-mail inválido"),
});

export const authSignUpSchema = z.object({
    name: z.string({ message: "Campo name é obrigatório" }),
    email: z.string({ message: "Campo email é obrigatório" }).email("E-mail inválido"),
});

export const authUseOTPSchema = z.object({
    id: z.string({ message: "ID do OTP obrigatório" }),
    code: z.string().length(6, "Código precisa de 6 números"),
});