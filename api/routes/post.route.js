import express from "express";
import { verifyToekn } from "../utils/verifyUser.js";
import { create ,getposts} from "../controllers/post.controller.js";

const router = express.Router()


router.post('/create',  verifyToekn, create)
router.get('/getposts',  verifyToekn, getposts)


export  default router