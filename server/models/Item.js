import { items } from "../data/items.js";

let getItems = items;

export class Item {
    static getAll() {
        return getItems;
    }
    static getOne(id) {
        return getItems.find((item) => item.id == id);
    }
    static delete(id) {
        return getItems.filter((item) => item.id != id);
    }
    static create(item) {
        if(!item.success) {
            return Error;
        }
        const newItem = {...item.data};
        getItems = [...getItems, newItem];
        return newItem;
    }
    static update(id, item) {
        if(!item.success) {
            res.status(400).json("Validación fallida");
        }
        const itemIndex = getItems.findIndex(item => item.id == id)
        if(itemIndex == -1) {
            return res.status(401).json("Item no encontrado");
        }
        const newItem = {...getItems[itemIndex], ...item.data};
        getItems[itemIndex] = newItem;
        return newItem;
    }
}