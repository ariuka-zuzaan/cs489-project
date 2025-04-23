import { CreateUserDTO, UserResponseDTO } from "../dtos/user.dto";
import { User } from "../models/user.entity";

export const toUserEntity = (dto: CreateUserDTO): User => {
  const user = new User();
  user.firstName = dto.firstName;
  user.lastName = dto.lastName;
  user.email = dto.email;
  user.password = dto.password;
  return user;
};

export const toUserResponse = (user: User): UserResponseDTO => ({
  id: user.id,
  firstName: user.firstName,
  lastName: user.lastName,
  email: user.email,
});
