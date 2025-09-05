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
app.use(cors())

const PORT = process.env.PORT || 1234
app.use('/api/items', auth, Enrouter(Item_MDB))
app.use('/api/users', CreateUsers(User_MDB))

app.listen(PORT, () => {
    console.log("Servidor a la espera de conexiones en el puerto " + PORT)
})