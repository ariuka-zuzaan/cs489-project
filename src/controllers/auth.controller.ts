import { Request, Response } from "express";
import { AuthService } from "../services/auth.service";
import { CreateUserDTO } from "../dtos/user.dto";
import { toUserEntity } from "../mappers/user.mapper";

const authService = new AuthService();

export const register = async (req: Request, res: Response) => {
  try {
    const dto: CreateUserDTO = req.body;
    const user = await authService.register(dto);
    res.status(201).json(user);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
};

export const login = async (req: Request, res: Response) => {
  const token = await authService.login(req.body);
  res.status(200).json({ token });
};
