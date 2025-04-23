import { Project } from "models/project.entity";
import { Task, TaskStatus } from "models/task.entity";
import { User } from "models/user.entity";

export interface CreateTaskDTO {
  title: string;
  description: string;
  status: TaskStatus;
  userId: number;
  projectId: number;
}

export interface TaskResponseDTO {
  id: number;
  title: string;
  description: string;
  status: string;
  user: User;
  project: Project;
}
