import express, { Router } from "express"
import routes from "../routes"
import { chatController, postChat, chatroom, findMsg } from "../controller/chatController"

const router = express.Router()

router.get(routes.chat, chatController)
router.post(routes.chat, postChat)

router.post(routes.chatroom, chatroom)

router.post(routes.findChat, findMsg)

export default router
