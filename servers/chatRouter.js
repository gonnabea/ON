import express, { Router } from "express";
import routes from "../routes";
import { homeController } from "./chatController";

const router = express.Router();

router.get(routes.home, homeController);

export default router;