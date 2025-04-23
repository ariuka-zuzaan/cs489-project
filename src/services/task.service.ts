import { Task } from "../models/task.entity";
import { AppDataSource } from "../data-source";
import { User } from "../models/user.entity";
import { CreateTaskDTO, UpdateTaskDTO } from "../dtos/task.dto";
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

    const task = toTaskEntity(dto, user, project);
    const savedTask = await taskRepo.save(task);
    return toTaskResponse(savedTask);
  }

  async getTasks(userId: number) {
    const tasks = await taskRepo.find({ where: { user: { id: userId } }, relations: ["user", "project"] });
    return tasks.map(toTaskResponse);
  }

  async getTasksById(userId: number, taskId: number) {
    const task = await taskRepo.findOne({ where: { id: taskId, user: { id: userId } }, relations: ["user", "project"] });

    if (!task) {
      throw new Error("Task not found");
    }
    console.log(task);

    return toTaskResponse(task);
  }

  async updateTask(taskId: number, dto: UpdateTaskDTO) {
    const task = await taskRepo.findOne({
      where: { id: taskId },
      relations: ["user", "project"],
    });

    if (!task) throw new Error("Task not found");

    Object.assign(task, {
      ...(dto.title && { title: dto.title }),
      ...(dto.description && { description: dto.description }),
      ...(dto.status && { status: dto.status }),
      ...(dto.startDate && { startDate: new Date(dto.startDate) }),
      ...(dto.endDate && { endDate: new Date(dto.endDate) }),
    });

    if (dto.projectId !== undefined) {
      const project = await projectRepo.findOneBy({ id: dto.projectId });
      if (!project) throw new Error("Project not found");
      task.project = project;
    }
    const updated = await taskRepo.save(task);
    return toTaskResponse(updated);
  }

  async deleteTask(id: number): Promise<void> {
    const task = await taskRepo.findOneBy({ id });

    if (!task) {
      throw new Error("Task not found");
    }

    await taskRepo.remove(task);
  }
}
