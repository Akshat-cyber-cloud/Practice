import authController from "../controller/auth.controller.js";
import authMiddleware from "../middleware/auth.middleware.js";
import {Router} from "express";

const router = Router();

router.post("/register", authController.registerUser);
router.post("/login", authController.loginUser);
router.get("/profile", authMiddleware.protect, authController.getProfile);

export default router;

