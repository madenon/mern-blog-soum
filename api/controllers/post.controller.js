import Post from "../models/post.model.js";
import { errorHandler } from "../utils/error.js";

export const create = async (req, res, next) => {
  if (!req.user.isAdmin) {
    return next(errorHandler(403, "vous n'êtes pas autorisé à créer un post"));
  }
  if (!req.body.title || !req.body.content || !req.body.source) {
    return next(
      errorHandler(403, "Le post doit avoir un titre un contenu et une source")
    );
  }
  const slug = req.body.title
    .split(" ")
    .join("-")
    .toLowerCase()
    .replace(/[^a-zA-Z0-9-]/g, "");
  const newPost = new Post({
    ...req.body,
    slug,
    userId: req.user.id,
  });

  try {
    const savePost = await newPost.save();
    res.status(201).json(savePost);
  } catch (error) {
    next(error);
  }
};

export const getposts = async (req, res, next) => {
  try {
    const startIndex = parseInt(req.query.startIndex) || 0;
    const limit = parseInt(req.query.limit) || 0;
    const sortDirection = req.query.order === "asc" ? 1 : -1;
    const posts = await Post.find({
      ...(req.query.userId && { userId: req.query.userId }),
      ...(req.query.category && { category: req.query.category }),
      ...(req.query.slug && { category: req.query.slug }), 
      ...(req.query.postId && { _id: req.query.postId }), 
      ...( req.query.searchTerm && {
        $or: [
            { title: { $regex: req.query.searchTerm, $options: "i" } },
            { source: { $regex: req.query.searchTerm, $options: "i" } },
            { content: { $regex: req.query.searchTerm, $options: "i" } },
          ],
      })
    
    }).sort({ updatedAt:sortDirection }).skip(startIndex).limit(limit)

    const totalPosts = await Post.countDocuments();
    const now = new Date();
    const oneMonthAgo = new Date(
      now.getFullYear(),
      now.getMonth() - 1,
      now.getDate()
    );
    const latMonthPosts = await Post.countDocuments({
        createdAt: { $gte: oneMonthAgo },
      });
      res.status(200).json({
        posts,
        totalPosts,
        latMonthPosts,
      });

  } catch (error) {
    console.log(error)
    next(error)
  }
};
