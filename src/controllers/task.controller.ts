import { Request, Response } from "express";
import { taskService } from "../services/task.service";
import { CreateTaskDTO } from "../dtos/task.dto";

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
  const page = parseInt(req.query.page as string) || 1;
  const limit = parseInt(req.query.limit as string) || 10;
  const response = await taskService.getTasks(Number(req.user?.id), page, limit);
  res.status(200).json({
    data: response.tasks,
    total: response.total,
    page,
    pageSize: limit,
    totalPages: Math.ceil(response.total / limit),
  });
};

export const getTaskById = async (req: Request, res: Response) => {
  const { taskId } = req.params;
  const project = await taskService.getTasksById(Number(req.user?.id), Number(taskId));
  res.status(200).json(project);
};

export const updateTask = async (req: Request, res: Response) => {
  try {
    const { taskId } = req.params;
    const dto = req.body;
    const updatedTask = await taskService.updateTask(Number(taskId), dto);
    res.status(200).json(updatedTask);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
};

export const deleteTask = async (req: Request, res: Response) => {
  try {
    const { taskId } = req.params;
    console.log("here");
    await taskService.deleteTask(Number(taskId));
    res.status(204).send(); // No content
  } catch (err: any) {
    res.status(404).json({ error: err.message });
  }
};
