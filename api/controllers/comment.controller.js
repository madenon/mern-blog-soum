import Comment from "../models/comment.model.js";
import { errorHandler } from "../utils/error.js";

export const createComment = async (req, res, next) => {
  try {
    const { content, postId, userId } = req.body;
    if (userId !== req.user.id) {
      console.log(userId);
    
      return next(
        errorHandler("Vous n'êtes pas autorisé à mettre un commentaire ")
      );
    }

    const newComment = new Comment({
      content,
      postId,
      userId,
    });
    await newComment.save();
    res.status(200).json(newComment);
  } catch (error) {
    console.log(error);
    next(error);
  }
};


export const getPostComment = async(req, res,next)=>{
  try {
    const comments = await Comment.find({postId:req.params.postId}).sort({
      createdAt:-1
    })
    
    res.status(200).json(comments)
  } catch (error) {
    next(error)
  }

}