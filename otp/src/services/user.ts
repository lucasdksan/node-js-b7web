import { prisma } from "../libs/prisma"

export const getUserByEmail = async (email: string) => {
    const user = await prisma.users.findFirst({
        where: { email }
    });

    return user;
}

export const createUser = async (name: string, email: string) => {
    const user = prisma.users.create({
        data: {
            name, 
            email
        }
    });

    return user;
}