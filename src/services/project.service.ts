import { projectRepo } from "../repositories/project.repository";
import { CreateProjectDTO } from "../dtos/project.dto";
import { toProjectEntity, toProjectResponse } from "../mappers/project.mapper";
import { HttpException } from "../exceptions/http.exception";
import { userRepo } from "../repositories/user.repository";

export class ProjectService {
  async createProject(dto: CreateProjectDTO) {
    const user = await userRepo.findOneBy({ id: dto.userId });
    if (!user) throw new HttpException(404, "User not found");

    const project = toProjectEntity(dto, user);
    const savedProject = await projectRepo.save(project);
    return toProjectResponse(savedProject);
  }

  async getProjects(page: number, limit: number) {
    const [projects, total] = await projectRepo.findAndCount({
      skip: (page - 1) * limit,
      take: limit,
      order: { id: "DESC" },
    });
    return { projects: projects, total: total };
  }

  async getProjectById(projectId: number) {
    const project = await projectRepo.findOneBy({ id: projectId });

    if (!project) {
      throw new HttpException(404, "Project not found");
    }
    return toProjectResponse(project);
  }

  async updateProject(projectId: number, dto: CreateProjectDTO) {
    console.log("service", projectId);
    const project = await projectRepo.findOne({
      where: { id: projectId },
      relations: ["createdBy"],
    });

    if (!project) throw new HttpException(404, "Project not found");
    console.log(project);
    Object.assign(project, {
      ...(dto.name && { title: dto.name }),
      ...(dto.description && { description: dto.description }),
      ...(dto.startDate && { startDate: new Date(dto.startDate) }),
      ...(dto.endDate && { endDate: new Date(dto.endDate) }),
    });

    const updated = await projectRepo.save(project);
    return toProjectResponse(updated);
  }

  async deleteProject(id: number): Promise<void> {
    const project = await projectRepo.findOne({
      where: { id },
      relations: ["createdBy", "tasks"],
    });

    if (!project) {
      throw new HttpException(404, "Project not found");
    }
    await projectRepo.remove(project);
  }
}
