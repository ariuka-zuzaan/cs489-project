// middleware/authorizeRole.ts
import { Request, Response, NextFunction } from "express";

export const authorizeRole = (role: string) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (req.user?.role !== role) {
      res.status(403).json({ message: "No permission to create project!" });
    } else {
      next();
    }
  };
};
