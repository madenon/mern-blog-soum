import User from "../models/user.model.js"
import { errorHandler } from "../utils/error.js"
import bcrypts from "bcryptjs"

export const test = (req, res)=>{
    res.json({message:"Hello from controller Api Rest node js"})
}

export const updateUser = async(req, res,next)=>{
if(req.user.id !== req.params.userId){
    return next(errorHandler(403, "Vous ne puvez pas mettre à jour le profile d'une autre personnes"))
} 
if(req.body.password){
    if(req.body.password.length < 8){
        return next(errorHandler(401, "Mot de passe faible au moins 8 caractères"));
    }
 req.body.password = bcrypts.hashSync(req.body.password, 10);
}   
if(req.body.username){
    if(req.body.username.length < 7 || req.body.username.length > 20){
        return next(errorHandler(400, "La longueur du nom doit etre entre 7 et 20"))
    }
    if(req.body.username.includes(' ')){
        return next(errorHandler(400, "Le nom d utilisateur ne doit pas contenir d'espace"))
    }

    if(req.body.username !== req.body.username.toLowerCase()){
        return next(errorHandler(400, "Le nom d'utilisateur est en miniscule"))
    }
    if(!req.body.username.match(/^[a-zA-Z0-9]+$/)){
        return next(errorHandler(400, "Le nom d'utilisateur doit etre uniquement en letre de où de a à z les chiffres de 0  à 9"))

    }

    try {
        const  updateUser = await User.findByIdAndUpdate(req.params.userId,{
            $set:{
                username: req.body.username,
                email: req.body.email,
                profilePicture: req.body.profilePicture,
                password:req.body.password
            },
        }, {new:true});
        const {password, ...rest} = updateUser._doc;
        res.status(200).json(rest)
        
    } catch (error) {
        console.log(error)
        next(error)
    }
}

}