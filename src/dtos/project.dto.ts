import { TaskResponseDTO } from "./task.dto";
import { UserResponseDTO } from "./user.dto";

export class CreateProjectDTO {
  name: string;
  description: string;
  startDate: string; // Use string to accept ISO date from client
  endDate: string;
  userId: number;
}

export class ProjectResponseDTO {
  id: number;
  name: string;
  description: string;
  startDate: string;
  endDate: string;
  user: UserResponseDTO;
  tasks?: TaskResponseDTO[];
}
