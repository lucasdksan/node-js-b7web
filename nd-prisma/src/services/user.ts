import { Prisma } from "@prisma/client";
import { prisma } from "../libs/prisma";

export const createUser = async ({ name, email, password }: Prisma.UserCreateInput) => {
    const user = await prisma.user.create({
        data: {
            email: "lucasdksan@gmail.com",
            name: "Lucas",
            password: "12344123"
        }
    });

    return user;
}

export const createUsers = async (users: Prisma.UserCreateInput[]) => {
    const result = await prisma.user.createMany({
        data: users,
        skipDuplicates: true
    })
}

export const listUsers = async () => {
    const result = await prisma.user.findMany({

    });

    return result;
}