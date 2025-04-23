import { Project } from "models/project.entity";
import { Task, TaskStatus } from "models/task.entity";
import { User } from "models/user.entity";
import { ProjectResponseDTO } from "./project.dto";
import { UserResponseDTO } from "./user.dto";

export interface CreateTaskDTO {
  title: string;
  description: string;
  status: TaskStatus;
  startDate: string; // Use string to accept ISO date from client
  endDate: string;
  userId: number;
  projectId: number;
}

export interface TaskResponseDTO {
  id: number;
  title: string;
  description: string;
  status: string;
  startDate: string; // Use string to accept ISO date from client
  endDate: string;
  user: UserResponseDTO;
  project: {
    id: number;
    name: string;
  };
}

export interface UpdateTaskDTO {
  title: string;
  description: string;
  status: TaskStatus;
  startDate: string;
  endDate: string;
  projectId: number;
}
