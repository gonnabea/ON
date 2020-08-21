import express, { Router } from "express"
import routes from "../routes"
import { postLogin, userController, postJoin, logout } from "../controller/userController"

const router = express.Router()

router.post(routes.login, postLogin)
router.get(routes.login, userController)

router.post(routes.join, postJoin)

router.get(routes.logout, logout)

export default router
