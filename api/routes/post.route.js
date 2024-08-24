import express from "express";
import { verifyToken } from "../utils/verifyUser.js";
import { create ,getposts,deletpost,updatepost} from "../controllers/post.controller.js";

const router = express.Router()


router.post('/create',  verifyToken, create)
router.get('/getposts',  verifyToken, getposts)
router.put('/updatepost/:postId/:userId',  verifyToken, updatepost)
router.delete('/deletepost/:postId/:userId',  verifyToken, deletpost)


export  default router