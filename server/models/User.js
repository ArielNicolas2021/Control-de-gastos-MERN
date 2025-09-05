import { users } from "../data/users.js";
import bcrypt from "bcrypt"
import { createToken } from "../helpers/jwtUsers.js";

let usersReturn = users

export class User {
    static register = async (user) => {
        if (!user.success) {
            return Error
        }
        const newUser = {
            ...user.data
        }
        if (usersReturn.find(user => user.username == newUser.username)) {
            return "Usuario duplicado."
        }
        newUser.password = await bcrypt.hash(newUser.password, 10)
        usersReturn = [...usersReturn, newUser]
        return newUser
    }
    static login = async (user) => {
        let userReceived = user
        let userRegister = usersReturn.find((user) => user.username == userReceived.username)
        if (!userRegister) {
            return "No existe el usuario"
        }
        let pwd = await bcrypt.compare(userReceived.password, userRegister.password)
        if (!pwd) {
            return "Contraseña incorrecta"
        }
        const token = createToken(userRegister)
        const userFormatted = {
            "username": userRegister.username,
            "token": token
        }
        return userFormatted;
    }
}