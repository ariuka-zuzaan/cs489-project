import { Router } from "express";
import { createProject, getProjects, getProjectById } from "../controllers/project.controller";

const router = Router();

router.post("/", createProject);
router.get("/", getProjects);
router.get("/:id", getProjectById);

export default router;
