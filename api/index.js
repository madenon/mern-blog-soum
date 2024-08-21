import express from "express"
import cors from "cors";
import  "dotenv/config"
const app = express()
import mongoose from "mongoose";
import userRoutes from "./routes/user.route.js"

const PORT=process.env.PORT || 3000
mongoose.connect(process.env.MONGO).then(()=>{
    console.log("Connexion à la base de donnée")
}).catch((err)=>{
    console.log("échec connexion à la base de donnée")
})


app.use(express.json())
app.use(cors())

app.use("/api/user", userRoutes)

app.listen(PORT, ()=>{
    console.log(`Server bien demarré http://localhost:${PORT}`)
})