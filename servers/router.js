import express, { Router } from "express";
import routes from "../routes";
import { homeController } from "./Controller";

const router = express.Router();

router.get(routes.home, homeController);

export default router;