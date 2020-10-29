import express, { Router } from "express"
import routes from "../routes"
import {
  chatController,
  postChat,
  chatroom,
  findMsg,
  createGroupChat,
} from "../controller/chatController"

const router = express.Router()

router.get(routes.chat, chatController)
router.post(routes.chat, postChat)

router.post(routes.chatroom, chatroom)

router.post(routes.findChat, findMsg)

router.post(routes.createGroupChat, createGroupChat)
export default router
