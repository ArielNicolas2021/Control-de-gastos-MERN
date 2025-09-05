import jwt from "jwt-simple";
import "dotenv/config";

export const auth = (req, res, next) => {
    const tokenReceived = req.headers.authorization;
    if (!tokenReceived) {
        return res.status(403).json("Error de autentificación");
    }
    const token = tokenReceived.replace(/['"]+/g, '');
    let payload;
    try {
        payload = jwt.decode(token, process.env.SECRETO);
        if (payload.exp <= Date.now()) {
            return res.status(404).json("Token expirado");
        }
    }
    catch (e) {
        return res.status(404).json("Error de autentificación");
    }
    req.username = payload;
    next();
}