import express from "express"
import cors from "cors";
import  "dotenv/config"
import {connectDB} from "./config/db.js";
const app = express()


app.use(express.json())
app.use(cors())

const PORT=process.env.PORT || 3000
connectDB


app.listen(3000, ()=>{
    console.log(`Server bien demarré http://localhost:${PORT}`)
})