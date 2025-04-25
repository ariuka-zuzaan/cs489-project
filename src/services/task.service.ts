import { Task } from "../models/task.entity";
import { AppDataSource } from "../data-source";
import { User } from "../models/user.entity";
import { CreateTaskDTO, UpdateTaskDTO } from "../dtos/task.dto";
import { Project } from "../models/project.entity";
import { toTaskEntity, toTaskResponse } from "../mappers/task.mapper";
import { HttpException } from "../exceptions/http.exception";

const userRepo = AppDataSource.getRepository(User);
const projectRepo = AppDataSource.getRepository(Project);
const taskRepo = AppDataSource.getRepository(Task);

class TaskService {
  async createTask(dto: CreateTaskDTO) {
    const user = await userRepo.findOneBy({ id: dto.userId });
    if (!user) throw new HttpException(404, "User not found");

    const project = await projectRepo.findOneBy({ id: dto.projectId });
    if (!project) throw new HttpException(404, "User not found");

    const task = toTaskEntity(dto, user, project);
    const savedTask = await taskRepo.save(task);
    return toTaskResponse(savedTask);
  }

  async getTasks(userId: number, page: number, limit: number) {
    console.log(userId);
    const [tasks, total] = await taskRepo.findAndCount({
      where: { assignedTo: { id: userId } },
      relations: ["assignedTo", "project"],
      skip: (page - 1) * limit,
      take: limit,
      order: { id: "DESC" },
    });
    console.log(tasks);
    return { tasks, total };
  }

  async getTasksById(userId: number, taskId: number) {
    const task = await taskRepo.findOne({ where: { id: taskId, assignedTo: { id: userId } }, relations: ["project", "assignedTo"] });

    if (!task) {
      throw new HttpException(404, "Task not found");
    }
    console.log(task);

    return toTaskResponse(task);
  }

  async updateTask(taskId: number, dto: UpdateTaskDTO) {
    const task = await taskRepo.findOne({
      where: { id: taskId },
      relations: ["assignedTo", "project"],
    });

    if (!task) throw new HttpException(404, "Task not found");

    Object.assign(task, {
      ...(dto.title && { title: dto.title }),
      ...(dto.description && { description: dto.description }),
      ...(dto.status && { status: dto.status }),
      ...(dto.startDate && { startDate: new Date(dto.startDate) }),
      ...(dto.endDate && { endDate: new Date(dto.endDate) }),
    });

    if (dto.projectId !== undefined) {
      const project = await projectRepo.findOneBy({ id: dto.projectId });
      if (!project) throw new HttpException(404, "Project not found");
      task.project = project;
    }
    const updated = await taskRepo.save(task);
    return toTaskResponse(updated);
  }

  async deleteTask(taskId: number): Promise<void> {
    console.log("bla", taskId);
    const task = await taskRepo.findOne({
      where: { id: taskId },
      relations: ["assignedTo", "project"],
    });
    console.log(task);

    if (!task) {
      throw new HttpException(404, "Task not found");
    }
    await taskRepo.remove(task);
  }
}

export const taskService = new TaskService();
