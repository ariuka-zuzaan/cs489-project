import { Request, Response } from "express";
import { TaskService } from "../services/task.service";
import { CreateTaskDTO } from "../dtos/task.dto";

const taskService = new TaskService();

export const createTask = async (req: Request, res: Response) => {
  try {
    const dto: CreateTaskDTO = req.body;
    const task = await taskService.createTask(dto);

    res.status(201).json(task);
  } catch (err: any) {
    console.error("Create Task Error:", err);
    res.status(500).json({ error: err.message || "Internal Server Error" });
  }
};

export const getTasks = async (req: Request, res: Response) => {
  // if (!req.user) {
  //   res.status(400).json({ error: "User information is missing" });
  //   return;
  // }
  // const tasks = await taskService.getTasks(req.user?.id);
  // res.status(200).json(tasks);
};
