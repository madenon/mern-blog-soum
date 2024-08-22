import express from "express"
import { test, updateUser,deletUser } from "../controllers/user.controller.js"
import { verifyToekn } from "../utils/verifyUser.js"
const router = express.Router()


router.get('/test', test)
router.put('/update/:userId',verifyToekn,  updateUser)
router.delete('/delete/:userId',verifyToekn,  deletUser)

export default router