import mongoose from "mongoose";


export const conection = async () => {
    try {
        await mongoose.connect("mongodb+srv://eltrailer13:OTyPdEcSBCXOAm3J@cluster0.xyyek2c.mongodb.net/PruebaMERN");
        console.log("Conectado correctamente!");
    }
    catch (e) {
        console.log(e);
    };
}