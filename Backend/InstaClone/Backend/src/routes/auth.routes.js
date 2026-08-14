import express from "express";
import { registerUser , loginUser , logoutUser, getCurrentUser } from "../controllers/auth.controller.js";
import { verfiyJWT } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);

// Protected Routes 
router.post("/logout",verfiyJWT, logoutUser);
router.get("/me",verfiyJWT, getCurrentUser);

export default router