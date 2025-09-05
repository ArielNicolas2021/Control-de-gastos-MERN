// Imports
import express from 'express'
import { Enrouter } from './routes/itemsRoutes.js'
import { Item_MDB } from './models/Item_MDB.js'
import { CreateUsers } from './routes/usersRoutes.js'
import { User_MDB } from './models/User_MDB.js'
import { auth } from './middlewares/auth.js'
import cors from "cors"

// Global configs
const app = express()
app.use(express.json())
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*'); // O tu origen específico
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});
const PORT = 1234
app.use('/api/items', auth, Enrouter(Item_MDB))
app.use('/api/users', CreateUsers(User_MDB))

app.listen(PORT, () => {
    console.log("Servidor a la espera de conexiones en el puerto " + PORT)
})