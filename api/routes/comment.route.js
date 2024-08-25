import express from "express";
import { createComment ,getPostComment, likeComment,editComment} from "../controllers/comment.controller.js";
import { verifyToken } from "../utils/verifyUser.js";

const router = express.Router()  

router.post('/create', verifyToken, createComment)
router.get('/getPostComments/:postId', getPostComment)
router.put('/likeComments/:commentId', verifyToken, likeComment)
router.put('/editComment/:commentId', verifyToken, editComment)


export  default router