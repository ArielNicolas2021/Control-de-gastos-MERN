import jwt from "jwt-simple";
import "dotenv/config";

const expiration = 1000 * 3000;

export const createToken = (user) => {
    const payload = {
        username: user.username,
        password: user.password,
        exp: Date.now() + expiration
    };
    return jwt.encode(payload, process.env.SECRETO);
};

