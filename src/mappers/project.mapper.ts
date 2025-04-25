import { Project } from "../models/project.entity";
import { CreateProjectDTO, ProjectResponseDTO } from "../dtos/project.dto";
import { toTaskResponse } from "./task.mapper";
import { toUserResponse } from "./user.mapper";
import { User } from "models/user.entity";

export const toProjectEntity = (dto: CreateProjectDTO, user: User): Project => {
  const project = new Project();
  project.name = dto.name;
  project.description = dto.description;
  project.startDate = new Date(dto.startDate);
  project.endDate = new Date(dto.endDate);
  project.createdBy = user;
  return project;
};

export const toProjectResponse = (project: Project): ProjectResponseDTO => ({
  id: project.id,
  name: project.name,
  description: project.description,
  startDate: project.startDate?.toISOString().split("T")[0],
  endDate: project.endDate?.toISOString().split("T")[0],
  user: toUserResponse(project.createdBy),
  tasks: project.tasks?.map(toTaskResponse),
});
