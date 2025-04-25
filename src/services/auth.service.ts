import { User } from "../models/user.entity";
import { AppDataSource } from "../data-source";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { toUserEntity, toUserResponse } from "../mappers/user.mapper";
import { CreateUserDTO } from "../dtos/user.dto";
import { HttpException } from "../exceptions/http.exception";
import { Role } from "../models/role.entity";

const userRepo = AppDataSource.getRepository(User);
const roleRepo = AppDataSource.getRepository(Role);

export class AuthService {
  async register(dto: CreateUserDTO) {
    console.log("dto", dto);
    const existing = await userRepo.findOne({ where: { email: dto.email } });
    if (existing) throw new HttpException(403, "Email already exist!");
    console.log("here", dto.roleId);

    if (!dto.roleId) throw new HttpException(400, "Invalid role ID");

    const role = await roleRepo.findOne({ where: { id: dto.roleId } });
    console.log("role", role);
    if (!role) throw new HttpException(400, "Invalid role ID");
    console.log(role);

    const userEntity = toUserEntity(dto);
    userEntity.password = await bcrypt.hash(dto.password, 10);
    userEntity.role = role;

    const savedUser = await userRepo.save(userEntity);
    console.log(savedUser);
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

    const token = jwt.sign({ id: user.id, role: user.role.name }, "secret", { expiresIn: "1d" });
    return { token };
  }
}
