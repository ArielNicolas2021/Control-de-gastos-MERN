import mongoose, { model, Schema } from "mongoose";
import { conection } from "../helpers/conection.js";

conection()
const itemSchema = new Schema(
    {
        "userID": String,
        "date": String,
        "amount": Number,
        "item": String,
        "type": String
    },
    {
        versionKey: false
    }
)
const Item = model("Items", itemSchema);

export class Item_MDB {
    static async getAll() {
        try {
            return await Item.find();
        }
        catch (e) {
            console.log(e);
        }
    }
    static async getOne(id) {
        try {
            return await Item.findById(id);
        }
        catch (e) {
            console.log(e);
        }
    }
    static async delete(id) {
        try {
            return await Item.deleteOne({ _id: id });
        }
        catch (e) {
            console.log(e);
        }
    }
    static async create(item) {
        if (!item.success) {
            return { status: 400, message: "Error al enviar el registro" };
        }
        const newItem = { ...item.data };
        const itemSave = new Item(newItem);
        try {
            await itemSave.save();
            return newItem;
        }
        catch (e) {
            console.log(e);
        }
    }
    static async update(id, item) {
        if (!item.success) {
            return { status: 400, message: "Validación fallida" };
        }
        try {
            return await Item.findOneAndUpdate({ _id: id }, { ...item.data }, { new: true });
        }
        catch (e) {
            console.log(e);
        }
    }
}