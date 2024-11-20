import { Strategy as LocalStrategy } from "passport-local";
import { createToken, findUserByEmailAndPassword } from "../services/user.service";
import { User } from "../types/user.type";

type LocalStrategyRes = {
    auth: {
        token: string;
    },
    user: User
}

export const localStrategy = new LocalStrategy({
    usernameField: "email",
    passwordField: "password",
}, async (email, password, done) => {
    const user = await findUserByEmailAndPassword(email, password);

    if(user) {
        const token = createToken(user)
        const res:LocalStrategyRes = {
            auth: { token },
            user
        }

        return done(null, res);
    } else {
        return done(null, false);
    }
});