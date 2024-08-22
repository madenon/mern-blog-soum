import express from "express"
import { test, updateUser,deletUser,signout } from "../controllers/user.controller.js"
import { verifyToekn } from "../utils/verifyUser.js"
const router = express.Router()


router.get('/test', test)
router.put('/update/:userId',verifyToekn,  updateUser)
router.delete('/delete/:userId',verifyToekn,  deletUser)
router.post('/signout',  signout)

export default router