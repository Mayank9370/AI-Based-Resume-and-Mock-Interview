import express from "express";
import { getProfile, userLogin, userLogout } from "../controllers/userController.js";
import { isAuth } from "../middlewares/isAuth.js";

const router = express.Router();

router.get("/callback", userLogin);
router.get("/profile", isAuth, getProfile);
router.get("/logout", userLogout);

export default router;
