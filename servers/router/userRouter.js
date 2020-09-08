import express, { Router } from "express"
import routes from "../routes"
import {
  postLogin,
  userController,
  postJoin,
  logout,
  addFriend,
  successLogin,
  setting,
  setStatusMsg,
} from "../controller/userController"

const router = express.Router()

router.post(routes.login, postLogin)
router.get(routes.login, userController)

router.post(routes.join, postJoin)

router.get(routes.logout, logout)

router.get(routes.successLogin, successLogin)

router.get(routes.setting, setting)

router.post(routes.setStatusMsg, setStatusMsg)

// router.post(routes.addFriend, addFriend)

export default router
