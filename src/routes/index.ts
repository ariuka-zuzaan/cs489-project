import { Router } from "express";
import authRoutes from "./auth.routes";
import taskRoutes from "./task.routes";
import { authMiddleware } from "../middlewares/auth.middleware";
import projectRoutes from "./project.routes";
// import projectRoutes from "./project.routes";

const router = Router();

// router.use("/", authMiddleware);
router.use("/auth", authRoutes);
router.use("/tasks", taskRoutes);
router.use("/projects", projectRoutes);

export default router;
