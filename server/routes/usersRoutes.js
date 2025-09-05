import { Router } from "express";
import { UserController } from "../controllers/UserController.js";

export const CreateUsers = (model) => {
    const controller = new UserController(model)
    const userRouter = Router()
    userRouter.post("/", controller.register)
    userRouter.post("/login", controller.login)
    return userRouter;
}