import { CreateTaskDTO, TaskResponseDTO } from "../dtos/task.dto";
import { Task } from "../models/task.entity";
import { User } from "../models/user.entity";
import { Project } from "../models/project.entity";

export const toTaskEntity = (dto: CreateTaskDTO, user: User, project: Project): Task => {
  const task = new Task();
  task.title = dto.title;
  task.description = dto.description;
  task.status = dto.status || "TODO";
  task.user = user;
  task.project = project;
  return task;
};

export const toTaskResponse = (task: Task): TaskResponseDTO => ({
  id: task.id,
  title: task.title,
  description: task.description,
  status: task.status,
  user: task.user,
  project: task.project,
});
