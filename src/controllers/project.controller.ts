import { Request, Response } from "express";

import { CreateProjectDTO } from "../dtos/project.dto";
import { ProjectService } from "../services/project.service";

const projectService = new ProjectService();

export const createProject = async (req: Request, res: Response) => {
  try {
    const dto: CreateProjectDTO = req.body;
    const project = await projectService.createProject(dto);

    res.status(201).json(project);
  } catch (err: any) {
    console.error("Create Project Error:", err);
    res.status(500).json({ error: err.message || "Internal Server Error" });
  }
};

export const getProjects = async (req: Request, res: Response) => {
  const projects = await projectService.getProjects();
  res.status(200).json(projects);
};

export const getProjectById = async (req: Request, res: Response) => {
  const { id } = req.params;
  console.log(req.params);
  const project = await projectService.getProjectById(Number(id));
  res.status(200).json(project);
};
