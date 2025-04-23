import { Router } from "express";
import { createTask, getTasks } from "../controllers/task.controller";

const router = Router();

router.post("/", createTask);
router.get("/", getTasks);
// router.get("/", getTaskById);

export default router;
