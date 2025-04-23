import { TaskResponseDTO } from "./task.dto";

export class CreateProjectDTO {
  name: string;
  description: string;
  startDate: string; // Use string to accept ISO date from client
  endDate: string;
}

export class ProjectResponseDTO {
  id: number;
  name: string;
  description: string;
  startDate: string;
  endDate: string;
  tasks?: TaskResponseDTO[];
}
