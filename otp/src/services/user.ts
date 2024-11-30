import { prisma } from "../libs/prisma"

export const getUserByEmail = async (email: string) => {
    const user = await prisma.users.findFirst({
        where: { email }
    });

    return user;
}