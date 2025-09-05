import { validateItem, parcialItem } from "../helpers/zodItems.js";

export class ItemController {
    constructor(model) {
        this.model = model
    }
    getAll = async (req, res) => {
        res.json(await this.model.getAll());
    }
    getOne = async (req, res) => {
        const id = req.params.id;
        const item = await this.model.getOne(id)
        item ? res.json(item) : res.status(404).json({ message: "Item not found" }).end();
    }
    delete = async (req, res) => {
        const id = req.params.id;
        const getItems = await this.model.delete(id)
        getItems ? res.json(getItems) : res.status(404).json({ message: "Item not found" }).end();
    }
    create = async(req, res) => {
        const item = validateItem(req.body);
        if (item.error) {
            res.status(400).json("Validación fallida");
        } else {
            const getItems = await this.model.create(item)
            res.json(getItems);
        }
    }
    update = async(req, res) => {
        const id = req.params.id;
        const item = parcialItem(req.body);
        const newItem = await this.model.update(id, item)
        res.json(newItem);
    }
}