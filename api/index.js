import express from "express"
import cors from "cors";
import  "dotenv/config"
const app = express()


app.use(express.json())


const PORT=process.env.PORT || 3000

app.listen(3000, ()=>{
    console.log(`Server bien demarré http://localhost:${PORT}`)
})