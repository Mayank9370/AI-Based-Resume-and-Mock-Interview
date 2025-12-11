import express from "express";
import { enhanceText } from "../controllers/aiController.js";
import { isAuth } from "../middlewares/isAuth.js";

const router = express.Router();

router.post("/enhance", isAuth, enhanceText);

export default router;
