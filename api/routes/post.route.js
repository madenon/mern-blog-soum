import express from "express";
import { verifyToekn } from "../utils/verifyUser.js";
import { create ,getposts,deletpost} from "../controllers/post.controller.js";

const router = express.Router()


router.post('/create',  verifyToekn, create)
router.get('/getposts',  verifyToekn, getposts)
// router.put('/editpost',  verifyToekn, eidtpost)
router.delete('/deletepost/:postId/:userId',  verifyToekn, deletpost)


export  default router