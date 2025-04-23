import { AppDataSource } from "data-source";
import { User } from "../models/user.entity";

export const userRepo = AppDataSource.getRepository(User);
