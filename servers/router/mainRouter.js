import express, { Router } from "express"
import routes from "../routes"
import { chatController, postChat } from "../controller/mainController"

const router = express.Router()

router.get(routes.chat, chatController)
router.post(routes.chat, postChat)

export default router
