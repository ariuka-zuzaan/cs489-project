import { AppDataSource } from "data-source";
import { Task } from "models/task.entity";

export const taskRepo = AppDataSource.getRepository(Task);
