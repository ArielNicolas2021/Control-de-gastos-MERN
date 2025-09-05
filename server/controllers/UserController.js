import { validateUser } from "../helpers/zodUsers.js";

export class UserController {
    constructor(model) {
        this.model = model
    }
    register = async (req, res) => {
        const user = validateUser(req.body)
        if (user.error) {
            return res.status(400).json("Error de validación")
        }
        const newUser = await this.model.register(user)

        res.json(newUser)
    }
    login = async (req, res) => {
        const auth = req.body
        const user = await this.model.login(auth)
        if (user) {
            res.json(user)
        } else {
            res.status(400).end()
        }
    }
}