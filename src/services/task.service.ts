import { Task } from "../models/task.entity";
import { AppDataSource } from "../data-source";
import { User } from "../models/user.entity";
import { CreateTaskDTO } from "dtos/task.dto";
import { Project } from "../models/project.entity";
import { toTaskEntity, toTaskResponse } from "../mappers/task.mapper";

const userRepo = AppDataSource.getRepository(User);
const projectRepo = AppDataSource.getRepository(Project);
const taskRepo = AppDataSource.getRepository(Task);

export class TaskService {
  async createTask(dto: CreateTaskDTO) {
    const user = await userRepo.findOneBy({ id: dto.userId });
    if (!user) throw new Error("User not found");

    const project = await projectRepo.findOneBy({ id: dto.projectId });
    if (!project) throw new Error("Project not found");

    // 3. Map DTO to entity
    const task = toTaskEntity(dto, user, project);

    // 4. Save and return response DTO
    const savedTask = await taskRepo.save(task);
    return toTaskResponse(savedTask);
  }

  async getTasks(userId: number) {
    return await taskRepo.find({ where: { user: { id: userId } }, relations: ["user"] });
  }
}
