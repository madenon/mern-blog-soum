import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import { errorHandler } from "../utils/error.js";
import jwt from "jsonwebtoken"
export const signup = async (req, res, next) => {
  const { username, email, password } = req.body;

  if (
    !username ||
    !email ||
    !password ||
    username === "" ||
    email === "" ||
    password === ""
  ) {
     next(errorHandler(400, "Tout les champs sont requis"));
   
  }
  if(password.length < 8){
    return next(errorHandler(402, "Mot de passe faible , minimum 8 caractère"));
  
  }
  
  const hashPassword = bcryptjs.hashSync(password, 10);
  const newUser = new User({
    username,
    email,
    password: hashPassword,
  });
  try {
    await newUser.save();
    res.status(200).json({ newUser });
  } catch (error) {
    next(error);
  }
};


export const signin = async(req, res, next)=>{
  const {email, password} = req.body
  if(!email || !password || email==="" ||password===""){
      next(errorHandler(400, "Les champs sont obligatoire pour se connecter"));

  }

  try {
    const validUser = await User.findOne({email})
    if(!validUser){
      return next(errorHandler(404, "Utilisateur non trouvé"))

    }
    const validPassword = bcryptjs.compareSync(password,validUser.password);
    if(!validPassword){
      return next(errorHandler(400, "Mot de passe invalide"));
      
    }

    const token = jwt.sign({id:validUser._id},process.env.Jwt_SECRET);
    const {password:pass,...rest} = validUser._doc
    res.status(200).cookie("access_token", token,{
      httpOnly:true}).json(rest)
    
    
  } catch (error) {
    console.log(error)
     next(error)
  }

}

export const google = async(req, res, next)=>{
  const {email, name, googlePhotoUrl} = req.body
  try {
    const user = await User.findOne({email})
    if(user){
      const token = jwt.sign({id:user._id}, process.env.Jwt_SECRET);
      const {password, ...rest} =user._doc;
      res.status(200).cookie('access_token', token,{
        httpOnly:true
      }).json(rest)
    } else{
      const  generatedPassword = Math.random().toString(36).slice(-8) + Math.random().toString(36).slice(-8);
      const hashedPassword = bcryptjs.hashSync(generatedPassword, 10)
        const newUser = new User({
          username:name.toLowerCase().split(' ').join('') + Math.random().toString(9).slice(-4),
          email,
          password:hashedPassword,
          profilePicture:googlePhotoUrl

        });
        await newUser.save();
        const token = jwt.sign({id:newUser._id}, process.env.Jwt_SECRET);
        const {password, ...rest} = newUser._doc;
        res.status(200).cookie('access_token', token,{
          httpOnly:true
        }).json(rest)
    }
    
  } catch (error) {
     next(error)
  }

}