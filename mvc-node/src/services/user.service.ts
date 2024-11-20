import { User } from "../types/user.type"

export const findUserByEmailAndPassword = async (email: string, password: string) => {
    if(email === "admin@gmail.com" && password === "123456789") {
        const user: User = {
            id: "1",
            name: "Lucas da Silva"
        }

        return user;
    }

    return null;
}

export const createToken = (user: User) => {
    return "1234"
}