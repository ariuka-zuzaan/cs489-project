import "reflect-metadata";
import { DataSource } from "typeorm";
import { User } from "./models/user.entity";
import { Task } from "./models/task.entity";
import { Project } from "./models/project.entity";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "ariuka",
  password: "",
  database: "task_manager",
  synchronize: true,
  entities: [User, Task, Project],
});
