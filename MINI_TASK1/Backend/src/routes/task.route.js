import express from "express";
import {createTask , getTask , updateTask , deleteTask} from "../controllers/task.controller.js";
import {protect} from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/create", protect , createTask);
router.get("/get", protect , getTask);
router.put("/update/:id", protect , updateTask);
router.delete("/delete/:id", protect , deleteTask);

export default router;
