import { AppDataSource } from "../data-source";
import { Role } from "../models/role.entity";

export const roleRepo = AppDataSource.getRepository(Role);
