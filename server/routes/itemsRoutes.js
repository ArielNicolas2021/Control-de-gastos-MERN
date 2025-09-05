import { Router } from "express";
import { ItemController } from "../controllers/ItemController.js";

export const Enrouter = (model) => {
    const controller = new ItemController(model)
    const itemRouter = Router()
    // Get all
    itemRouter.get('/', controller.getAll)
    // Get one by id 
    itemRouter.get("/:id", controller.getOne)
    // Delete
    itemRouter.delete("/:id", controller.delete)
    // Post
    itemRouter.post("/", controller.create)
    // Put
    itemRouter.put("/:id", controller.update)
    return itemRouter
}