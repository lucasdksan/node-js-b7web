import { prisma } from "../libs/prisma";

export const createUser = async (name: string, email: string, password:string) => {
    const user = await prisma.user.create({
        data: {
            email: "lucasdksan@gmail.com",
            name: "Lucas",
            password: "12344123"
        }
    });

    return user;
}