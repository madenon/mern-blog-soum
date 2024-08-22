import express from "express";
import { verifyToekn } from "../utils/verifyUser.js";
import { create } from "../controllers/post.controller.js";

const router = express.Router()


router.post('/create',  verifyToekn, create)


export  default router