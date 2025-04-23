import { User } from "../models/user.entity";
import { AppDataSource } from "../data-source";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { toUserEntity, toUserResponse } from "../mappers/user.mapper";
import { CreateUserDTO } from "../dtos/user.dto";
import { HttpException } from "../exceptions/http.exception";

const userRepo = AppDataSource.getRepository(User);

export class AuthService {
  async register(dto: CreateUserDTO) {
    const existing = await userRepo.findOne({ where: { email: dto.email } });
    if (existing) throw new Error("Email already exists");

    const userEntity = toUserEntity(dto);
    userEntity.password = await bcrypt.hash(dto.password, 10);

    const savedUser = await userRepo.save(userEntity);
    return toUserResponse(savedUser);
  }

  async login(data: { email: string; password: string }) {
    const user = await userRepo.findOne({ where: { email: data.email } });
    if (!user) {
      throw new HttpException(401, "User doesn't exist");
    }

    const isMatch = await bcrypt.compare(data.password, user.password);
    if (!isMatch) {
      throw new HttpException(401, "Invalid password");
    }

    const token = jwt.sign({ id: user.id }, "secret", { expiresIn: "1d" });
    return { token };
  }
}
