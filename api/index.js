import express from "express"
import cors from "cors";
import  "dotenv/config";
import cookieParser from "cookie-parser";
const app = express()
import mongoose from "mongoose";
import userRoutes from "./routes/user.route.js"
import authRoute from "./routes/auth.route.js"
import postRoutes from "./routes/post.route.js"
import commentRoutes from "./routes/comment.route.js"

const PORT=process.env.PORT || 3000
mongoose.connect(process.env.MONGO).then(()=>{
    console.log("Connexion à la base de donnée")
}).catch((err)=>{
    console.log("échec connexion à la base de donnée")
})


app.use(express.json())
app.use(cors())
app.use(cookieParser())

app.use("/api/user", userRoutes)
app.use("/api/auth", authRoute)
app.use("/api/post", postRoutes)
app.use("/api/comment", commentRoutes)

app.use((err, req, res, next)=>{
    const statusCode = err.statusCode || 500;
    const message = err.message || "Erreur du server";
    res.status(statusCode).json({
         success:false,
         statusCode,
         message
    })
})
app.listen(PORT, ()=>{
    console.log(`Server bien demarré http://localhost:${PORT}`)
})