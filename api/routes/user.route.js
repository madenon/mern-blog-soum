import express from "express"
import { test, updateUser,deletUser,signout,getUsers } from "../controllers/user.controller.js"
import { verifyToken } from "../utils/verifyUser.js"
const router = express.Router()


router.get('/test', test)
router.put('/update/:userId',verifyToken,  updateUser)
router.delete('/delete/:userId',verifyToken,  deletUser)
router.get('/getusers', verifyToken, getUsers)
router.post('/signout',  signout)

export default router