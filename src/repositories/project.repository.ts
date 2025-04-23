import { AppDataSource } from "../data-source";
import { Project } from "../models/project.entity";

export const projectRepo = AppDataSource.getRepository(Project);
