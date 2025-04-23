import { Router } from "express";
import { createProject, getProjects, getProjectById } from "../controllers/project.controller";

const router = Router();

router.get("/", getProjects);
router.post("/", createProject);
router.get("/:projectId", getProjectById);

export default router;
