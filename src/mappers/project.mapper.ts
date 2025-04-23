import { Project } from "../models/project.entity";
import { CreateProjectDTO, ProjectResponseDTO } from "../dtos/project.dto";
import { toTaskResponse } from "./task.mapper";

export const toProjectEntity = (dto: CreateProjectDTO): Project => {
  const project = new Project();
  project.name = dto.name;
  project.description = dto.description;
  project.startDate = new Date(dto.startDate);
  project.endDate = new Date(dto.endDate);
  return project;
};

export const toProjectResponse = (project: Project): ProjectResponseDTO => ({
  id: project.id,
  name: project.name,
  description: project.description,
  startDate: project.startDate?.toISOString().split("T")[0],
  endDate: project.endDate?.toISOString().split("T")[0],
  tasks: project.tasks?.map(toTaskResponse),
});
