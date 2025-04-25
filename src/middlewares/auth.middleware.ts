import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    res.status(401).json({ message: "Unauthorized" });
  }
  const token = authHeader?.split(" ")[1];
  if (!token) {
    res.status(401).json({ message: "Unauthorized" });
    return;
  }
  try {
    const decoded: any = jwt.verify(token, "secret");

    req.user = { id: decoded.id as string, role: decoded.role };
    next();
  } catch (err) {
    console.log("error", err);
    res.status(401).json({ message: "Unauthorized" });
    return;
  }
};
