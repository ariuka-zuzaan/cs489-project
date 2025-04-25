import "reflect-metadata";
import { DataSource } from "typeorm";
import { User } from "./models/user.entity";
import { Task } from "./models/task.entity";
import { Project } from "./models/project.entity";
import { Role } from "./models/role.entity";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.DB_HOST || "localhost",
  port: parseInt(process.env.DB_PORT || "5432"),
  username: process.env.DB_USER || "ariuka",
  password: process.env.DB_PASSWORD || "",
  database: process.env.DB_NAME || "task_manager",
  entities: [User, Task, Project, Role],
  synchronize: true,
});
