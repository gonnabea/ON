import express, { Router } from "express"
import routes from "../routes"
import { chatController, postChat, chatroom } from "../controller/mainController"

const router = express.Router()

router.get(routes.chat, chatController)
router.post(routes.chat, postChat)

router.post(routes.chatroom, chatroom)

export default router
