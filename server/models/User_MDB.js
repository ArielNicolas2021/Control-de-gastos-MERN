import mongoose, { model, Schema } from "mongoose";
import { conection } from "../helpers/conection.js";
import bcrypt from "bcrypt";
import { createToken } from "../helpers/jwtUsers.js";

conection();
const userSchema = new Schema(
    {
        username: String,
        email: String,
        password: String
    },
    {
        versionKey: false
    }
)
const User = model("Users", userSchema);

export class User_MDB {
    static register = async (user) => {
        if (!user.success) {
            return Error;
        }
        const newUser = { ...user.data };
        const userExists = await User.findOne({ username: newUser.username });
        const emailExists = await User.findOne({ email: newUser.email })
        if (userExists) {
            return { status: 400, message: "Usuario ya registrado." };
        }
        if (emailExists) {
            return { status: 400, message: "Email ya registrado." }
        }
        try {
            newUser.password = await bcrypt.hash(newUser.password, 10);
            const userSave = new User(newUser);
            await userSave.save();
            return newUser;
        }
        catch (e) {
            console.log(e);
        }
    };
    static login = async (user) => {
        let userReceived = user;
        try {
            userReceived = await User.findOne({ username: userReceived.username });
            if (!userReceived) {
                return { status: 400, message: "El usuario no existe." };
            }
            const pwd = await bcrypt.compare(user.password, userReceived.password);
            if (!pwd) {
                return { status: 400, message: "Contraseña incorrecta." };
            }
            const token = createToken(userReceived)
            const userFormatted = {
                "username": userReceived.username,
                "mail": userReceived.mail,
                "token": token
            }
            return userFormatted;

        }
        catch (e) {
            console.log(e)
        }
    }
}