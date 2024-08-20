import mongoose from "mongoose";

export const connectDB = async()=>{
    await mongoose.connect(process.env.MONGO_URI).then(()=>{
  console.log("Connexion a la base de onné réussie")
    }).catch((error)=>{
        console.log("Impossible de se connecter")
    })
}

