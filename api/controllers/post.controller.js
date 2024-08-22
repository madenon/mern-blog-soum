import Post from "../models/post.model.js";
import { errorHandler } from "../utils/error.js"


export const create = async(req, res, next)=>{
    if(!req.user.isAdmin){
        return next(errorHandler(403, "vous n'êtes pas autorisé à créer un post"))
    }
if(!req.body.title || !req.body.content || !req.body.source){
    return next(errorHandler(403, "Le post doit avoir un titre un contenu et une source"))
}
const slug = req.body.title.split(' ').join('-').toLowerCase().replace(/[^a-zA-Z0-9-]/g, '');
const newPost =  new Post({
    ...req.body, slug, userId:req.user.id
})

try {
    const savePost =await newPost.save()
res.status(201).json(savePost)
    
} catch (error) {
    next(error)
    
}
}