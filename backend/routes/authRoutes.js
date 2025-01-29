import express from "express";
import { getUser, loginUser, logoutUser, registerUser } from "../controllers/authController.js";
import { verifyToken } from "../middlewares/authMiddleware.js";

const router = express.Router();
router.post("/register",registerUser);
router.post("/login",loginUser);
router.get("/user",verifyToken,getUser);
router.post("/logout",logoutUser);

export default router;
