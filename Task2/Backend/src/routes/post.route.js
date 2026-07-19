import postController from "../controller/post.controller.js";
import authMiddleware from "../middleware/auth.middleware.js";
import { Router } from "express";

const router = Router();


router.get("/", postController.getAllPosts);
router.get("/:id", postController.getPostById);

router.post("/", authMiddleware.protect, postController.createPost);
router.put("/:id", authMiddleware.protect, postController.updatePost);
router.delete("/:id", authMiddleware.protect, postController.deletePost);

export default router;
