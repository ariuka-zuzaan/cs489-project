import { projectRepo } from "../repositories/project.repository";
import { CreateProjectDTO } from "../dtos/project.dto";
import { toProjectEntity, toProjectResponse } from "../mappers/project.mapper";

export class ProjectService {
  async createProject(dto: CreateProjectDTO) {
    const project = toProjectEntity(dto);
    const savedProject = await projectRepo.save(project);
    return toProjectResponse(savedProject);
  }

  async getProjects() {
    const projects = await projectRepo.find();
    return projects;
  }

  async getProjectById(projectId: number) {
    const project = await projectRepo.findOneBy({ id: projectId });

    if (!project) {
      throw new Error("Task not found");
    }
    console.log(project);

    return toProjectResponse(project);
  }
}
