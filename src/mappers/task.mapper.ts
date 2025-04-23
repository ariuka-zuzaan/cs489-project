import { CreateTaskDTO, TaskResponseDTO } from "../dtos/task.dto";
import { Task } from "../models/task.entity";
import { User } from "../models/user.entity";
import { Project } from "../models/project.entity";
import { ProjectResponseDTO } from "dtos/project.dto";
import { toProjectResponse } from "./project.mapper";
import { toUserResponse } from "./user.mapper";

export const toTaskEntity = (dto: CreateTaskDTO, user: User, project: Project): Task => {
  const task = new Task();
  task.title = dto.title;
  task.description = dto.description;
  task.status = dto.status || "TODO";
  task.user = user;
  task.project = project;
  task.startDate = new Date(dto.startDate);
  task.endDate = new Date(dto.endDate);
  return task;
};

export const toTaskResponse = (task: Task): TaskResponseDTO => ({
  id: task.id,
  title: task.title,
  description: task.description,
  status: task.status,
  startDate: task.startDate?.toISOString().split("T")[0],
  endDate: task.endDate?.toISOString().split("T")[0],
  user: toUserResponse(task.user),
  project: {
    id: task.project.id,
    name: task.project.name,
  },
});
