import { Router } from "express";
import { createProject, getProjects, getProjectById, updateProject, deleteProject } from "../controllers/project.controller";
import { authorizeRole } from "../middlewares/authorizeRole.middleware";

const router = Router();

router.get("/", getProjects);
router.post("/", authorizeRole("manager"), createProject);
router.get("/:projectId", getProjectById);
router.put("/:projectId", authorizeRole("manager"), updateProject);
router.delete("/:projectId", authorizeRole("manager"), deleteProject);

export default router;
