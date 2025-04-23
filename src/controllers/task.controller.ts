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
  const tasks = await taskService.getTasks(1);
  res.status(200).json(tasks);
};

export const getTaskById = async (req: Request, res: Response) => {
  const { taskId } = req.params;
  const project = await taskService.getTasksById(1, Number(taskId));
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
    const id = parseInt(req.params.id, 10);
    await taskService.deleteTask(id);
    res.status(204).send(); // No content
  } catch (err: any) {
    res.status(404).json({ error: err.message });
  }
};
