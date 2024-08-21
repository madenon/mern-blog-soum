import User from "../models/user.model.js"
import bcryptjs from "bcryptjs" 

export const signup = async(req, res) =>{
    const {username, email, password} = req.body

    if(!username || !email || !password || username==='' || email=='' || password===''){
        return res.status(400).json({message:"Tout les champs sont requis"})
    }
    const newName= username.trim()
    const newEmail = email.trim()
const hashPassword = bcryptjs.hashSync(password, 10)
    const newUser = new User({
        username:newName, 
        email:newEmail, 
        password:hashPassword
    });
    try {
        await newUser.save();
         res.status(200).json({newUser})
    } catch (error) {
         res.status(500).json({message:error.message})
    }
   
}