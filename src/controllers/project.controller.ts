import { Request, Response } from "express";

import { CreateProjectDTO } from "../dtos/project.dto";
import { ProjectService } from "../services/project.service";

const projectService = new ProjectService();

export const createProject = async (req: Request, res: Response) => {
  try {
    const dto: CreateProjectDTO = req.body;
    dto.userId = Number(req?.user?.id);
    const project = await projectService.createProject(dto);
    res.status(201).json(project);
  } catch (err: any) {
    console.error("Create Project Error:", err);
    res.status(500).json({ error: err.message || "Internal Server Error" });
  }
};

export const getProjects = async (req: Request, res: Response) => {
  const page = parseInt(req.query.page as string) || 1;
  const limit = parseInt(req.query.limit as string) || 10;
  const response = await projectService.getProjects(page, limit);
  res.status(200).json({
    data: response?.projects || [],
    total: response?.total || 0,
    page,
    pageSize: limit,
    totalPages: Math.ceil(response?.total || 0 / limit),
  });
};

export const getProjectById = async (req: Request, res: Response) => {
  const { projectId } = req.params;
  const project = await projectService.getProjectById(Number(projectId));
  res.status(200).json(project);
};

export const updateProject = async (req: Request, res: Response) => {
  try {
    console.log("here");
    const { projectId } = req.params;
    const dto = req.body;
    dto.userId = Number(req?.user?.id);
    const updateProject = await projectService.updateProject(Number(projectId), dto);
    res.status(200).json(updateProject);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
};

export const deleteProject = async (req: Request, res: Response) => {
  try {
    const { projectId } = req.params;
    await projectService.deleteProject(Number(projectId));
    res.status(204).send(); // No content
  } catch (err: any) {
    res.status(404).json({ error: err.message });
  }
};
