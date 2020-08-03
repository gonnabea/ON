import express, { Router } from "express";
import routes from "./routes";
import { postLogin, userController, postJoin } from "./controller/userController";
import { chatController, postChat } from "./controller/chatController";

const router = express.Router();

router.get(routes.chat, chatController);
router.post(routes.chat, postChat);

router.post(routes.login, postLogin);
router.get(routes.login, userController);

router.post(routes.join, postJoin)

export default router;